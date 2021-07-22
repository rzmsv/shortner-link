const express = require('express');
const http = require('http')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const csrf = require('csurf')
require('dotenv').config()
const homePage = require('../routes/link')
const redirectLink = require('../routes/redirectLink')
const {error404} = require('../routes/erorr')
const server = http.createServer(app)
const csrfProtection = csrf({cookie: true})

// set
app.set('view engine', 'pug')
app.set('./views', 'views')

// middlewares
app.use(session({
  secret: process.env.sessionSecret,
  resave: true,
  saveUninitialized: true,
}))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(csrfProtection)

app.use((req,res,next)=>{
  res.locals.csrfToken = req.csrfToken()
  next()
})
// routes
app.use("/", homePage)
app.use("/", redirectLink)
//errors
app.use(error404)

const port = process.env.app_port || 3000
server.listen(port, () => {
  console.log(`Connect to port: ${port}`)
})