import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { verify_jwt } from "~/helpers/jwt";
import { db } from "~/server/db";

interface userInterestitem {
  interestId: number;
}

const checkResultType = (obj: unknown): obj is { interestId: number } => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "interestId" in obj &&
    typeof obj.interestId === "number"
  );
};

// Returns all interests options
const GET = async (request: NextRequest) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);

    const allData = await db.interest.findMany();
    const interestData = await db.userInterest.findMany({
      where: { userId: userId },
      select: { interestId: true },
    });
    const selectedIDs: number[] = [];
    interestData.forEach((item: userInterestitem | null) => {
      if (item) {
        selectedIDs.push(item.interestId);
      }
    });

    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    const paginatedData = allData.slice(skip, skip + limit);

    return Response.json({
      selectedIDs,
      paginatedData,
    });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json({ msg: error.message }, { status: 500 });
    }
  }
};

// select  an options as interesting
const POST = async (request: Request) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);
    const incomingData: unknown = await request.json();

    if (checkResultType(incomingData)) {
      const { interestId } = incomingData;

      const data = await db.userInterest.create({
        data: { userId, interestId },
      });
      return Response.json({ msg: "Added successfully", data });
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json({ msg: error.message }, { status: 500 });
    }
  }
};

// remove an option from intersting list
const DELETE = async (request: Request) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const allData = await db.interest.findMany();

    const { userId } = verify_jwt(token);

    const incomingData: unknown = await request.json();

    if (checkResultType(incomingData)) {
      const { interestId } = incomingData;

      const data = await db.userInterest.deleteMany({
        where: { userId, interestId },
      });
      return Response.json({ msg: "Deleted successfully", data });
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json({ msg: error.message }, { status: 500 });
    }
  }
};

export { GET, POST, DELETE };
