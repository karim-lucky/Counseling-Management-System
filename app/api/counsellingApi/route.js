import { CounsellingSchema } from "@/models/counselingDetailSchema";
import axios from "axios";
import { NextResponse } from "next/server";




export  async function POST(req){
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   
      let data= await req.json();
   console.log(data);
  
   if(data){
    console.log("ddddddddddddddddddddddddddddddddddddddddddddddd")
    let newCounselling= new CounsellingSchema(data)
    await newCounselling.save();
   }

   return NextResponse.json({
    success:true,
    data
   })


}

export async function  GET(req) {
    let counsel=await CounsellingSchema.find();

    console.log(counsel);

    return NextResponse.json({
        success:true,
        counsel,
    })
}