const express = require('express')
const path = require('path')
const db = require('./db/mongoose')

const app = express();
const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})