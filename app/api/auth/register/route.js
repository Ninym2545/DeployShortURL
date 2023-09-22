import connect from "../../../../utils/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import Users from "@/models/user";

const BASE_URL = process.env.NEXTAUTH_URL;

export const POST = async (request) => {
  try {
    const { firstname, lastname, email, password } = await request.json();
    const user = await Users.findOne({
      email: email,
    });
    if (user) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }
    const pass = await bcrypt.hash(password, 12);

    const userExist = await Users.findOne({
      email: email,
    });

    if (userExist) return { message: "Verify Success!" };

    const newUser = new Users({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: pass,
    });
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
