import DomHelper from './view/dom-helper.js';
import GameController from './controller/game-controller.js';

const gameController = new GameController();
/* global io */
// io is a global variable for socket.io-client set from the view html
gameController.connect(io);

/* global firebase */
const db = firebase.database();

let topScores = [];

db.ref('snake-scores').orderByChild('highScore').limitToLast(10).on('value', (snapshot) => {
    topScores = [];

    snapshot.forEach((childSnapshot) => {
        const result = childSnapshot.val();
        result.name = childSnapshot.key;
        topScores.push(result);
    });
    topScores.reverse();
    topScores.forEach((score, index) => {
        DomHelper.setScoreAndNameAtIndex(index, topScores[index].name, topScores[index].highScore);
    });
});
