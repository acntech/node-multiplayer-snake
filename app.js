'use strict';

const path = require('path');
const GameController = require('./app/controllers/game-controller');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const favicon = require('serve-favicon');
const lessMiddleware = require('less-middleware');

app.use(lessMiddleware(path.join(__dirname, 'public')));
// Expose all static resources in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Redirect to the main page
app.get('/spectate', (request, response) => {
    response.sendFile('game.html', { root: path.join(__dirname, 'app/views') });
});

app.get('/', (req, res) => {
    res.sendFile('play.html', { root: path.join(__dirname, 'app/views') });
});

app.post('/score', (req, res) => {
    const { playerName, phoneNumber, highScore } = req.body;
    // TODO: Persist playerName, phoneNumber and score
    res.sendFile('done.html', { root: path.join(__dirname, 'app/views') });
});

// Create the main controller
const gameController = new GameController();
gameController.listen(io);

const SERVER_PORT = process.env.PORT || 3000;
app.set('port', SERVER_PORT);

// Start Express server
server.listen(app.get('port'), () => {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
