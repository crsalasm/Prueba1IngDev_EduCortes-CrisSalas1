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

  console.log('Pruebas OK')
}

main().catch((error) => {
  console.error('Pruebas fallidas')
  console.error(error)
  process.exit(1)
})
