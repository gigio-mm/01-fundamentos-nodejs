import http from 'node:http';

import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
      const transformed = Number(chunk.toString()) * -1

      console.log(transformed)
  
      callback(null, Buffer.from(String(transformed)))
    }
}

// req => ReadableStream
// res => WriteableStream

const server = http.createServer(async (req, res) => {
  const buffers = []

  // async/await

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // { "name": "Diego", "email": diego@rocketseat.com.br } JSON não é viável para ser enviado por streams parciais

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  //return req
  //  .pipe(new InverseNumberStream())
  //  .pipe(res)
})

server.listen(3334)