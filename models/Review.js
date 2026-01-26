const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        gymId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gym",
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Prevent multiple reviews from same user for same gym
reviewSchema.index({ userId: 1, gymId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
