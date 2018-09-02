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

    getUser(userId) {
        return new Promise((resolve, reject) => {
            this.db.ref(`snake-scores/${userId}`).once('value').then((snapshot) => {
                if(!snapshot.val() || snapshot.val() === ''){
                    reject('User does not exist in database');
                } else {
                    resolve(snapshot.val());
                }
            })
        });
    }

    referenceToScore(userId) {
        return this.db.ref(`snake-scores/${userId}/score`);
        // reference.on('value', (snapshot) => { handle change in $snapshot.val() real time });
    }

    storePhoneNumber(userId, phoneNumber) {
        this.db.ref(`snake-scores/${userId}`).update({
            phoneNumber,
        });
    }

    updateScore(userId, score) {
        this.db.ref(`snake-scores/${userId}`).set({
            score,
        });
    }
}

module.exports = DbService;
