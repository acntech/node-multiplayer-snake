/* eslint-disable no-restricted-syntax */
import ClientConfig from '../config/client-config.js';
import CanvasFactory from '../view/canvas-factory.js';
import GameView from '../view/game-view.js';

/**
 * Controls all game logic
 */
export default class GameController {
    constructor() {
        this.gameView = new GameView(
            this.backgroundImageUploadCallback.bind(this),
            this.imageUploadCallback.bind(this),
            this.joinGameCallback.bind(this),
            this.keyDownCallback.bind(this),
            this.playerNameUpdatedCallback.bind(this),
            this.spectateGameCallback.bind(this),
            true, // player mode,
        );
        this.players = [];
        this.food = {};
        this.textsToDraw = [];
        this.walls = [];
    }

    connect(io) {
        this.socket = io();
        this._initializeSocketIoHandlers();
        const storedName = localStorage.getItem(ClientConfig.LOCAL_STORAGE.PLAYER_NAME);
        const storedBase64Image = localStorage.getItem(ClientConfig.LOCAL_STORAGE.PLAYER_IMAGE);
        this.socket.emit(ClientConfig.IO.OUTGOING.NEW_PLAYER, storedName, storedBase64Image);
        this.socket.emit(ClientConfig.IO.OUTGOING.SPECTATE_GAME);
    }

    /*******************
     *  View Callbacks *
     *******************/

    botChangeCallback(option) {
        this.socket.emit(ClientConfig.IO.OUTGOING.BOT_CHANGE, option);
    }

    foodChangeCallback(option) {
        this.socket.emit(ClientConfig.IO.OUTGOING.FOOD_CHANGE, option);
    }

    backgroundImageUploadCallback(image, imageType) {
        if (!(image && imageType)) {
            this.socket.emit(ClientConfig.IO.OUTGOING.CLEAR_UPLOADED_BACKGROUND_IMAGE);
            return;
        }
        const resizedBase64Image = this.canvasView.resizeUploadedBackgroundImageAndBase64(image, imageType);
        this.socket.emit(ClientConfig.IO.OUTGOING.BACKGROUND_IMAGE_UPLOAD, resizedBase64Image);
    }

    canvasClicked(x, y) {
        this.socket.emit(ClientConfig.IO.OUTGOING.CANVAS_CLICKED, x, y);
    }

    // eslint-disable-next-line class-methods-use-this
    imageUploadCallback() {}

    joinGameCallback() {
        this.socket.emit(ClientConfig.IO.OUTGOING.JOIN_GAME);
    }

    keyDownCallback(keyCode) {
        this.socket.emit(ClientConfig.IO.OUTGOING.KEY_DOWN, keyCode);
    }

    playerNameUpdatedCallback(name) {
        this.socket.emit(ClientConfig.IO.OUTGOING.NAME_CHANGE, name);
        localStorage.setItem(ClientConfig.LOCAL_STORAGE.PLAYER_NAME, name);
    }

    spectateGameCallback() {
        this.socket.emit(ClientConfig.IO.OUTGOING.SPECTATE_GAME);
    }

    /*******************************
     *  socket.io handling methods *
     *******************************/

    _createBoard(board) {
        this.canvasView = CanvasFactory.createCanvasView(
            board.SQUARE_SIZE_IN_PIXELS,
            board.HORIZONTAL_SQUARES,
            board.VERTICAL_SQUARES,
            this.canvasClicked.bind(this),
        );
        this.canvasView.clear();
        this.gameView.ready();
    }

    _handleNewGameData(gameData) {
        this.players = gameData.players;
        this.food = gameData.food;
        this.walls = gameData.walls;
    }


    _initializeSocketIoHandlers() {
        this.socket.on(ClientConfig.IO.INCOMING.NEW_PLAYER_INFO, this.gameView.updatePlayerName);
        this.socket.on(ClientConfig.IO.INCOMING.BOARD_INFO, this._createBoard.bind(this));
        this.socket.on(ClientConfig.IO.INCOMING.NEW_STATE, this._handleNewGameData.bind(this));
    }
}