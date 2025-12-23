import express from "express"
import { atualizarEmailUsuarioController, atualizarImagemUsuarioController, atualizarNomeUsuarioController, atualizarSenhaUsuarioController, atualizarUsuarioController, criarUsuarioController ,  deletarUsuarioController, encontrarUsuarioPorEmailController, encontrarUsuarioPorIdController, listarUsuarioPorNomeController, listarUsuariosController, LoginUsuarioController } from "../controllers/usuarioController.mjs";
export const userRouter = express.Router();

userRouter.get("/", listarUsuariosController)
userRouter.get("/nome/:nome", listarUsuarioPorNomeController)
userRouter.get("/id/:id", encontrarUsuarioPorIdController)
userRouter.get("/email/:email", encontrarUsuarioPorEmailController)

userRouter.put("/:id", atualizarUsuarioController)
userRouter.put("/nome/:id", atualizarNomeUsuarioController)
userRouter.put("/email/:id", atualizarEmailUsuarioController)
userRouter.put("/senha/:id", atualizarSenhaUsuarioController)
userRouter.put("/imagem/:id", atualizarImagemUsuarioController)

userRouter.post("/login", LoginUsuarioController);
userRouter.post("/", criarUsuarioController);

userRouter.delete("/:id", deletarUsuarioController)

//all routes defined on FlashPost