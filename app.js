const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home');
});

app.listen(port, () => {
  console.info(`http://localhost:${port}`)
})
