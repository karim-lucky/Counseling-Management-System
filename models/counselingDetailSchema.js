
import mongoose from "mongoose"

const counselingDetailSchema=mongoose.Schema({
    
        clientSelect: String,
        clientNameAerobic: String,
        clientNameEnglish: String,
        emailAddress:String,
        legalForm: String,
        address:String,
        consultationTitle: String,
        consultingType: String,
        consultingPeriod: String,
        consultationDate: Date,
        consultingMethod: String,
        counsel: String,
        consultationTime: String,
        phoneNumber: Number,
        theFileAttachment:String,
        theCounselingFact:String,
        caseFacts:String,

    
})

export const CounsellingSchema=mongoose.models.counsels || mongoose.model("counsels",counselingDetailSchema)