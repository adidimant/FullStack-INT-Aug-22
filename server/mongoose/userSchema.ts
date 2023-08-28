import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  id: { type: String },
  userName: { type: String },
  password: { type: String },
  address: { type: String },
});

export const UserModel = model("userModle", UserSchema);
