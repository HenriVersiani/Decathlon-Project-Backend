import { Usuario } from "../models/usuarioModel.mjs";

export async function criarUsuarioService(data) {
    const novoUsuario = new Usuario(data)
    return await novoUsuario.save()
}

export async function listarUsuariosService() {
    return await Usuario.find()
}