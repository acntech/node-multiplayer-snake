'use strict';

const ServerConfig = {
    MIN_FPS: 8,
    STARTING_FPS: 30,
    MAX_FPS: 60,
    PLAYER_STARTING_LENGTH: 10,
    SPAWN_TURN_LEEWAY: 10,
    DEFAULT_STARTING_BOTS: 0,
    MAX_BOTS: 20,
    BOT_CHANGE_DIRECTION_PERCENT: 0.1,
    FOOD: {
        DEFAULT_AMOUNT: 25,
        NORMAL: {
            TYPE: 'NORMAL',
            COLOR: 'red',
            POINTS: 1,
            GROWTH: 1,
        },
        SUPER: {
            TYPE: 'SUPER',
            COLOR: 'green',
            POINTS: 5,
            GROWTH: 5,
            SPAWN_RATE: 0.1,
        },
        GOLDEN: {
            TYPE: 'GOLDEN',
            COLOR: 'yellow',
            POINTS: 25,
            GROWTH: 25,
            SPAWN_RATE: 0.01,
        },
        SWAP: {
            TYPE: 'SWAP',
            COLOR: 'blue',
            POINTS: 1,
            GROWTH: 1,
            SPAWN_RATE: 0.05,
        },
        INCREASE_SPEED: {
            TYPE: 'INCREASE_SPEED',
            COLOR: 'purple',
            POINTS: 1,
            GROWTH: 1,
            SPAWN_RATE: 0.02,
        },
    },
    IO: {
        DEFAULT_CONNECTION: 'connection',
        INCOMING: {
            BOT_CHANGE: 'bot change',
            COLOR_CHANGE: 'player changed color',
            FOOD_CHANGE: 'food change',
            SPEED_CHANGE: 'speed change',
            START_LENGTH_CHANGE: 'start length change',
            JOIN_GAME: 'join game',
            SPECTATE_GAME: 'spectate game',
            CLEAR_UPLOADED_BACKGROUND_IMAGE: 'clear uploaded background image',
            BACKGROUND_IMAGE_UPLOAD: 'background image upload',
            CLEAR_UPLOADED_IMAGE: 'clear uploaded image',
            PLAYER_COUNT: 'player count',
            IMAGE_UPLOAD: 'image upload',
            NEW_PLAYER: 'new player',
            NAME_CHANGE: 'player changed name',
            KEY_DOWN: 'key down',
            CANVAS_CLICKED: 'canvas clicked',
            DISCONNECT: 'disconnect',
        },
        OUTGOING: {
            NEW_STATE: 'game update',
            NEW_PLAYER_INFO: 'new player info',
            NEW_BACKGROUND_IMAGE: 'new background image',
            BOARD_INFO: 'board info',
            PLAYER_COUNT: 'player count',
            NOTIFICATION: {
                GENERAL: 'general notification',
                FOOD_COLLECTED: 'food collected',
                KILL: 'kill notification',
                KILLED_EACH_OTHER: 'killed each other notification',
                RAN_INTO_WALL: 'ran into wall notification',
                SUICIDE: 'suicide notification',
                YOU_DIED: 'you died',
                YOU_MADE_A_KILL: 'you made a kill',
            },
        },
    },
    SNAKES: {
        COLORS: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
            '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
            '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
            '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF',
            '#ffff00',
            '#66ff33',
            '#00ffff',
            '#ff3399',
            '#9900ff',
            '#ff6600',
            '#512DA8',
            '#FF5722',
            '#F44336',
            '#536DFE',
            '#000000',
            '#FFFFFF',
            '#e6194b',
            '#3cb44b',
            '#ffe119',
            '#4363d8',
            '#911eb4',
            '#46f0f0',
            '#f032e6',
            '#fabebe',
            '#008080',
            '#e6beff',
            '#9a6324',
            '#fffac8',
            '#800000',
            '#aaffc3',
            '#808000',
            '#000075',
            '#808080',

        ],
    },
    INCREMENT_CHANGE: {
        INCREASE: 'increase',
        DECREASE: 'decrease',
        RESET: 'reset',
    },
};

module.exports = ServerConfig;