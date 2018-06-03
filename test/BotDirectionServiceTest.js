const assert = require('chai').assert;
const Coordinate = require('../app/models/coordinate');
const Direction = require('../app/models/direction');
const Player = require('../app/models/player');
const BoardOccupancyService = require('../app/services/board-occupancy-service');
const BotDirectionService = require('../app/services/bot-direction-service');

describe('BotDirectionService', () => {
    'use strict';

    let bot;
    let boardOccupancyService;
    let botDirectionService;

    beforeEach(() => {
        bot = new Player();
        bot._segments = [new Coordinate(10, 10)];
        bot.changeDirection(Direction.RIGHT);
        boardOccupancyService = new BoardOccupancyService();
        botDirectionService = new BotDirectionService(boardOccupancyService);
    });

    it('should not change direction if it is safe two spaces ahead', (done) => {
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.equal(bot.direction, Direction.RIGHT);
        done();
    });

    it('should change direction if it one space ahead is occupied', (done) => {
        boardOccupancyService.addPlayerOccupancy('player2', [new Coordinate(11, 10)]);
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.isTrue(bot.direction === Direction.UP || bot.direction === Direction.DOWN);
        done();
    });

    it('should change direction if it two spaces ahead is occupied', (done) => {
        boardOccupancyService.addPlayerOccupancy('player2', [new Coordinate(12, 10)]);
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.isTrue(bot.direction === Direction.UP || bot.direction === Direction.DOWN);
        done();
    });

    /**  3
     *
     * 111 2
     *
     */
    it('should change direction if it two spaces ahead is occupied and left two spaces ahead is occupied', (done) => {
        boardOccupancyService.addPlayerOccupancy('player2', [new Coordinate(12, 10)]);
        boardOccupancyService.addPlayerOccupancy('player3', [new Coordinate(10, 8)]);
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.equal(bot.direction, Direction.DOWN);
        done();
    });

    /**  3
     *
     * 1112
     *
     */
    it('should change direction if space ahead is occupied and left two spaces ahead is occupied', (done) => {
        boardOccupancyService.addPlayerOccupancy('player2', [new Coordinate(11, 10)]);
        boardOccupancyService.addPlayerOccupancy('player3', [new Coordinate(10, 8)]);
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.equal(bot.direction, Direction.DOWN);
        done();
    });

    /**  3
     * 1112
     *
     */
    it('should change direction if space ahead is occupied and left space is occupied', (done) => {
        boardOccupancyService.addPlayerOccupancy('player2', [new Coordinate(11, 10)]);
        boardOccupancyService.addPlayerOccupancy('player3', [new Coordinate(10, 9)]);
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.equal(bot.direction, Direction.DOWN);
        done();
    });

    /**
     * 111 2
     *
     *   3
     */
    it('should change direction if it two spaces ahead is occupied and right two spaces ahead is occupied', (done) => {
        boardOccupancyService.addPlayerOccupancy('player2', [new Coordinate(12, 10)]);
        boardOccupancyService.addPlayerOccupancy('player3', [new Coordinate(10, 12)]);
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.equal(bot.direction, Direction.UP);
        done();
    });

    /**
     * 111 2
     *   3
     */
    it('should change direction if it two spaces ahead is occupied and right space is occupied', (done) => {
        boardOccupancyService.addPlayerOccupancy('player2', [new Coordinate(12, 10)]);
        boardOccupancyService.addPlayerOccupancy('player3', [new Coordinate(10, 11)]);
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.equal(bot.direction, Direction.UP);
        done();
    });

    /**
     * 1112
     *   3
     */
    it('should change direction if space ahead is occupied and right space is occupied', (done) => {
        boardOccupancyService.addPlayerOccupancy('player2', [new Coordinate(11, 10)]);
        boardOccupancyService.addPlayerOccupancy('player3', [new Coordinate(10, 11)]);
        botDirectionService.changeDirectionIfInDanger(bot);
        assert.equal(bot.direction, Direction.UP);
        done();
    });
});
