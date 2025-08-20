import mongoose, { Schema } from "mongoose";

const planSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    durationInDays:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
},{timestamps: true});

export const Plan = mongoose.model("Plan", planSchema);