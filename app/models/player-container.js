'use strict';

class PlayerContainer {
    constructor() {
        this._players = new Map();
        this._playerIdsToRespawn = new Set();
        this._spectatingPlayerIds = new Set();
        this._deathPoolPlayerIds = new Set();
    }

    reinitialize() {
        this._players.clear();
        this._playerIdsToRespawn.clear();
        this._spectatingPlayerIds.clear();
        this._deathPoolPlayerIds.clear();
    }

    addPlayer(player) {
        this._players.set(player.id, player);
    }

    addPlayerIdToRespawn(playerId) {
        this._playerIdsToRespawn.add(playerId);
    }

    addSpectatingPlayerId(playerId) {
        this._spectatingPlayerIds.add(playerId);
    }

    getPlayer(playerId) {
        return this._players.get(playerId);
    }

    getPlayers() {
        return this._players.values();
    }

    getPlayerIdsToRespawn() {
        return this._playerIdsToRespawn;
    }

    getNumberOfPlayers() {
        return this._players.size;
    }

    getNumberOfActivePlayers() {
        return this._players.size - this._spectatingPlayerIds.size;
    }

    getAnActivePlayer(excludedPlayerId) {
        const activePlayerIds = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const playerId of this._players.keys()) {
            if (playerId !== excludedPlayerId &&
                !this._spectatingPlayerIds.has(playerId) && !this._playerIdsToRespawn.has(playerId)) {
                activePlayerIds.push(playerId);
            }
        }
        // eslint-disable-next-line no-bitwise
        return this._players.get(activePlayerIds[activePlayerIds.length * Math.random() << 0]);
    }

    isSpectating(playerId) {
        return this._spectatingPlayerIds.has(playerId);
    }

    isWaitingToRespawn(playerId) {
        return this._playerIdsToRespawn.has(playerId);
    }

    addPlayerIdToDeathPool(playerId) {
        this._deathPoolPlayerIds.add(playerId);
    }

    removePlayerIdFromDeathPool(playerId) {
        this._deathPoolPlayerIds.delete(playerId);
    }

    isDead(playerId) {
        return this._deathPoolPlayerIds.has(playerId);
    }

    removePlayer(playerId) {
        this._players.delete(playerId);
    }

    removePlayerIdToRespawn(playerId) {
        this._playerIdsToRespawn.delete(playerId);
    }

    removeSpectatingPlayerId(playerId) {
        this._spectatingPlayerIds.delete(playerId);
    }

    toJSON() {
        const response = [];
        this._players.forEach((player) => {
            response.push(player);
        });
        return response;
    }
}

module.exports = PlayerContainer;
