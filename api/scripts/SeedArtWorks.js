import "dotenv/config";
import mongoose from "mongoose";
import ArtWork from "../models/ArtWork.js";

const ArtWorks = [
  {
    title: "La luce del silenzio",
    artist: "Elena Moretti",
    description:
      "Un'opera dimostrativa dedicata al rapporto tra luce e spazio.",
    year: 2023,
    price: 1250,
    category: "Pittura contemporanea",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
  {
    title: "Forme in movimento",
    artist: "Luca Ferri",
    description: "Un'esplorazione dimostrativa di forme e colori.",
    year: 2024,
    price: 980,
    category: "Arte astratta",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
  {
    title: "Oltre l'orizzonte",
    artist: "Sofia Ricci",
    description:
      "Un'opera dimostrativa che invita a esplorare nuove prospettive.",
    year: 2022,
    price: 1750,
    category: "Arte moderna",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
];

async function SeedArtWorks() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI non configurato nel file .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    for (const artWork of ArtWorks) {
      await ArtWork.updateOne(
        {
          title: artWork.title,
          artist: artWork.artist,
        },
        {
          $setOnInsert: artWork,
        },
        {
          upsert: true,
        },
      );
    }

    console.log("Opere dimostrative inserite o già presenti.");
  } catch (error) {
    console.error("Errore durante il popolamento:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

SeedArtWorks();
