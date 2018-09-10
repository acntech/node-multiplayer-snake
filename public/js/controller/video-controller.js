import ClientConfig from '../config/client-config.js';
import VideoView from '../view/video-view.js';

export default class VideoController {
    constructor() {
        this.videoView = new VideoView(this.videoEndedCallback.bind(this));
    }

    connect(io) {
        this.socket = io();
        this._initializeSocketIoHandlers();
    }

    videoEndedCallback() {
        this.startingGame = true;
        window.location.href = '/spectate';
    }

    startGame() {
        this.startingGame = true;
        window.location.href = '/spectate';
    }

    _initializeSocketIoHandlers() {
        this.socket.on(
            ClientConfig.IO.INCOMING.START_GAME,
            this.startGame,
        );
    }
}
