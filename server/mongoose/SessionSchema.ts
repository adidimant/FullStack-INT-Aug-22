import { Schema, model } from "mongoose";

const SessionSchema= new Schema({
        id:{type:String},
        userName:{type:String},
        createdDate:{type:Number}
})

export const SessionModel = model("SessionModel", SessionSchema);