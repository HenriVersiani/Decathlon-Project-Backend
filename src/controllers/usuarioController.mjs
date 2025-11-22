import { criarUsuarioService, listarUsuariosService } from "../services/usuarioService.mjs"

export async function criarUsuarioController(req, res) {
    const data = req.body

    const response = await criarUsuarioService(data)
    return res.json(response)
}

export async function listarUsuariosController(req, res) {
    const response = await listarUsuariosService()
    return res.json(response)
}