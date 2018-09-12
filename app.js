'use strict';

const path = require('path');
const GameController = require('./app/controllers/game-controller');
const VideoController = require('./app/controllers/video-controller');
const express = require('express');
const auth = require('http-auth');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const favicon = require('serve-favicon');
const lessMiddleware = require('less-middleware');
const DbService = require('./app/services/db-service');

const { ADMIN_USER, ADMIN_PWD } = process.env;
const basic = auth.basic({
    realm: 'acnwall',
}, (username, password, callback) => {
    callback(username === ADMIN_USER && password === ADMIN_PWD);
});
const authMiddleware = auth.connect(basic);

app.use(lessMiddleware(path.join(__dirname, 'public')));
// Expose all static resources in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// Redirect to the main page
app.get('/spectate', (request, response) => {
    response.sendFile('game.html', {
        root: path.join(__dirname, 'app/views'),
    });
});

app.get('/', (req, res) => {
    res.sendFile('play.html', {
        root: path.join(__dirname, 'app/views'),
    });
});

app.get('/videos', (req, res) => {
    res.sendFile('video.html', { root: path.join(__dirname, 'app/views') });
});

app.get('/draw', (req, res) => {
    res.sendFile('draw.html', { root: path.join(__dirname, 'app/views') });
});

app.get('/admin', authMiddleware, (req, res) => {
    res.sendFile('videoadmin.html', { root: path.join(__dirname, 'app/views') });
});

const videoController = new VideoController();
videoController.listen(io);
app.post('/videos', authMiddleware, (req, res) => {
    videoController.startVideos();
    res.redirect('/admin');
});

app.post('/game', authMiddleware, (req, res) => {
    videoController.startGame();
    res.redirect('/admin');
});

// Create the main controller
const gameController = new GameController();
gameController.listen(io);

app.get('/settings', (req, res) => {
    res.sendFile('settings.html', { root: path.join(__dirname, 'app/views') });
});

app.get('/users/:playerName', (req, res) => {
    DbService.getPlayer(req.params.playerName)
        .then(() => {
            res.send({
                available: false,
            });
        })
        .catch(() => {
            res.send({
                available: true,
            });
        });
});

const SERVER_PORT = process.env.PORT || 3000;
app.set('port', SERVER_PORT);

// Start Express server
server.listen(app.get('port'), () => {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;