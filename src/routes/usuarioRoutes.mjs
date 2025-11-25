import express from "express"
import { criarUsuarioController, listarUsuarioPorNomeController, listarUsuariosController, LoginUsuarioController } from "../controllers/usuarioController.mjs";
export const userRouter = express.Router();

userRouter.get("/", listarUsuariosController)
userRouter.get("/nome", listarUsuarioPorNomeController)
userRouter.get("/login", LoginUsuarioController);

userRouter.post("/", criarUsuarioController);
