import { alterarUsuarioService, criarUsuarioService,  deletarProfessorService,  encontrarUsuarioLoginService, encontrarUsuarioPorEmailService, encontrarUsuarioPorIdService, listarUsuariosPorNomeService, listarUsuariosService } from "../services/usuarioService.mjs"

export async function criarUsuarioController(req, res) {
    const data = req.body

    const response = await criarUsuarioService(data)
    return res.json(response)
}

export async function listarUsuarioPorNomeController(req, res) {
    const data = req.body

    const response = await listarUsuariosPorNomeService(data)
    return res.json(response)
}

export async function encontrarUsuarioPorIdController(req, res){
    const { id } = req.params
    const response = await encontrarUsuarioPorIdService(id)

    return res.json(response)
}

export async function encontrarUsuarioPorEmailController(req, res){
    const { email } = req.body

    const response = await encontrarUsuarioPorEmailService(email)
    return res.json(response)
}

export async function listarUsuariosController(req, res) {
    const response = await listarUsuariosService()
    return res.json(response)
} 

export async function LoginUsuarioController(req, res) {
    const data = req.body

    const response = await encontrarUsuarioLoginService(data)
    return res.json(response)
}

export async function atualizarUsuarioController(req, res) {
    const data = req.body
    const { id } = req.params

    const response = await alterarUsuarioService(id, data)
    return res.json(response)
}

// outros controllers de atualizar por campo especifico

export async function deletarProfessorController(req, res){
    const { id } = req.params

    const response = await deletarProfessorService(id)
    return res.json(response)
}