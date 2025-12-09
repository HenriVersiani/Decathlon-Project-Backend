import express from "express"
import { atualizarEmailUsuarioController, atualizarNomeUsuarioController, atualizarSenhaUsuarioController, atualizarUsuarioController, criarUsuarioController , deletarProfessorController, encontrarUsuarioPorEmailController, encontrarUsuarioPorIdController, listarUsuarioPorNomeController, listarUsuariosController, LoginUsuarioController } from "../controllers/usuarioController.mjs";
export const userRouter = express.Router();

userRouter.get("/", listarUsuariosController)
userRouter.get("/nome/:nome", listarUsuarioPorNomeController)
userRouter.get("/id/:id", encontrarUsuarioPorIdController)
userRouter.get("/email/:email", encontrarUsuarioPorEmailController)

userRouter.put("/:id", atualizarUsuarioController)
userRouter.put("/nome/:id", atualizarNomeUsuarioController)
userRouter.put("/email/:id", atualizarEmailUsuarioController)
userRouter.put("/senha/:id", atualizarSenhaUsuarioController)
// alterar imagem

// rotas com diferentes campos de alteraçao.

userRouter.post("/login", LoginUsuarioController);
userRouter.post("/", criarUsuarioController);

userRouter.delete("/:id", deletarProfessorController)
