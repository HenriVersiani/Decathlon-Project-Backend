import express from "express"
import { criarUsuarioController, listarUsuariosController } from "../controllers/usuarioController.mjs";
export const userRouter = express.Router();

userRouter.get("/", listarUsuariosController)

userRouter.post("/", criarUsuarioController);
