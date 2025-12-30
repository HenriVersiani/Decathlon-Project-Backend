API backend desenvolvida em Node.js com foco em CRUD de usuários, validação rigorosa de dados, middlewares de segurança, controle de permissões (admin) e persistência de dados com MongoDB.

O projeto segue uma arquitetura modular e escalável, separando responsabilidades entre controllers, services, repositories e middlewares, facilitando manutenção, testes e evolução do sistema.

🚀 Tecnologias Utilizadas

Node.js

Express

MongoDB + Mongoose

JWT (JSON Web Token)

Bcrypt

Dotenv

CORS

Rate Limit

🔐 Funcionalidades
👤 Usuários

Criar usuário

Login usuário

Listar usuários

Buscar usuário por ID

Atualizar usuário -- diversas formas

Deletar usuário

🛡️ Segurança

Hash de senha com bcrypt

Autenticação via JWT

Controle de acesso por role (admin / user)

Proteção de rotas com middlewares

Rate limit contra brute force

Headers de segurança com Helmet

✅ Validações

Validação de payloads de entrada

Verificação de dados obrigatórios

Prevenção de dados inválidos ou maliciosos

Tratamento centralizado de erros

🔑 Autenticação e Autorização
Middleware de Autenticação
authMiddleware
Verifica token JWT
Injeta o usuário autenticado no req.user
Middleware de Admin
adminMiddleware

Permite acesso apenas para usuários com role: "admin"

📌 Exemplo de Fluxo de Requisição
Request → Middleware Auth → Middleware Admin → Controller → Service → MongoDB

▶️ Como Executar o Projeto
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev

# rodar em produção
npm start

📚 Boas Práticas Aplicadas
Separação clara de responsabilidades
Código limpo e organizado
Middlewares reutilizáveis
Segurança desde a entrada de dados
Escalável para novos módulos

🧠 Autor
Desenvolvido por Henrique Versiani
Backend Developer | Node.js | MongoDB | Segurança de APIs
