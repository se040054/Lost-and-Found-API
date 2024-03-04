const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('dotenv').config()

const apis = require('./routes/index')
app.use('/api', apis)

app.listen(port, () => {
  console.info(`http://localhost:${port}`)
})
