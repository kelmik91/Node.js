const db = require('./models/db.js');
const initdb = require('./models/initdb.js');
initdb();

const express = require('express');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db);
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Большой секрет",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 }
});

app.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on('connection', socket => {
  if (!socket.request.session || !socket.request.session.username) {
    console.log('Unauthorised user connected!');
    socket.disconnect();
    return;
  }

  console.log('Chat user connected:', socket.request.session.username);

  socket.on('disconnect', () => {
    console.log('Chat user disconnected:', socket.request.session.username);
  })

  socket.on('chatMessage', (data) => {
    console.log('Chat message from', socket.request.session.username+':', data);
    let chatParams = [];
    chatParams.push(socket.request.session.username)
    chatParams.push(data.message);
    console.log(chatParams);
    data.message = socket.request.session.username + ': ' + data.message; // Добавление сообщения в БД
    createChat(chatParams);
    io.emit('chatMessage', data);
    // console.log(io.sockets.sockets);
  })
})

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

const registerHelpers = require('./views/helpers');
registerHelpers();

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const router = require('./routers');
const { createChat } = require('./models/chat.js');

app.use(router);

http.listen(3000, () => {
    console.log('Server listening on 3000 port.');
});
