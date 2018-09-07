import DomHelper from './view/dom-helper.js';
import GameController from './controller/game-controller.js';
const gameController = new GameController();
/* global io */
// io is a global variable for socket.io-client set from the view html
gameController.connect(io);

/* global firebaseApp */
console.log(firebaseApp);

/* global firebase */
const db = firebase.database();

let topThreeScores = [];

db.ref('snake-scores').orderByChild('score').limitToLast(3).on('value', (snapshot) => {
    console.log(snapshot.child);
    topThreeScores = [];

    snapshot.forEach((childSnapshot) => {
        const result = childSnapshot.val();
        result.name = childSnapshot.key;
        topThreeScores.push(result);
    });
    topThreeScores.reverse();
    DomHelper.setFirstPlaceScoreAndName(topThreeScores[0].name, topThreeScores[0].score);
    DomHelper.setSecondPlaceScoreAndName(topThreeScores[1].name, topThreeScores[1].score);
    DomHelper.setThirdPlaceScoreAndName(topThreeScores[2].name, topThreeScores[2].score);
});