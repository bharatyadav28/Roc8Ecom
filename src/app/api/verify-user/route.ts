import { db } from "~/server/db";

interface userData {
  id: number;
  name: string;
  email: string;
  otp: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const checkResultType = (
  obj: unknown,
): obj is { email: string; otp: string } => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "email" in obj &&
    typeof obj.email === "string" &&
    "otp" in obj &&
    typeof obj.otp === "string"
  );
};

const POST = async (request: Request) => {
  try {
    const incomingData: unknown = await request.json();
    if (checkResultType(incomingData)) {
      const { email, otp }: { email: string; otp: string } = incomingData;

      if (!email || !otp) {
        return Response.json(
          { msg: "Please provide email and otp" },
          { status: 400 },
        );
      }

      const emailExist = await db.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!emailExist) {
        return Response.json({ msg: "Invalid Credentials" }, { status: 401 });
      }
      if (emailExist) {
        if (emailExist.otp !== otp) {
          return Response.json(
            { msg: "Incorrect OTP. Please try again." },
            { status: 400 },
          );
        }
      }

      await db.user.update({
        where: {
          id: emailExist.id, // Specify the email field using equals
        },
        data: {
          otp: null,
          isVerified: true,
        },
      });

      return Response.json(
        {
          msg: "Verified successfully",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export { POST };
