import http from 'node:http'

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

const users = []

const server = http.createServer(async (req,res) => {
    const { method, url } = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    if (method === 'GET' && url === '/users') {
        // Early return
        return res
        .setHeader('Content-type','application/json')
        .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email,
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)