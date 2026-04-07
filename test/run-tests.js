const assert = require('node:assert/strict')

const { app } = require('../src/app')

async function requestJson(pathname) {
  const server = app.listen(0)

  try {
    const { port } = server.address()
    const response = await fetch(`http://127.0.0.1:${port}${pathname}`)
    const body = await response.json()

    return { response, body }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error)
          return
        }

        resolve()
      })
    })
  }
}

async function main() {
  const health = await requestJson('/health')
  assert.equal(health.response.status, 200)
  assert.deepEqual(health.body, { status: 'ok' })

  const bicicletas = await requestJson('/api/bicicletas')
  assert.equal(bicicletas.response.status, 200)
  assert.equal(Array.isArray(bicicletas.body), true)
  assert.equal(bicicletas.body.length, 3)
  assert.equal(bicicletas.body[0].nombre, 'Mountain Bike')

  const filtradas = await requestJson('/api/bicicletas?categoria=ruta')
  assert.equal(filtradas.response.status, 200)
  assert.equal(filtradas.body.length, 1)
  assert.equal(filtradas.body[0].categoria, 'ruta')

  const ordenadas = await requestJson('/api/bicicletas?orden=desc')
  assert.equal(ordenadas.response.status, 200)
  assert.equal(ordenadas.body[0].precio, 500000)
  assert.equal(ordenadas.body[2].precio, 200000)

  const bicicleta = await requestJson('/api/bicicletas/2')
  assert.equal(bicicleta.response.status, 200)
  assert.equal(bicicleta.body.id, 2)
  assert.equal(bicicleta.body.nombre, 'BMX')

  const bicicletaNoEncontrada = await requestJson('/api/bicicletas/999')
  assert.equal(bicicletaNoEncontrada.response.status, 404)
  assert.equal(bicicletaNoEncontrada.body.error, 'Bicicleta no encontrada')

  console.log('Pruebas OK')
}

main().catch((error) => {
  console.error('Pruebas fallidas')
  console.error(error)
  process.exit(1)
})
