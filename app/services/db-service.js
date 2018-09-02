'use strict';

const Firebase = require('firebase');

class DbService {
    constructor() {
        this.config = {
            apiKey: process.env.FIREBASE_APIKEY,
            authDomain: 'jz-2018.firebaseapp.com',
            databaseURL: 'https://jz-2018.firebaseio.com',
            projectId: 'jz-2018',
            storageBucket: 'jz-2018.appspot.com',
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
        };

        if (!Firebase.apps.length) { // prevents double initialization
            Firebase.initializeApp(this.config);
        }

        this.db = Firebase.database();
    }

    getPlayer(playerName) {
        return new Promise((resolve, reject) => {
            this.db.ref(`snake-scores/${playerName}`).once('value').then((snapshot) => {
                if(!snapshot.val() || snapshot.val() === ''){
                    reject('Player does not exist in database');
                } else {
                    resolve(snapshot.val());
                }
            })
        });
    }

    referenceToScore(playerName) {
        return this.db.ref(`snake-scores/${playerName}/score`);
        // reference.on('value', (snapshot) => { handle change in $snapshot.val() real time });
    }

    // TODO: get player with highest score

    storePhoneNumber(playerName, phoneNumber) {
        this.db.ref(`snake-scores/${playerName}`).update({
            phoneNumber,
        });
    }

    updateScore(playerName, score) {
        this.db.ref(`snake-scores/${playerName}`).set({
            score,
        });
    }
}

module.exports = new DbService();
