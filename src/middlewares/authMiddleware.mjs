import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

    console.log(token)

  if (!token) {
    return res.status(401).json({ error: "Token não informado" });
  }

  return res.status(201).json({message: "Logado com sucesso!"})
}