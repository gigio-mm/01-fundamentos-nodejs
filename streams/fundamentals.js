// Netflix & Spotify

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000 linhas
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> Inserções no banco de dados

// 10mb/s -> 10.000 linhas

// Readable Streams / Writeable Streams

// Streams ->

//process.stdin
    //.pipe(process.stdout) 

import { Readable, Writable, Transform } from 'node:stream'

class OnetoHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform{
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, enconding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OnetoHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())