export default function dosUaProtection(req, res, next){
    const ua = req.headers["user-agent"]

    if(!ua){
        return res.status(400).end() 
    } //previnir userAgent estranho ou nao vindo de navegador

    if(ua.length <= 10){
        return res.status(400).end() 
    }

    console.log(ua)
    next()
}