'use strict';

const ServerConfig = require('../configs/server-config');

class UtilityService {
    constructor(playerContainer, notificationService) {
        this.playerContainer = playerContainer;
        this.notificationService = notificationService;

        this.currentFPS = ServerConfig.STARTING_FPS;
    }

    changeSpeed(playerId, speedOption) {
        const player = this.playerContainer.getPlayer(playerId);
        let notification = player.name;
        if (speedOption === ServerConfig.INCREMENT_CHANGE.INCREASE) {
            if (this.currentFPS < ServerConfig.MAX_FPS) {
                notification += ' has raised the game speed.';
                this.currentFPS += 1;
            } else {
                notification += ' tried to raised the game speed past the limit.';
            }
        } else if (speedOption === ServerConfig.INCREMENT_CHANGE.DECREASE) {
            if (this.currentFPS > ServerConfig.MIN_FPS) {
                notification += ' has lowered the game speed.';
                this.currentFPS -= 1;
            } else {
                notification += ' tried to lower the game speed past the limit.';
            }
        } else if (speedOption === ServerConfig.INCREMENT_CHANGE.RESET) {
            this._resetSpeed();
            notification += ' has reset the game speed.';
        }
        this.notificationService.broadcastNotification(notification, player.color);
    }

    getGameSpeed() {
        return this.currentFPS;
    }

    _resetSpeed() {
        this.currentFPS = ServerConfig.STARTING_FPS;
    }
}

module.exports = UtilityService;
