import express from "express"
import { atualizarEmailUsuarioController, atualizarImagemUsuarioController, atualizarNomeUsuarioController, atualizarSenhaUsuarioController, atualizarUsuarioController, criarAdminController, criarUsuarioController ,  deletarUsuarioController, encontrarUsuarioPorEmailController, encontrarUsuarioPorIdController, listarUsuarioPorNomeController, listarUsuariosController, LoginUsuarioController } from "../controllers/usuarioController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { checkUserOwnership } from "../middlewares/ownershipMiddleware.mjs";
import { loginLimiter } from "../middlewares/rateLimit.mjs";
import { validateObjectId } from "../middlewares/validadeIdMiddleware.mjs";
import { isAdmin } from "../middlewares/isAdmin.mjs";
import dosUaProtection from "../middlewares/dosUaProtection.mjs";

export const userRouter = express.Router();

userRouter.get("/",authMiddleware, listarUsuariosController)
userRouter.get("/nome/:nome",authMiddleware, listarUsuarioPorNomeController)
userRouter.get("/id/:id",authMiddleware, encontrarUsuarioPorIdController)
userRouter.get("/email/:email",authMiddleware, encontrarUsuarioPorEmailController)

userRouter.put("/:id",authMiddleware, checkUserOwnership, atualizarUsuarioController)
userRouter.put("/nome/:id",authMiddleware, checkUserOwnership, atualizarNomeUsuarioController)
userRouter.put("/email/:id",authMiddleware, checkUserOwnership, atualizarEmailUsuarioController)
userRouter.put("/senha/:id",authMiddleware,validateObjectId, checkUserOwnership, atualizarSenhaUsuarioController)
userRouter.put("/imagem/:id",authMiddleware, checkUserOwnership, atualizarImagemUsuarioController)

userRouter.post("/login", loginLimiter,dosUaProtection, LoginUsuarioController);
userRouter.post("/",dosUaProtection, criarUsuarioController);
userRouter.post("/admin",authMiddleware, isAdmin ,criarAdminController)

userRouter.delete("/:id",authMiddleware,validateObjectId, checkUserOwnership,  deletarUsuarioController)

//all routes defined on Flashpostt