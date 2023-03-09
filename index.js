require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middleware/errorMiddleware')
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use('/static', express.static(__dirname + '/static'))
app.use(errorMiddleware)

const start = async () => {

    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(process.env.PORT, process.env.HOST, () => console.log(`Server started http://${process.env.HOST}:${process.env.PORT}`))
    }
    catch (err) {
        console.log('[inedx.js start()]: ', err)
    }

}

start()