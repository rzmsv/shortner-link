const express = require('express');
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
require('dotenv').config()
const homePage = require('../routes/link')
const redirectLink = require('../routes/redirectLink')
const {error404} = require('../routes/erorr')
// set
app.set('view engine', 'pug')
app.set('./views', 'views')
// middlewares
app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))
// routes
app.use("/", homePage)
app.use("/", redirectLink)




//errors
app.use(error404)

const port = process.env.app_port || 3000
app.listen(port, () => {
  console.log(`Connect to port: ${port}`)
})