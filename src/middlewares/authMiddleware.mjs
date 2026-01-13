import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Informed token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decodifica o token recebido, verificando se foi criado com a minha chave SECRET ou NAO.

    req.user = { // cria um objeto que vai possuir as chaves id e chave email reais do usuario que esta acessando, para que eu possa ultilizar essas informaçoes depois.
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid or expired!" });
  }

}