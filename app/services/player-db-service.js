'use strict';

const DbService = require('./db-service');

class PlayerDbService {
    constructor() {
        this._dbService = new DbService();
    }

    createNew(playerId, playerName) {
        try {
            this._dbService.performQuery(
                'INSERT INTO player (id, name, high_score) VALUES($1, $2, $3)',
                [playerId, playerName, 0, 0],
            );
        } catch (err) {
            console.log(err);
        }
    }

    getPlayer(playerId) {
        return new Promise((resolve, reject) => {
            try {
                this._dbService.performQuery(
                    'SELECT id, name, high_score FROM player WHERE id = $1',
                    [playerId],
                ).then((dbResult) => {
                    const result = {
                        id: dbResult.rows[0].id,
                        name: dbResult.rows[0].name,
                        high_score: dbResult.rows[0].high_score,
                    };
                    resolve(result);
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

    updatePlayerScore(playerId, score) {
        try {
            this._dbService.performQuery(
                'SELECT high_score FROM player WHERE id = $1',
                [playerId],
            ).then((res) => {
                if (res.row[0].high_score < score) {
                    this._dbService.performQuery('UPDATE player SET high_score = $1 WHERE id = $2', [score, playerId]);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    getPlayerWithHighestScore() {
        return new Promise((resolve, reject) => {
            try {
                this._dbService.performQuery(
                    'SELECT id, name, high_score FROM player WHERE high_score = (SELECT MAX(high_score) FROM player)',
                    [],
                ).then((dbResult) => {
                    const result = {
                        id: dbResult.rows[0].id,
                        name: dbResult.rows[0].name,
                        high_score: dbResult.rows[0].high_score,
                    };
                    resolve(result);
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
}

module.exports = PlayerDbService;
