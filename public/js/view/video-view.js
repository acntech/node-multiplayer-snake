import DomHelper from './dom-helper.js';

export default class VideoView {
    constructor(videoEndedCallback) {
        this.video = 1;
        this.videoEndedCallback = videoEndedCallback;
        this._initEventHandling();
    }

    _handleVideoEnded() {
        this.video += 1;
        if (this.video > DomHelper.getVideoPlayer().childElementCount) {
            this.videoEndedCallback();
        }
        DomHelper.getVideoPlayer().src = `assets/video${this.video}.mp4`;
        DomHelper.getVideoPlayer().play();
    }

    _initEventHandling() {
        DomHelper.getVideoPlayer().addEventListener('ended', this._handleVideoEnded.bind(this));
    }
}
