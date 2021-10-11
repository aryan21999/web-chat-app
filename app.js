const http = require('http');
const express = require('express');
const path = require('path');
const db = require('./db/mongoose');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
// const io = socketio(server);

app.use(express.static(__dirname + '././public'));
const publicDirectoryPath = path.join(__dirname, '/views/')

// io.on('connection', socket => {
//   console.log('New webSocket Connection...');

//   socket.emit('message', 'Welcome to Web-Chat-App');
// })

app.set("view engine", "ejs");

app.get('/', function (req, res, next) {
  res.render(`${publicDirectoryPath}signin`)
})

app.get('/index', function (req, res, next) {
  res.render(`${publicDirectoryPath}index`)
})

app.get('/signup', function (req, res, next) {
  res.render(`${publicDirectoryPath}signup`)
})

app.get('/forget', function (req, res, next) {
    res.render(`${publicDirectoryPath}forget`)
  })

app.get('/addContact', function (req, res, next) {
    res.render(`${publicDirectoryPath}addContact`)
  })

app.use(express.static(publicDirectoryPath))


app.use(express.json())
app.use(express.static("public"));

const port = process.env.port || 3000

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})