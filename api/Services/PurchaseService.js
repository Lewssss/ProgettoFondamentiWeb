import ArtWork from "../models/ArtWork.js";
import Purchase from "../models/Purchase.js";

const PurchaseService = {
  async createSimulatedPurchase(ArtWorkId, UserId) {
    const ReservedArtWork = await ArtWork.findOneAndUpdate(
      { _id: ArtWorkId, available: true },
      { $set: { available: false } },
      { new: true, runValidators: true },
    );

    if (!ReservedArtWork) {
      const ExistingArtWork = await ArtWork.findById(ArtWorkId);

      const Error = new Error(
        ExistingArtWork
          ? "L'opera non è più disponibile."
          : "Opera non trovata.",
      );

      Error.status = ExistingArtWork ? 409 : 404;
      throw Error;
    }

    try {
      return await Purchase.create({
        User: UserId,
        ArtWork: ReservedArtWork._id,
        title: ReservedArtWork.title,
        artist: ReservedArtWork.artist,
        price: ReservedArtWork.price,
        status: "simulated",
      });
    } catch (Error) {
      await ArtWork.updateOne(
        { _id: ReservedArtWork._id, available: false },
        { $set: { available: true } },
      );

      throw Error;
    }
  },

  async getPurchasesByUser(UserId) {
    return Purchase.find({ User: UserId }).sort({ purchasedAt: -1 }).lean();
  },
};

export default PurchaseService;
