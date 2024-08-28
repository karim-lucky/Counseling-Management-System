



import { CounsellingSchema } from "@/models/counselingDetailSchema";
import mongoose from "mongoose";
export function ConnectDB(){
    mongoose.connect("mongodb://localhost:27017/myconselingDetail").then(async function(connection){
        console.log(connection);
// for(let i = 0;i<10;i++){
//     let a = new CounsellingSchema();
//     await a.save();
// }

        console.log("db connect successfull Bro")
    })
} 