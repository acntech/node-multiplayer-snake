import DomHelper from './dom-helper.js';

export default class VideoView {
    constructor(videoEndedCallback) {
        this.videoEndedCallback = videoEndedCallback;
        this._initEventHandling();
    }

    _handleVideoEnded() {
        this.videoEndedCallback();
    }

    _initEventHandling() {
        DomHelper.getVideo().addEventListener('ended', this._handleVideoEnded.bind(this));
    }
}
