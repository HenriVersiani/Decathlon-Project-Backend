import { alterarEmailUsuarioService, alterarImagemUsuarioService, alterarNomeUsuarioService, alterarSenhaUsuarioService, alterarUsuarioService, criarUsuarioService, deletarUsuarioService, encontrarUsuarioLoginService, encontrarUsuarioPorEmailService, encontrarUsuarioPorIdService, listarUsuariosPorNomeService, listarUsuariosService } from "../services/usuarioService.mjs"

export async function criarUsuarioController(req, res) {
    const data = req.body
    const { email } = data

    const usuarioExistente = await encontrarUsuarioPorEmailService(email)

    if (usuarioExistente) {
        return res.json({ error: "Email já existente!" })
    }

    const response = await criarUsuarioService(data)
    return res.json(response)
}

export async function listarUsuarioPorNomeController(req, res) {
    const data = req.params

    const response = await listarUsuariosPorNomeService(data)

    if(!response || response.length == 0){
        return res.json({error: "Usuario não encontrado!"})
    }
    
    return res.json(response)
}

export async function encontrarUsuarioPorIdController(req, res) {
    const { id } = req.params

    const response = await encontrarUsuarioPorIdService(id)

    if(!response || response == null){
        return res.json({error: "Usuario não encontrado!"})
    }

    return res.json(response)
}

export async function encontrarUsuarioPorEmailController(req, res) {
    const { email } = req.params

    const response = await encontrarUsuarioPorEmailService(email)

    if(!response || response.length == 0){
         return res.json({error: "Usuario não encontrado!"})
    }
    
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


export async function atualizarNomeUsuarioController(req, res) {
    const data = req.body
    const { id } = req.params

    const response = await alterarNomeUsuarioService(id, data)
    return res.json(response)
}

export async function atualizarEmailUsuarioController(req, res) {
    const data = req.body
    const { id } = req.params

    const response = await alterarEmailUsuarioService(id, data)
    return res.json(response)
}

export async function atualizarSenhaUsuarioController(req, res) {
    const data = req.body
    const { id } = req.params

    const response = await alterarSenhaUsuarioService(id, data)
    return res.json(response)
}

export async function atualizarImagemUsuarioController(req, res) {
    const { id } = req.params
    const data = req.body

    const response = await alterarImagemUsuarioService(id, data)
    return res.json(response)
}

// outros controllers de atualizar por campo especifico

export async function deletarUsuarioController(req, res) {
    const { id } = req.params
    
    const verifyUser = await encontrarUsuarioPorIdService(id)

    if (!verifyUser) {
        return res.json({error: "Usuário não encontrado!"})
    }

    const response = await deletarUsuarioService(id)

    return res.json(response)
}