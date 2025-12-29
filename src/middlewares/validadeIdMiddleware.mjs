import mongoose from "mongoose";

export function validateObjectId(req, res, next) {
  const { id } = req.params;

  console.log(id)

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  next();
}