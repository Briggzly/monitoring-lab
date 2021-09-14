const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '4eeff726083f4cecbcfca0718dffaf91',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('HTML file served successfully!')
})

const port = process.env.PORT || 4545;

app.listen(port, () => {
    console.log(`server running on server ${port}`)
})