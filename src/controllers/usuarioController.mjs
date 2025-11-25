import { criarUsuarioService, encontrarUsuarioLogin, listarUsuariosPorNome, listarUsuariosService } from "../services/usuarioService.mjs"

export async function criarUsuarioController(req, res) {
    const data = req.body

    const response = await criarUsuarioService(data)
    return res.json(response)
}

export async function listarUsuarioPorNomeController(req, res) {
    const data = req.body

    const response = await listarUsuariosPorNome(data)
    return res.json(response)
}

export async function listarUsuariosController(req, res) {
    const response = await listarUsuariosService()
    return res.json(response)
} 

export async function LoginUsuarioController(req, res) {
    const data = req.body

    const response = await encontrarUsuarioLogin(data)
    return res.json(response)
}
