import { NextResponse } from "next/server";
import connect from "../../../../utils/connectDB";
import Url from "@/models/url";




export const GET = async (request , {params}) => {
    const {id} = params;
  try {
    await connect();

    const urls = await Url.find({
        userid : id
    })


    return new NextResponse(JSON.stringify(urls), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};