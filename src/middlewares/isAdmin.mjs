export function isAdmin(req, res, next){
    if(req.user.role !== "admin"){
         return res.json({error: "Acesso Negado!"})
    }
    next()
}