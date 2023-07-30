import { Schema, model } from "mongoose";

const InstegramPostSchema = new Schema({
    postName:{type:String},
    description:{type:String},
    userName:{type:String},
    date:{type:Date},
    image:{type:String}
})

export const InstegramPostModel = model("InstegramPostModel", InstegramPostSchema)


