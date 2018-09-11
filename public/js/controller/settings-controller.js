import ClientConfig from '../config/client-config.js';
import SettingsView from '../view/settings-view.js';

export default class SettingsController {
    constructor() {
        this.settingsView = new SettingsView(this.botChangeCallback.bind(this),
                                            this.foodChangeCallback.bind(this),
                                            this.speedChangeCallback.bind(this)
                                            );
    }

    connect(io) {
        this.socket = io();
        this._initializeSocketIoHandlers();
    }

    botChangeCallback(option) {
        this.socket.emit(ClientConfig.IO.OUTGOING.BOT_CHANGE, option);
    }

    foodChangeCallback(option) {
        this.socket.emit(ClientConfig.IO.OUTGOING.FOOD_CHANGE, option);
    }

    speedChangeCallback(option) {
        this.socket.emit(ClientConfig.IO.OUTGOING.SPEED_CHANGE, option);
    }

    _initializeSocketIoHandlers() {
    }
}
