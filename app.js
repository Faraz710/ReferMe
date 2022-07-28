require('dotenv').config({ path: 'config/.env' })
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const routes = require('./routes/router')

const PORT = process.env.PORT || 3000
const DB = process.env.MONGODB_URI

mongoose.connect(DB, {useNewUrlParser: true})
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})