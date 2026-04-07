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
  res.json(bicicletas)
})

module.exports = { app, bicicletas }
