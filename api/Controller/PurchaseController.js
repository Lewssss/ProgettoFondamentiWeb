import { Router } from "express";
import mongoose from "mongoose";
import PurchaseService from "../Services/PurchaseService.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";

const PurchaseController = Router();

PurchaseController.get("/", authenticateToken, async (req, res) => {
  try {
    const UserId = req.user.userId;
    const Purchases = await PurchaseService.getPurchasesByUser(UserId);

    return res.status(200).json({ Purchases });
  } catch (Error) {
    console.error("Errore nel recupero degli acquisti:", Error);

    return res.status(500).json({
      message: "Errore durante il recupero degli acquisti.",
    });
  }
});

PurchaseController.post("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "ID dell'opera non valido.",
      });
    }

    const UserId = req.user.userId;

    const Purchase = await PurchaseService.createSimulatedPurchase(id, UserId);

    return res.status(201).json({
      message: "Acquisto simulato completato.",
      Purchase,
    });
  } catch (Error) {
    console.error("Errore nell'acquisto simulato:", Error);

    return res.status(Error.status || 500).json({
      message: Error.status
        ? Error.message
        : "Errore durante l'acquisto simulato.",
    });
  }
});

export default PurchaseController;
