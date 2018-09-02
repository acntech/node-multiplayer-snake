/* eslint-disable no-restricted-syntax */

const NotificationService = require('../services/notification-service');

/**
 * Controls the videos
 */
class VideoController {
    constructor() {
        this.notificationService = new NotificationService();
    }

    startVideos() {
        this.notificationService.broadcastStartVideo();
    }

    listen(io) {
        this.notificationService.setSockets(io.sockets);
    }
}

module.exports = VideoController;
