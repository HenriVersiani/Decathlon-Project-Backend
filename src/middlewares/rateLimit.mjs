//limitador de numero de requisicoes
// importante pra eu conseguir impedir uma sobrecarga no meu sistema, ou ate possiveis ataques.

import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        error: "Muitas tentativas de login! Tente mais Tarde."
    }
})

