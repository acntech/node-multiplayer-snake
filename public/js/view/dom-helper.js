/**
 * DOM manipulation helper
 */
export default class DomHelper {
    static blurActiveElement() {
        document.activeElement.blur();
    }

    static clearKillMessagesDivText() {
        this.setKillMessagesDivText('');
    }

    static createElement(elementName) {
        return document.createElement(elementName);
    }

    static getBackgroundImageUploadElement() {
        return document.getElementById('background-image-upload');
    }

    static getBody() {
        return document.body;
    }

    static getClearUploadedBackgroundImageButton() {
        return document.getElementById('clearUploadedBackgroundImageButton');
    }


    static getChangeNameButton() {
        return document.getElementById('changePlayerNameButton');
    }

    static getControlButtons() {
        return document.getElementById('playerSettings');
    }

    static getClearUploadedImageButton() {
        return document.getElementById('clearUploadedImageButton');
    }

    static getDecreaseBotsButton() {
        return document.getElementById('decreaseBotsButton');
    }

    static getDecreaseFoodButton() {
        return document.getElementById('decreaseFoodButton');
    }

    static getDecreaseSpeedButton() {
        return document.getElementById('decreaseSpeedButton');
    }

    static getDecreaseStartLengthButton() {
        return document.getElementById('decreaseStartLengthButton');
    }

    static getFullScreenButton() {
        return document.getElementById('full-screen-button');
    }

    static getGameBoardDiv() {
        return document.getElementById('game-board');
    }

    static getImageUploadElement() {
        return document.getElementById('image-upload');
    }

    static getIncreaseBotsButton() {
        return document.getElementById('increaseBotsButton');
    }

    static getIncreaseFoodButton() {
        return document.getElementById('increaseFoodButton');
    }

    static getIncreaseSpeedButton() {
        return document.getElementById('increaseSpeedButton');
    }

    static getIncreaseStartLengthButton() {
        return document.getElementById('increaseStartLengthButton');
    }

    static getNotificationsDiv() {
        return document.getElementById('notifications');
    }

    static getPlayerNameElement() {
        return document.getElementById('player-name');
    }

    static getPlayerNameInputElement() {
        return document.getElementById('player-name-input');
    }

    static getPlayOrWatchButton() {
        return document.getElementById('play-or-watch-button');
    }

    static getResetBotsButton() {
        return document.getElementById('resetBotsButton');
    }

    static getResetFoodButton() {
        return document.getElementById('resetFoodButton');
    }

    static getResetSpeedButton() {
        return document.getElementById('resetSpeedButton');
    }

    static getResetStartLengthButton() {
        return document.getElementById('resetStartLengthButton');
    }

    static getToggleGridLinesButton() {
        return document.getElementById('toggleGridLinesButton');
    }

    static getUpButton() {
        return document.getElementById('btnUp');
    }

    static getDownButton() {
        return document.getElementById('btnDown');
    }

    static getLeftButton() {
        return document.getElementById('btnLeft');
    }

    static getRightButton() {
        return document.getElementById('btnRight');
    }

    static hideInvalidPlayerNameLabel() {
        document.getElementById('invalid-player-name-label').style.display = 'none';
    }

    static hideTakenPlayerNameLabel() {
        document.getElementById('taken-player-name-label').style.display = 'none';
    }

    static hideControlButtons() {
    }

    static showControlButtons() {
        this.getPlayerNameElement().style.display = 'block';
        document.getElementById('playerView').style.display = 'block';
    }

    static movePlayerNameToTop() {
        document.getElementById('playerView').classList.add('active-game');
        document.getElementById('register').classList.add('top');
        document.getElementById('selectName').style.display = 'none';
        document.getElementById('playerNameLabel').style.display = 'block';
        this.getChangeNameButton().style.display = 'none';
    }

    static setKillMessagesDivText(text) {
        document.getElementById('kill-messages').innerHTML = text;
    }

    static setPlayerNameElementColor(color) {
        this.getPlayerNameElement().style.color = color;
    }

    static setPlayerNameInputElementColor(color) {
        this.getPlayerNameInputElement().style.color = color;
    }

    static setPlayerNameElementReadOnly(readOnly) {
        this.getPlayerNameElement().readOnly = readOnly;
    }

    static setPlayerNameElementValue(value) {
        this.getPlayerNameElement().innerHTML = value;
    }

    static setPlayerNameInputElementValue(value) {
        this.getPlayerNameInputElement().value = value;
    }

    static setPlayerStatsDivText(text) {
        document.getElementById('player-stats').innerHTML = text;
    }

    static setNumberOfPlayers(text) {
        document.getElementById('numPlayers').innerHTML = text;
    }

    static setPlayerScore(text) {
        document.getElementById('playerScore').innerHTML = text;
    }

    static setPlayerHighScore(text) {
        document.getElementById('playerHighScore').innerHTML = text;
    }

    static setFirstPlaceScoreAndName(name, score) {
        document.getElementById('firstPlaceScore').innerHTML = score;
        document.getElementById('firstPlaceName').innerHTML = name;
    }

    static setScoreAndNameAtIndex(index, name, score) {
        document.getElementById(`score${index}`).innerHTML = score;
        document.getElementById(`name${index}`).innerHTML = name;
    }

    static setSecondPlaceScoreAndName(name, score) {
        document.getElementById('secondPlaceScore').innerHTML = score;
        document.getElementById('secondPlaceName').innerHTML = name;
    }

    static setThirdPlaceScoreAndName(name, score) {
        document.getElementById('thirdPlaceScore').innerHTML = score;
        document.getElementById('thirdPlaceName').innerHTML = name;
    }

    static setPlayOrWatchButtonText(text) {
        this.getPlayOrWatchButton().textContent = text;
    }

    static showAllContent() {
        document.getElementById('cover').style.visibility = 'visible';
    }

    static showInvalidPlayerNameLabel() {
        document.getElementById('invalid-player-name-label').style.display = 'inline';
    }

    static showTakenPlayerNameLabel() {
        document.getElementById('taken-player-name-label').style.display = 'inline';
    }

    static toggleFullScreenMode() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}
