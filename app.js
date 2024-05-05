const express = require('express')
const app = express()
const port = 3004
const cors =require('cors')
app.use(express.static('public')) // public視為根目錄 不需要在路由path當中寫入public
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
require('dotenv').config()

const apis = require('./routes/index')
app.use('/api', apis)

app.listen(port, () => {
  
  console.info(`http://localhost:${port}`)
})
