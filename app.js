const http = require('http');
const express = require('express');
const path = require('path');
const db = require('./db/mongoose');
const userRouter = require('./routers/user')
const friendRouter = require('./routers/friend')
const chatRouter = require('./routers/chat')
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server);


app.use(express.static(__dirname + '././public'));
const publicDirectoryPath = path.join(__dirname, '/views/')


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

io.on('connection', () => {
  console.log('New webSocket Connection...');

  // socket.emit('message', 'Welcome to Web-Chat-App');
})

// io.on('connection', (socket) => {
//   socket.on('chat', (msg, receiver) => {
//       console.log("connection successful")
//       io.emit(receiver, msg);
//   });
// })


app.use(express.json())
app.use(express.static("public"));
app.use(userRouter)
app.use(friendRouter)
app.use(chatRouter)


const port = process.env.port || 3000


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})