import { NextResponse } from "next/server";
import connect from "../../../utils/connectDB";
import Users from "@/models/user";

export const GET = async (request) => {
  try {
    await connect();
    const users = await Users.find();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
