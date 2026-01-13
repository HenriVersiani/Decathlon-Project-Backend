import mongoose from "mongoose";

export function validateObjectId(req, res, next) {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  next();
}