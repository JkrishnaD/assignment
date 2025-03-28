import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  address: string;
  password: string;
  bio?: string;
  profilePicture?: string;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,email: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true ,minlenght: 6},
  bio: { type: String },
  profilePicture: { type: String },
});

export default mongoose.model("User", UserSchema);
