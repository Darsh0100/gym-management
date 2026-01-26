const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    facilities: {
      type: [String], // e.g. ["Weights", "Cardio", "Trainer"]
      default: [],
    },
    images: {
      type: [String], // Cloudinary URLs
      default: [],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

gymSchema.index({
  name: "text",
  description: "text",
});
gymSchema.index({ city: 1 });
gymSchema.index({ createdAt: -1 });
gymSchema.index({ city: 1, createdAt: -1 });

module.exports = mongoose.model("Gym", gymSchema);
