import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// UUID => Unique Universal ID

// - Criar usuários
// - Listar usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
// - Método HTTP
// - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Busca uma recurso no back-end
// POST => Criar um recurso
// PUT => Editar ou atualizar um recurso no back-end
// PATCH => Atualizar uma informação única ou específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless (Salva ou não em memória)

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code



const server = http.createServer(async (req,res) => {
    const { method, url } = req

    await json(req,res)

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if (route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)