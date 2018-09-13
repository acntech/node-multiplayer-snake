'use strict';

const ServerConfig = require('../configs/server-config');

/**
 * Admin-specific functionality
 */
class AdminService {
    constructor(playerContainer, foodService, nameService, notificationService, playerService) {
        this.playerContainer = playerContainer;
        this.foodService = foodService;
        this.nameService = nameService;
        this.notificationService = notificationService;
        this.playerService = playerService;

        this.playerStartLength = ServerConfig.PLAYER_STARTING_LENGTH;
        this.currentFPS = ServerConfig.STARTING_FPS;
        this.botIds = [];
    }

    changeBots(socket, botOption) {
        if (botOption === ServerConfig.INCREMENT_CHANGE.INCREASE) {
            this._addBot(socket);
        } else if (botOption === ServerConfig.INCREMENT_CHANGE.DECREASE) {
            this._removeBot();
        } else if (botOption === ServerConfig.INCREMENT_CHANGE.RESET) {
            this._resetBots();
        }
    }

    changeFood(playerId, foodOption) {
        const player = this.playerContainer.getPlayer(playerId);
        let notification = player ? player.name : 'Admin';
        if (foodOption === ServerConfig.INCREMENT_CHANGE.INCREASE) {
            this.foodService.generateSingleFood();
            notification += ' has added some food.';
        } else if (foodOption === ServerConfig.INCREMENT_CHANGE.DECREASE) {
            if (this.foodService.getFoodAmount() > 0) {
                this._removeLastFood();
                notification += ' has removed some food.';
            } else {
                notification += ' couldn\'t remove food.';
            }
        } else if (foodOption === ServerConfig.INCREMENT_CHANGE.RESET) {
            this._resetFood();
            notification += ' has reset the food.';
        }
        this.notificationService.broadcastNotification(notification, 'maroon');
    }

    changeSpeed(playerId, speedOption) {
        const player = this.playerContainer.getPlayer(playerId);
        let notification = player ? player.name : 'Admin';
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
        this.notificationService.broadcastNotification(notification, 'maroon');
    }

    changeStartLength(playerId, lengthOption) {
        const player = this.playerContainer.getPlayer(playerId);
        let notification = player.name;
        if (lengthOption === ServerConfig.INCREMENT_CHANGE.INCREASE) {
            notification += ' has increased the player start length.';
            this.playerStartLength += 1;
        } else if (lengthOption === ServerConfig.INCREMENT_CHANGE.DECREASE) {
            if (this.playerStartLength > 1) {
                notification += ' has decreased the player start length.';
                this.playerStartLength -= 1;
            } else {
                notification += ' tried to lower the player start length past the limit.';
            }
        } else if (lengthOption === ServerConfig.INCREMENT_CHANGE.RESET) {
            this._resetPlayerStartLength();
            notification += ' has reset the player start length.';
        }
        this.notificationService.broadcastNotification(notification, player.color);
    }

    getBotIds() {
        return this.botIds;
    }

    getGameSpeed() {
        return this.currentFPS;
    }

    getPlayerStartLength() {
        return this.playerStartLength;
    }

    resetGame() {
        this._resetBots();
        this._resetFood();
        this._resetSpeed();
        this._resetPlayerStartLength();
    }

    _addBot(socket) {
        if (this.botIds.length >= ServerConfig.MAX_BOTS) {
            this.notificationService.broadcastNotification(
                'Admin tried to add a bot past the limit.',
                'maroon',
            );
            return;
        }
        const newBotId = this.nameService.getBotId();
        const newBot = this.playerService.createBot(socket, newBotId);
        this.notificationService.broadcastNotification(`${newBot.name} has joined!`, newBot.color);
        this.botIds.push(newBot.id);
    }

    _removeBot() {
        if (this.botIds.length > 0) {
            this.playerService.disconnectPlayer(this.botIds.pop());
        } else {
            this.notificationService.broadcastNotification(
                'Admin tried to remove a bot that doesn\'t exist.',
                'maroon',
            );
        }
    }

    _resetBots() {
        while (this.botIds.length > ServerConfig.DEFAULT_STARTING_BOTS) {
            this._removeBot();
        }
    }

    _removeLastFood() {
        this.foodService.removeFood(this.foodService.getLastFoodIdSpawned());
    }

    _resetFood() {
        while (this.foodService.getFoodAmount() > ServerConfig.FOOD.DEFAULT_AMOUNT) {
            this._removeLastFood();
        }
        while (this.foodService.getFoodAmount() < ServerConfig.FOOD.DEFAULT_AMOUNT) {
            this.foodService.generateSingleFood();
        }
    }

    _resetPlayerStartLength() {
        this.playerStartLength = ServerConfig.PLAYER_STARTING_LENGTH;
    }

    _resetSpeed() {
        this.currentFPS = ServerConfig.STARTING_FPS;
    }
}

module.exports = AdminService;
