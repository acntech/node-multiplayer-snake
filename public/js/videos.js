import VideoController from './controller/video-controller.js';

const videoController = new VideoController();
/* global io */
// io is a global variable for socket.io-client set from the view html
videoController.connect(io);
