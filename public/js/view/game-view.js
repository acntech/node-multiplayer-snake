/* eslint-disable no-restricted-syntax,class-methods-use-this */

import ClientConfig from '../config/client-config.js';
import DomHelper from './dom-helper.js';

const ENTER_KEYCODE = 13;
const SPACE_BAR_KEYCODE = 32;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

/**
 * Handles all requests related to the display of the game, not including the canvas
 */
export default class GameView {
    constructor(
        backgroundImageUploadCallback, imageUploadCallback,
        joinGameCallback, keyDownCallback, playerNameUpdatedCallback,
        spectateGameCallback, playerMode,
    ) {
        this.isChangingName = false;
        this.backgroundImageUploadCallback = backgroundImageUploadCallback;
        this.imageUploadCallback = imageUploadCallback;
        this.joinGameCallback = joinGameCallback;
        this.keyDownCallback = keyDownCallback;
        this.playerNameUpdatedCallback = playerNameUpdatedCallback;
        this.spectateGameCallback = spectateGameCallback;
        this.playerMode = playerMode;
        this._initEventHandling();
    }

    ready() {
        // Show everything when ready
        DomHelper.showAllContent();
        const storedName = localStorage.getItem(ClientConfig.LOCAL_STORAGE.PLAYER_NAME);
        if (storedName) {
            DomHelper.hideEnterPlayerNameLabel();
            DomHelper.showWelcomeBackLabel();
            DomHelper.setPlayerNameInputElementReadOnly(true);
        }
    }

    setKillMessageWithTimer(message) {
        DomHelper.setKillMessagesDivText(message);
        if (this.killMessagesTimeout) {
            clearTimeout(this.killMessagesTimeout);
        }
        this.killMessagesTimeout = setTimeout(
            DomHelper.clearKillMessagesDivText.bind(DomHelper),
            ClientConfig.TIME_TO_SHOW_KILL_MESSAGE_IN_MS,
        );
    }

    showKillMessage(killerName, victimName, killerColor, victimColor) {
        this.setKillMessageWithTimer(`<span style='color: ${killerColor}'>${killerName}</span> killed
        <span style='color: ${victimColor}'>${victimName}!</span> Good job, <span style='color: ${killerColor}'>${killerName}!</span>`);
    }

    showKilledEachOtherMessage(victimSummaries) {
        const victims = [];
        for (const victimSummary of victimSummaries) {
            victims.push(`<span style='color: ${victimSummary.color}'>${victimSummary.name}</span> `);
        }
        const victimMessage = victims.join(' and ');
        this.setKillMessageWithTimer(`${victimMessage} have killed each other!`);
    }

    showRanIntoWallMessage(playerName, playerColor) {
        this.setKillMessageWithTimer(`<span style='color: ${playerColor}'>${playerName}</span> ran into a wall. Watch your step, <span style='color: ${playerColor}'>${playerName}!</span> `);
    }

    showSuicideMessage(victimName, victimColor) {
        this.setKillMessageWithTimer(`<span style='color: ${victimColor}'>${victimName}</span> committed suicide. Uh-oh.`);
    }

    showNotification(notification, playerColor) {
        const notificationDiv = DomHelper.getNotificationsDiv();
        const formattedNotification = `<div><span class='time-label'>${new Date().toLocaleTimeString()} - </span>` +
            `<span style='color: ${playerColor}'>${notification}<span/></div>`;
        notificationDiv.innerHTML = formattedNotification + notificationDiv.innerHTML;
    }

    showPlayerStats(playerStats) {
        let formattedScores = '<div class="player-stats-header"><span class="image"></span>' +
            '<span class="name">Name</span>' +
            '<span class="stat">Score</span>' +
            '<span class="stat">High</span>' +
            '<span class="stat">Kills</span>' +
            '<span class="stat">Deaths</span></div>';
        for (const playerStat of playerStats) {
            let playerImageElement = '';
            if (playerStat.base64Image) {
                playerImageElement = `<img src=${playerStat.base64Image} class='player-stats-image'></img>`;
            }
            formattedScores += `<div class='player-stats-content'><span class='image'>${playerImageElement}</span>` +
                `<span class='name' style='color: ${playerStat.color}'>${playerStat.name}</span>` +
                `<span class='stat'>${playerStat.score}</span>` +
                `<span class='stat'>${playerStat.highScore}</span>` +
                `<span class='stat'>${playerStat.kills}</span>` +
                `<span class='stat'>${playerStat.deaths}</span></div>`;
        }
        DomHelper.setPlayerStatsDivText(formattedScores);
    }

    showNumberOfPlayers(players) {
        const content = `<span><i class="fas fa-users fa-2x"></i>${players}</span>`;
        DomHelper.setNumberOfPlayers(content);
    }

    updatePlayerName(playerName, playerColor) {
        DomHelper.setPlayerNameElementValue(playerName);
        DomHelper.setPlayerNameInputElementValue(playerName);
        if (playerColor) {
            DomHelper.setPlayerNameElementColor(playerColor);
            DomHelper.setPlayerNameInputElementColor(playerColor);
        }
    }

    /*******************
     *  Event handling *
     *******************/

    _handleChangeNameButtonClick() {
        this._register();
    }

    _handleQuitButtonClick() {
        location.reload();
    }

    _handleKeyDown(e) {
        // Prevent keyboard scrolling default behavior
        if ((e.keyCode === UP_ARROW_KEYCODE || e.keyCode === DOWN_ARROW_KEYCODE) ||
            (e.keyCode === SPACE_BAR_KEYCODE && e.target === DomHelper.getBody())) {
            e.preventDefault();
        }

        // When changing names, save new name on enter
        if (e.keyCode === ENTER_KEYCODE && this.isChangingName) {
            this._saveNewPlayerName();
            DomHelper.blurActiveElement();
            return;
        }

        if (!this.isChangingName) {
            this.keyDownCallback(e.keyCode);
        }
    }

    _handleBackgroundImageUpload() {
        const uploadedBackgroundImageAsFile = DomHelper.getBackgroundImageUploadElement().files[0];
        if (uploadedBackgroundImageAsFile) {
            // Convert file to image
            const image = new Image();
            const self = this;
            image.onload = () => {
                self.backgroundImageUploadCallback(image, uploadedBackgroundImageAsFile.type);
            };
            image.src = URL.createObjectURL(uploadedBackgroundImageAsFile);
        }
    }

    _handleImageUpload() {
        const uploadedImageAsFile = DomHelper.getImageUploadElement().files[0];
        if (uploadedImageAsFile) {
            // Convert file to image
            const image = new Image();
            const self = this;
            image.onload = () => {
                self.imageUploadCallback(image, uploadedImageAsFile.type);
            };
            image.src = URL.createObjectURL(uploadedImageAsFile);
        }
    }

    _handlePlayOrWatchButtonClick() {
        const command = DomHelper.getPlayOrWatchButton().textContent;
        if (command === 'Play') {
            DomHelper.setPlayOrWatchButtonText('Watch');
            this.joinGameCallback();
        } else {
            DomHelper.setPlayOrWatchButtonText('Play');
            this.spectateGameCallback();
        }
    }

    _saveNewPlayerName() {
        const playerName = DomHelper.getPlayerNameInputElement().value;
        if (playerName && playerName.trim().length > 0 && playerName.length <= ClientConfig.MAX_NAME_LENGTH) {
            this.playerNameUpdatedCallback(playerName);
            DomHelper.getPlayerNameInputElement().style.display = 'none';
            DomHelper.movePlayerNameToTop();
            this.joinGameCallback();
            this.isChangingName = false;
            DomHelper.hideInvalidPlayerNameLabel();
            DomHelper.hideTakenPlayerNameLabel();
        } else {
            DomHelper.showInvalidPlayerNameLabel();
        }
    }

    _showPlayerScore(playerName) {
        /* global firebase */
        const db = firebase.database();

        db.ref(`snake-scores/${playerName}`).on('value', (snapshot) => {
            const res = snapshot.val();
            DomHelper.setPlayerScore(res.score);
            DomHelper.setPlayerHighScore(res.highScore);
        });
    }

    _showPlayerRank(playerName) {
        /* global firebase */
        const db = firebase.database();

        db.ref('snake-scores').orderByChild('highScore').on('value', (snapshot) => {
            const topScores = [];
            snapshot.forEach((childSnapshot) => {
                const result = childSnapshot.val();
                result.name = childSnapshot.key;
                topScores.push(result);
            });
            topScores.reverse();

            const place = topScores.findIndex(player => player.name === playerName) + 1;
            DomHelper.setPlayerRank(place, topScores.length);
        });
    }

    _updatePlayerName(oldPlayerName, newPlayerName) {
        /* global firebase */
        const db = firebase.database();

        if (newPlayerName && newPlayerName.trim().length > 0 && newPlayerName.length <= ClientConfig.MAX_NAME_LENGTH) {
            fetch(`/users/${newPlayerName}`).then(res => res.json()).then((data) => {
                if (data.available) {
                    db.ref(`snake-scores/${oldPlayerName}`).once('value').then( snapshot => {
                        let oldData = snapshot.val();
                        db.ref(`snake-scores/${newPlayerName}`).set(oldData);
                        // Clean up old user
                        db.ref(`snake-scores`).child(`${oldPlayerName}`).remove();
                        // Update and continue game
                        this.updatePlayerName(newPlayerName);  
                        this._saveNewPlayerName();
                        this._createPlayer(newPlayerName);
                    });
                } else {
                    DomHelper.showTakenPlayerNameLabel();
                }
            });
        } else {
            DomHelper.showInvalidPlayerNameLabel();
        }
    }

    _register() {
        const storedName = localStorage.getItem(ClientConfig.LOCAL_STORAGE.PLAYER_NAME);

        if (storedName) {
            this._createPlayer(storedName);
            return;
        }

        const playerName = DomHelper.getPlayerNameInputElement().value;

        // Haven't played before, check name and proceed
        if (playerName && playerName.trim().length > 0 && playerName.length <= ClientConfig.MAX_NAME_LENGTH) {
            fetch(`/users/${playerName}`).then(res => res.json()).then((data) => {
                if (data.available) {
                    this._createPlayer(playerName);
                } else {
                    DomHelper.showTakenPlayerNameLabel();
                }
            });
        } else {
            DomHelper.showInvalidPlayerNameLabel();
        }
    }

    _createPlayer(playerName) {
        this.playerNameUpdatedCallback(playerName);
        DomHelper.getPlayerNameInputElement().style.display = 'none';
        DomHelper.showControlButtons();
        DomHelper.movePlayerNameToTop();
        this._showPlayerScore(playerName);
        this._showPlayerRank(playerName);
        this.joinGameCallback();
        this.isChangingName = false;
        DomHelper.hideInvalidPlayerNameLabel();
        DomHelper.hideTakenPlayerNameLabel();
    }

    _initEventHandling() {
        // Player controls
        if (this.playerMode) {
            DomHelper.getQuitButton().addEventListener('click', this._handleQuitButtonClick.bind(this));
            DomHelper.getChangeNameButton().addEventListener('click', this._handleChangeNameButtonClick.bind(this));
            DomHelper.getUpButton().addEventListener('touchend', this.emitUpClicked.bind(this));
            DomHelper.getDownButton().addEventListener('touchend', this.emitDownClicked.bind(this));
            DomHelper.getLeftButton().addEventListener('touchend', this.emitLeftClicked.bind(this));
            DomHelper.getRightButton().addEventListener('touchend', this.emitRightClicked.bind(this));
        }

        window.addEventListener('keydown', this._handleKeyDown.bind(this), true);
    }

    emitUpClicked() {
        const e = this.emptyKeydownEvent();
        e.keyCode = 38;
        e.which = e.keyCode;
        document.dispatchEvent(e);
    }

    emitDownClicked() {
        const e = this.emptyKeydownEvent();
        e.keyCode = 40;
        e.which = e.keyCode;
        document.dispatchEvent(e);
    }

    emitLeftClicked() {
        const e = this.emptyKeydownEvent();
        e.keyCode = 37;
        e.which = e.keyCode;
        document.dispatchEvent(e);
    }

    emitRightClicked() {
        const e = this.emptyKeydownEvent();
        e.keyCode = 39;
        e.which = e.keyCode;
        document.dispatchEvent(e);
    }

    emptyKeydownEvent() {
        const e = new Event('keydown');
        e.altKey = false;
        e.ctrlKey = false;
        e.shiftKey = false;
        e.metaKey = false;
        return e;
    }
}