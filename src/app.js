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

  if (!categoria) {
    res.json(bicicletas)
    return
  }

  const filtradas = bicicletas.filter((item) => item.categoria === categoria)
  res.json(filtradas)
})

app.get('/api/bicicletas/:id', (req, res) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'El identificador debe ser numerico' })
    return
  }

  const bicicleta = bicicletas.find((item) => item.id === id)

  if (!bicicleta) {
    res.status(404).json({ error: 'Bicicleta no encontrada' })
    return
  }

  res.json(bicicleta)
})

module.exports = { app, bicicletas }
