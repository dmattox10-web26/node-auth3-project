const express = require('express')

const apiRouter = require('./routes/api')

//const auth = require('./middleware/auth')
const configure = require('./middleware/config')

const server = express()

configure(server)

server.use('/api', apiRouter)

module.exports = server