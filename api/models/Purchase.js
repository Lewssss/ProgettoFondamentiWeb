import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    ArtWork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ArtWork",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["simulated"],
      default: "simulated",
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "purchases",
  },
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;
