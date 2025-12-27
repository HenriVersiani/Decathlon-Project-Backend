import { Usuario } from "../models/usuarioModel.mjs";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config()

const getJwtConfig = () => {
    const secret = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRES_IN

    if (!secret) {
        throw new Error("JWT_SECRET não configurado.");
    }

    return { secret, expiresIn}
}

const gerarToken = (usuario) =>{
    const {secret, expiresIn } = getJwtConfig()
    return jwt.sign({ sub: usuario._id, email: usuario.email }, secret, {expiresIn})
}

export async function encontrarUsuarioLoginService(data) {

    const { email, senha } = data

    const usuario = await Usuario.findOne({ email: email })

    if (usuario === null || usuario.length === 0) {
        return { error: "Usuario não encontrado" }
    }

    const senhaVerify = await bcrypt.compare(senha, usuario.senha)

    if (!senhaVerify) {
        return  { error: "Senha Incorreta" }
    }

    const token = gerarToken(usuario)
    const { _id, nome } = usuario

    return {_id, nome, email, token}
}

export async function criarUsuarioService(data) {

    const payload = { ...data }

    if (payload.senha) {
        payload.senha = await bcrypt.hash(payload.senha, 10)
    }

    const usuarioCriado = await new Usuario(payload).save()
    const token = gerarToken(usuarioCriado)
    const { _id, nome, email } = usuarioCriado

    return { token, _id, nome, email } // desestruturar para ficar as chaves do objeto usuario ao lado de token. para que o retorno seja 1 objeto com todas as chaves, e nao 2.
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
    const usuario = await Usuario.find({ email: email })
    return usuario[0]
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
        return { error: "Senha incorreta informada" }
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

export async function alterarImagemUsuarioService(id, newImagem) {


    const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, { imagem: newImagem.imagem }, {
        new: true,
        runValidators: true
    }).lean()

    return usuarioAtualizado
}

export async function deletarUsuarioService(id) {
    const usuario = await Usuario.findByIdAndDelete(id)
    const { nome } = usuario
    return {message: `Usuario ${nome} deletado com sucesso!`}
}
