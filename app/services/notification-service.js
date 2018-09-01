'use strict';

const ServerConfig = require('../configs/server-config');

/**
 * Data broadcasts to all players or a specific player
 */
class NotificationService {
    setSockets(sockets) {
        this.sockets = sockets;
    }

    broadcastClearBackgroundImage() {
        this.sockets.emit(ServerConfig.IO.OUTGOING.NEW_BACKGROUND_IMAGE);
    }

    broadcastGameState(gameState) {
        this.sockets.emit(ServerConfig.IO.OUTGOING.NEW_STATE, gameState);
    }

    broadcastKill(killerName, victimName, killerColor, victimColor, victimLength, victimId) {
        this.sockets.emit(
            ServerConfig.IO.OUTGOING.NOTIFICATION.KILL, killerName, victimName,
            killerColor, victimColor, victimLength, victimId,
        );
    }

    broadcastKillEachOther(victimSummaries) {
        this.sockets.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.KILLED_EACH_OTHER, victimSummaries);
    }

    broadcastNewBackgroundImage(backgroundImage) {
        this.sockets.emit(ServerConfig.IO.OUTGOING.NEW_BACKGROUND_IMAGE, backgroundImage);
    }

    broadcastNotification(message, fontColor) {
        console.log(message);
        this.sockets.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.GENERAL, message, fontColor);
    }

    broadcastRanIntoWall(playerName, playerId) {
        this.sockets.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.RAN_INTO_WALL, playerName, playerId);
    }

    broadcastSuicide(victimName, victimId) {
        this.sockets.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.SUICIDE, victimName, victimId);
    }

    notifyPlayerDied(playerId) {
        const playerSocket = this.sockets.connected[playerId];
        if (playerSocket) {
            playerSocket.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.YOU_DIED);
        }
    }

    notifyPlayerMadeAKill(playerId) {
        const playerSocket = this.sockets.connected[playerId];
        if (playerSocket) {
            playerSocket.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.YOU_MADE_A_KILL);
        }
    }

    notifyPlayerFoodCollected(playerId, text, coordinate, color, isSwap) {
        const playerSocket = this.sockets.connected[playerId];
        if (playerSocket) {
            playerSocket.emit(ServerConfig.IO.OUTGOING.NOTIFICATION.FOOD_COLLECTED, text, coordinate, color, isSwap);
        }
    }
}

module.exports = NotificationService;
