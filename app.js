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

const apis = require('./routes/index')

app.use('/api', apis)

app.get('/', function (req, res) {
  res.send('home');
});

app.listen(port, () => {
  console.info(`http://localhost:${port}`)
})
