const express = require('express')
const cors = require('cors')

const app = express()

const bicicletas = [
  { id: 1, nombre: 'Mountain Bike', precio: 300000, categoria: 'montana' },
  { id: 2, nombre: 'BMX', precio: 200000, categoria: 'urbana' },
  { id: 3, nombre: 'Ruta', precio: 500000, categoria: 'ruta' }
]

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/bicicletas', (req, res) => {
  const categoria = req.query.categoria
  const orden = req.query.orden
  let resultado = [...bicicletas]

  if (!categoria) {
    resultado = [...bicicletas]
  } else {
    resultado = bicicletas.filter((item) => item.categoria === categoria)
  }

  if (orden === 'asc') {
    resultado.sort((a, b) => a.precio - b.precio)
  }

  if (orden === 'desc') {
    resultado.sort((a, b) => b.precio - a.precio)
  }

  res.json(resultado)
})

app.get('/api/bicicletas/:id', (req, res) => {
  const bicicleta = bicicletas.find((item) => item.id === Number(req.params.id))

  if (!bicicleta) {
    res.status(404).json({ error: 'Bicicleta no encontrada' })
    return
  }

  res.json(bicicleta)
})

module.exports = { app, bicicletas }
