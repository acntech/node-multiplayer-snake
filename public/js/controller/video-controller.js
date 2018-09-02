import VideoView from '../view/video-view.js';

export default class VideoController {
    constructor() {
        this.videoView = new VideoView(this.videoEndedCallback.bind(this));
    }

    connect(io) {
        this.socket = io();
    }

    videoEndedCallback() {
        this.startingGame = true;
        window.location.href = '/';
    }
}
