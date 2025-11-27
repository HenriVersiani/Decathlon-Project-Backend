import express from "express"
import { atualizarUsuarioController, criarUsuarioController , deletarProfessorController, encontrarUsuarioPorEmailController, encontrarUsuarioPorIdController, listarUsuarioPorNomeController, listarUsuariosController, LoginUsuarioController } from "../controllers/usuarioController.mjs";
export const userRouter = express.Router();

userRouter.get("/", listarUsuariosController)
userRouter.get("/nome", listarUsuarioPorNomeController)
userRouter.get("/login", LoginUsuarioController);
userRouter.get("/id/:id", encontrarUsuarioPorIdController)
userRouter.get("/email", encontrarUsuarioPorEmailController)

userRouter.put("/:id", atualizarUsuarioController)

userRouter.post("/", criarUsuarioController);

userRouter.delete("/:id", deletarProfessorController)
