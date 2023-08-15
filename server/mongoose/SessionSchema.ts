import { Schema, model } from "mongoose";

const SessionSchema = new Schema({
        id: { type: String },
        userName: { type: String },
        createdDate: { type: Number },
        isActive: { type: Boolean }
})

export const SessionModel = model("SessionModel", SessionSchema);