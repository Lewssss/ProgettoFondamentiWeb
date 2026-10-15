import ArtWork from "../models/ArtWork.js";

const ArtWorkService = {
  async getAllArtWorks() {
    return ArtWork.find().sort({ createdAt: -1 }).lean();
  },

  async getArtWorkById(id) {
    return ArtWork.findById(id).lean();
  },
};

export default ArtWorkService;
