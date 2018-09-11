import ClientConfig from '../config/client-config.js';
import DomHelper from './dom-helper.js';

const ENTER_KEYCODE = 13;
const SPACE_BAR_KEYCODE = 32;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

/**
 * Handles all requests related to the display of the game, not including the canvas
 */
export default class SettingsView {
    constructor(botChangeCallback, foodChangeCallback, speedChangeCallback) {
        this._initEventHandling(botChangeCallback, foodChangeCallback, speedChangeCallback);
    }

    ready() {
        // Show everything when ready
        DomHelper.showAllContent();
    }

    showFoodAmount(foodAmount) {
        DomHelper.setCurrentFoodAmountLabelText(foodAmount);
    }

    showNumberOfBots(numberOfBots) {
        DomHelper.setCurrentNumberOfBotsLabelText(numberOfBots);
    }

    showSpeed(speed) {
        DomHelper.setCurrentSpeedLabelText(speed);
    }

    /*******************
     *  Event handling *
     *******************/

    _initEventHandling(botChangeCallback, foodChangeCallback, speedChangeCallback) {
        // Admin controls
        DomHelper.getIncreaseBotsButton().addEventListener('click',
            botChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.INCREASE));
        DomHelper.getDecreaseBotsButton().addEventListener('click',
            botChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.DECREASE));
        DomHelper.getResetBotsButton().addEventListener('click',
            botChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.RESET));
        DomHelper.getIncreaseFoodButton().addEventListener('click',
            foodChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.INCREASE));
        DomHelper.getDecreaseFoodButton().addEventListener('click',
            foodChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.DECREASE));
        DomHelper.getResetFoodButton().addEventListener('click',
            foodChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.RESET));
        DomHelper.getIncreaseSpeedButton().addEventListener('click',
            speedChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.INCREASE));
        DomHelper.getDecreaseSpeedButton().addEventListener('click',
            speedChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.DECREASE));
        DomHelper.getResetSpeedButton().addEventListener('click',
            speedChangeCallback.bind(this, ClientConfig.INCREMENT_CHANGE.RESET));
    }
}
