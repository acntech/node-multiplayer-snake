import DomHelper from './view/dom-helper.js';

/* global firebase */
const db = firebase.database();

console.log('hello');

db.ref('snake-scores').on('value', (snapshot) => {
    console.log(snapshot.val());
});
