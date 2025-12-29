export function checkUserOwnership(req, res, next) {
    const { id } = req.params

    if(req.user.role === "admin"){
        return next()
    }

    if(req.user.id !== id){
        return res.status(403).json({error: "Acesso Negado!"})
    }

    next()
} // esse middleware vai verificar se o id enviado no parametro da rota (usuario que quer acessar), é o mesmo do usuario no qual o token foi gerado,
  // que vem do objeto criado req.user, a partir da minha resposta jwt, que eu defini que deve retornar o id e o email, como segurança para eu verificara aqui.

  