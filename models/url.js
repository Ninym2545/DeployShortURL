import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const {Schema} = mongoose


const UrlSchema = new Schema({
    fullurl:{
        type: String,
        required: true,
    },
    shorturl:{
        type: String,
        unique: true,
        required: true,
    },
    clicked:{
        type: Number,
        default : 0
    },
    userid:{
        type: ObjectId,
        ref: 'users'
    }
},{timestamps: true}
);

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);