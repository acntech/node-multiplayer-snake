'use strict';

const Firebase = require('firebase');

class DbService {
    constructor() {
        let config = {
            apiKey: process.env.FIREBASE_APIKEY,
            authDomain: "jz-2018.firebaseapp.com",
            databaseURL: "https://jz-2018.firebaseio.com",
            projectId: "jz-2018",
            storageBucket: "jz-2018.appspot.com",
            messagingSenderId: process.env.MESSAGING_SENDER_ID
        };

        if(!Firebase.apps.length){
            Firebase.initializeApp(config);
        }
    }

    //TODO: phonenumber
    write(userId, score){
        let db = Firebase.database();

        db.ref('snake-scores/' + userId).set({
            score: score
        });
    }
}

module.exports = DbService;
