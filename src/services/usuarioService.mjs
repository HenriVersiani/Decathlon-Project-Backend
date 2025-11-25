import { Usuario } from "../models/usuarioModel.mjs";
import bcrypt from "bcryptjs";

export async function criarUsuarioService(data) {

    const payload = { ...data }

    if (payload.senha) {
        payload.senha = await bcrypt.hash(payload.senha, 10)
    }

    const novoUsuario = new Usuario(payload)
    return await novoUsuario.save()
}

export async function listarUsuariosService() {
    return await Usuario.find()
}

export async function listarUsuariosPorNome(data) {

    const nomeUsuario = data.nome

    return await Usuario.find({
    nome: { $regex: nomeUsuario, $options: "i" }
  });
}

export async function encontrarUsuarioLogin(data) {

    const { email, senha } = data

    const usuario = await Usuario.find({email: email})

    console.log(usuario)

    if (usuario.length === 0) {
        return "Usuário não encontrado!"
    }

    const senhaVerify = await bcrypt.compare(senha, usuario[0].senha)

    console.log(senhaVerify)

    if (!senhaVerify) {
        return "Senha Incorreta"
    }

    return usuario
}