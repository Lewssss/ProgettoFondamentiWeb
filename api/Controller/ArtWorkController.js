import { Router } from "express";
import mongoose from "mongoose";
import ArtWorkService from "../Services/ArtWorkService.js";

const ArtWorkController = Router();

ArtWorkController.get("/", async (req, res) => {
  try {
    const artWorks = await ArtWorkService.getAllArtWorks();

    return res.status(200).json(artWorks);
  } catch (error) {
    console.error("Errore nel recupero delle opere:", error);

    return res.status(500).json({
      message: "Impossibile recuperare le opere del museo.",
    });
  }
});

ArtWorkController.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Identificativo dell'opera non valido.",
      });
    }

    const artWork = await ArtWorkService.getArtWorkById(id);

    if (!artWork) {
      return res.status(404).json({
        message: "Opera non trovata.",
      });
    }

    return res.status(200).json(artWork);
  } catch (error) {
    console.error("Errore nel recupero dell'opera:", error);

    return res.status(500).json({
      message: "Impossibile recuperare l'opera.",
    });
  }
});

export default ArtWorkController;
