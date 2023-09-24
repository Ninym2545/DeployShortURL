import { NextResponse } from "next/server";
import connect from "../../utils/connectDB";
import { redirect } from 'next/navigation'
import Url from "@/models/url";
import axios from "axios";
import { decode } from "next-auth/jwt";

export const GET = async (request , {params}) => {
  let {id} = params;
  id = decodeURIComponent(id)

  try {
    await connect();
    const data = await Url.findOne({ 
      shorturl : id
     });
     console.log(data);
     if (data) {
      data.clicked+=1;
      data.save();
      return NextResponse.redirect(data.fullurl)
  } else {
    return new NextResponse({ status: 404 });
  } 
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};