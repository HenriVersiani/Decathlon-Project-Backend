import express from "express"
import { atualizarEmailUsuarioController, atualizarNomeUsuarioController, atualizarSenhaUsuarioController, atualizarUsuarioController, criarUsuarioController , deletarProfessorController, encontrarUsuarioPorEmailController, encontrarUsuarioPorIdController, listarUsuarioPorNomeController, listarUsuariosController, LoginUsuarioController } from "../controllers/usuarioController.mjs";
export const userRouter = express.Router();

userRouter.get("/", listarUsuariosController)
userRouter.get("/nome", listarUsuarioPorNomeController)
userRouter.get("/login", LoginUsuarioController);
userRouter.get("/id/:id", encontrarUsuarioPorIdController)
userRouter.get("/email", encontrarUsuarioPorEmailController)

userRouter.put("/:id", atualizarUsuarioController)
userRouter.put("/nome/:id", atualizarNomeUsuarioController)
userRouter.put("/email/:id", atualizarEmailUsuarioController)
userRouter.put("/senha/:id", atualizarSenhaUsuarioController)
// rotas com diferentes campos de alteraçao.

userRouter.post("/", criarUsuarioController);

userRouter.delete("/:id", deletarProfessorController)
