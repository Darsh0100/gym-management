import mongoose, { Schema } from "mongoose";

const SubsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    plan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    startDate:{
        type: Date,
        default: Date.now()
    },
    endDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ["active", "inactive"]
    }
},{timestamps: true});

export const subsSchema = mongoose.model("subsSchema", SubsSchema);