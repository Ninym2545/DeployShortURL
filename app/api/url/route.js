import { NextResponse } from "next/server";
import connect from "../../../utils/connectDB";
import Url from "@/models/url";
import axios from "axios";
import ShortUniqueId from "short-unique-id";


export const GET = async (request) => {
  try {
    await connect();
    const url = await Url.find();

    return new NextResponse(JSON.stringify(url), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

export const POST = async (require) => {
  try {
    const {url , user} = await require.json();
    const res = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
    // const uid = new ShortUniqueId({ length: 10 });
    // uid.rnd();
    const urls = await Url.findOne({
      fullurl: url
      ,userid : user
    });
    if(urls){
      
        return new NextResponse(error.message, {
          status: 500,
        });
      
    }

    const newUrl = new Url({
      fullurl: url,
      shorturl:res.data.result.full_short_link,
      userid:user
    });
     await newUrl.save();
    console.log("db ->>>",newUrl);
    // console.log("createurl ---->",newUrl);
    // return new NextResponse.json(JSON.stringify(newUrl), { status: 200 });
    return new NextResponse(JSON.stringify(newUrl), {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
 