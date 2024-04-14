import { db } from "~/server/db";

// Delete all users
const DELETE = async () => {
  try {
    await db.user.deleteMany();
    return Response.json({ msg: "created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export { DELETE };
