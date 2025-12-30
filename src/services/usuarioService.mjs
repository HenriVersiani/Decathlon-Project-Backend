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

    return { secret, expiresIn }
}

const gerarToken = (usuario) => {
    const { secret, expiresIn } = getJwtConfig()
    return jwt.sign({ sub: usuario._id, email: usuario.email, role: usuario.role }, secret, { expiresIn })
}

export async function encontrarUsuarioLoginService(data) {

    const { email, senha } = data

    const usuario = await encontrarUsuarioPorEmailService(email) //unica

    if (!usuario) {
        return { error: "Usuario não encontrado" }
    }

    if (usuario.lockUntil && usuario.lockUntil <= Date.now()) {
        await zerarUserTimeout(usuario)
    }

    const senhaVerify = await verifySenha(senha, usuario.senha)

    if (senhaVerify == false) {
        usuario.loginAttempts += 1
        await usuario.save();

        if (usuario.loginAttempts >= 5) {
            return await errorTentativas(usuario)
        }
        return { error: "Senha Incorreta" }
    }

    await zerarUserTimeout(usuario)

    const token = gerarToken(usuario)
    const { _id, nome } = usuario

    return { _id, nome, email, token }
}

export async function criarAdminService(data) {

    const payload = { ...data }

    payload.senha = await criptografarSenha(payload.senha)

    payload.role = "admin"

    const usuarioCriado = await salvarUsuarioBanco(payload)
    const token = gerarToken(usuarioCriado)
    const { _id, nome, email } = usuarioCriado

    return { token, _id, nome, email }
}

export async function criarUsuarioService(data) {

    const payload = { ...data }

    payload.senha = criptografarSenha(payload.senha)

    const usuarioCriado = await salvarUsuarioBanco(payload)
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
    const usuario = await Usuario.findOne({ email: email })
    return usuario
}


export async function alterarUsuarioService(id, newUserData) {

    const payload = { ...newUserData }

    payload.senha = criptografarSenha(payload.senha)

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

    const usuario = await encontrarUsuarioPorIdService(id)

    if(!usuario){
        return {error: "Usuario não encontrado!"}
    }

    const senhaVerify = await verifySenha(senhaAntiga, usuario.senha)

    if (senhaVerify == false) {
        return { error: "Senha incorreta informada" }
    }

    senhaNova = await criptografarSenha(senhaNova)

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
    return { message: `Usuario ${nome} deletado com sucesso!` }
}

export async function verifySenha(senhaNova, senhaAtual) {
    const senhaVerify = await bcrypt.compare(senhaNova, senhaAtual) //unica
    return senhaVerify
}

export async function errorTentativas(usuario) {
    usuario.lockUntil = new Date(Date.now() + 15 * 60 * 1000) // aqui eu vejo se ele tentou fazer login 5 vezes, se tentou, e nao conseguiu, entao eu defino o campo de lock para a data atual adicionando 15 minutos. (tempo que ele ficara sem poder logar.)
    await usuario.save()
    return { error: "Muitas tentativas de login, tente mais tarde!" } //unica
}

export async function zerarUserTimeout(usuario) {
    usuario.lockUntil = null; //unica
    usuario.loginAttempts = 0;
    await usuario.save();
}

export async function criptografarSenha(senha) {
    if(senha){
       return senha = await bcrypt.hash(senha, 10)
    }
}

export async function salvarUsuarioBanco(data) {
    return new Usuario(data).save()
}