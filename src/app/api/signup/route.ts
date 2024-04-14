import { db } from "~/server/db";
import { Prisma } from "@prisma/client";
import { assert, object, string, size, refine, number } from "superstruct";

import { hashPassword } from "~/helpers/hash";
import sendVerificationEmail from "~/helpers/sendVerificationEmail";
import generateOTP from "~/helpers/generateOtp";
import { isEmail } from "~/helpers/isEmail";

interface userData {
  id: number;
  name: string;
  email: string;
  password: string;
  otp: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// validates the input fields
const Signup = object({
  // string and a valid email address
  email: refine(string(), "email", (v) => isEmail(v)),
  // password is between 7 and 30 characters long
  password: size(string(), 7, 100),
  // first name is between 2 and 50 characters long
  name: size(string(), 2, 50),
  otp: size(string(), 2, 8),
});

type Signup = Omit<Prisma.UserCreateArgs["data"], "id">;

const POST = async (request: Request) => {
  try {
    const incomingData: unknown = await request.json();
    if (incomingData !== null) {
      const { name, email, password } = incomingData as userData;

      // const { name, email, password } = incomingData;

      if (!name || !email || !password) {
        return Response.json(
          { msg: "Please provide name, email and password" },
          { status: 400 },
        );
      }

      const existingUser = await db.user.findFirst({
        where: {
          email: email,
        },
      });

      // User already exists
      if (existingUser && existingUser.isVerified) {
        return Response.json(
          { msg: "User with this email already exists" },
          { status: 400 },
        );
      } else {
        await db.user.deleteMany({
          where: {
            email: email, // Specify the email field using equals
          },
        });
      }

      const otp = generateOTP(8);

      await sendVerificationEmail({ name, email, otp });

      const hashedPassword = await hashPassword(password);

      const filteredData = { name, email, password: hashedPassword, otp };

      assert(filteredData, Signup);
      await db.user.create({ data: filteredData });
      return Response.json(
        {
          msg: "To confirm your account, please check your email for OTP.",
          email: email,
        },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json({ msg: error.message }, { status: 500 });
    }
  }
};

export { POST };
