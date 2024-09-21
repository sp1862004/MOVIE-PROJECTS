const cookieParser = require('cookie-parser');
const express = require('express')
const path = require('path')
const { mongoose } = require("mongoose");
const pageRout = require('./router/pageRout')
// const MovieRoute = require('./router/movieRout');
const userRoute = require('./router/movieRout');
const MovieRoute = require('./router/movieRout');
const app = express()
require('./Database/db')
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
// app.use(express.static("public"))
app.use(express.static("views"))
app.use('/profile', express.static('upload'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

app.use('/', pageRout)
app.use('/api/movie', MovieRoute)
app.use('/api/user', userRoute)

app.listen(PORT, () => {
    console.log(`listen port number = ${PORT}👌`)
})