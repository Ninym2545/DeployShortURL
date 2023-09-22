import { Double } from "mongodb";
import mongoose from "mongoose";

const {Schema} = mongoose


const UserSchema = new Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
    }
},{timestamps: true}
);

export default mongoose.models.User || mongoose.model("User", UserSchema);