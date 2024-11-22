const express = require('express')
const app = express()
app.use(express.json())

const db = require('./db/dbConfig.js')
const depositionController = require('./controllers/deposition.js')
const notesController = require('./controllers/notes.js')

const cors = require('cors')
app.use(cors())

// app.use('/depo', depositionController )
app.use('/notes', notesController )

app.get('/', (req, res) => {
  res.send (`Welcome to my_legal_be`)
})
app.get('*', (req, res) => {
  res.send (`This file is not available!`)
})

module.exports = app;
