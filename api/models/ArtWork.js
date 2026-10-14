import mongoose from "mongoose";

const ArtWorkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      //Descrizione storico-artistica, es. Un'opera della collezione dimostrativa
      type: String,
      default: "",
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "artworks",
  },
);

const ArtWork = mongoose.model("ArtWork", ArtWorkSchema);

export default ArtWork;
