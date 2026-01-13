export function isAdmin(req, res, next){
    if(req.user.role !== "admin"){
         return res.json({error: "Access denied!"})
    }
    next()
}