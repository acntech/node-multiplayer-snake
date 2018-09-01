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

    usernameAlreadyExists(userId) {
        // TODO: Does not work
        return new Promise(
        this.db.ref(`snake-scores/${userId}`).once('value').then((snapshot) => {
            console.log('****** Snapshot: ', snapshot.val());
            user = snapshot.val();
            return user;
        })
    )
    }

    existingScoreOrDefaultScore(userId) {
        return this.usernameAlreadyExists(userId) ? this.usernameAlreadyExists(userId).score : 0;
    }

    referenceToScore(userId) {
        return this.db.ref(`snake-scores/${userId}/score`);
        // reference.on('value', (snapshot) => { handle change in $snapshot.val() real time });
    }

    addPhoneNumber(userId, phoneNumber) {
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
