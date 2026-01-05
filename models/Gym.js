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
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
