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

export async function encontrarUsuarioPorIdService(id) {
    return await Usuario.findById(id)
}

export async function listarUsuariosPorNomeService(data) {

    const nomeUsuario = data.nome

    return await Usuario.find({
        nome: { $regex: nomeUsuario, $options: "i" }
    });
}

export async function encontrarUsuarioPorEmailService(email) {
    return await Usuario.find({ email: email })
}

export async function encontrarUsuarioLoginService(data) {

    const { email, senha } = data

    const usuario = await Usuario.find({ email: email })

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

export async function alterarUsuarioService(id, newUserData) {

    const payload = { ...newUserData }

    if (payload.senha) {
        payload.senha = await bcrypt.hash(payload.senha, 10)
    }

    const usuarioAtualizado = Usuario.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).lean();

    return usuarioAtualizado
}

export async function alterarNomeUsuarioService(id, newName) {

    console.log(newName)

    const usuarioAtualizado = Usuario.findByIdAndUpdate(id, { nome: newName.nome }, { // fazendo assim para garantir que vai ser alterado o campo "nome"
        new: true,
        runValidators: true,
    }).lean();

    return usuarioAtualizado
}

export async function alterarEmailUsuarioService(id, newEmail) {

    const usuarioAtualizado = Usuario.findByIdAndUpdate(id, { email: newEmail.email }, {
        new: true,
        runValidators: true
    }).lean()

    return usuarioAtualizado
}

export async function alterarSenhaUsuarioService(id, data) {

    let { senhaNova, senhaAntiga } = data

    const usuario = await Usuario.findById(id)

    console.log(senhaAntiga, senhaNova)

    const senhaVerify = await bcrypt.compare(senhaAntiga, usuario.senha)

    if (!senhaVerify) {
         return "Senha informada Incorreta"
    }

    if (senhaNova) {
        senhaNova = await bcrypt.hash(senhaNova, 10)
    }

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, { senha: senhaNova }, {
        new: true,
        runValidators: true
    }).lean()

    return usuarioAtualizado
}

export async function deletarProfessorService(id) {
    return await Usuario.findByIdAndDelete(id)
}