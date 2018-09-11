import SettingsController from './controller/settings-controller.js';

const settingsController = new SettingsController();
/* global io */
// io is a global variable for socket.io-client set from the view html
settingsController.connect(io);
