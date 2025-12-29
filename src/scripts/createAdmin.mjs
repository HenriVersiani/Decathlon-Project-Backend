import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Usuario } from "../models/usuarioModel.mjs";
import dotenv from "dotenv"
import cors from 'cors'
import express from "express"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

await mongoose.connect(process.env.MONGO_URI);

const adminExiste = await Usuario.findOne({ email: "admin@gmail.com" });

if (!adminExiste) {
  await Usuario.create({
    nome: "Admin",
    email: "admin@gmail.com",
    senha: await bcrypt.hash("admin123", 10),
    imagem: "admin.png",
    role: "admin",
  });

  console.log("Admin criado com sucesso");
} else {
  console.log("Admin já existe");
}

process.exit();