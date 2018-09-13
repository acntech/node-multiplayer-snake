'use strict';

const ServerConfig = require('../configs/server-config');
const Food = require('../models/food');
const DbService = require('./db-service');

/**
 * Creation and removal of food
 * + Updated high scores for players when eating food
 */
class FoodService {
    constructor(playerStatBoard, boardOccupancyService, nameService, notificationService, utilityService) {
        this.playerStatBoard = playerStatBoard;
        this.boardOccupancyService = boardOccupancyService;
        this.nameService = nameService;
        this.notificationService = notificationService;
        this.utilityService = utilityService;
        this.reinitialize();
    }

    // Only use this alongside clearing boardOccupancyService
    reinitialize() {
        this.food = {};
        this.generateDefaultFood();
    }

    consumeAndRespawnFood(playerContainer) {
        let foodToRespawn = 0;
        const foodsConsumed = this.boardOccupancyService.getFoodsConsumed();

        // eslint-disable-next-line no-restricted-syntax
        for (const foodConsumed of foodsConsumed) {
            const playerWhoConsumedFood = playerContainer.getPlayer(foodConsumed.playerId);
            const food = this.food[foodConsumed.foodId];
            playerWhoConsumedFood.grow(ServerConfig.FOOD[food.type].GROWTH);
            const points = ServerConfig.FOOD[food.type].POINTS;
            this.playerStatBoard.increaseScore(playerWhoConsumedFood.id, points);

            if (food.type === ServerConfig.FOOD.SWAP.TYPE && playerContainer.getNumberOfActivePlayers() > 1) {
                const otherPlayer = playerContainer.getAnActivePlayer(playerWhoConsumedFood.id);
                this.boardOccupancyService.removePlayerOccupancy(otherPlayer.id, otherPlayer.getSegments());
                this.boardOccupancyService.removePlayerOccupancy(playerWhoConsumedFood.id, playerWhoConsumedFood.getSegments());

                const playerWhoConsumedFoodDirection = playerWhoConsumedFood.direction;
                const playerWhoConsumedFoodDirectionBeforeMove = playerWhoConsumedFood.directionBeforeMove;
                const playerWhoConsumedFoodSegments = playerWhoConsumedFood.getSegments();
                const playerWhoConsumedFoodGrowAmount = playerWhoConsumedFood.growAmount;

                const otherPlayerDirection = otherPlayer.direction;
                const otherPlayerDirectionBeforeMove = otherPlayer.directionBeforeMove;
                const otherPlayerSegments = otherPlayer.getSegments();
                const otherPlayerGrowAmount = otherPlayer.growAmount;

                otherPlayer.swapBodies(
                    playerWhoConsumedFoodSegments, playerWhoConsumedFoodDirection,
                    playerWhoConsumedFoodDirectionBeforeMove, playerWhoConsumedFoodGrowAmount,
                );
                playerWhoConsumedFood.swapBodies(
                    otherPlayerSegments, otherPlayerDirection,
                    otherPlayerDirectionBeforeMove, otherPlayerGrowAmount,
                );

                this.boardOccupancyService.addPlayerOccupancy(otherPlayer.id, otherPlayer.getSegments());
                this.boardOccupancyService.addPlayerOccupancy(playerWhoConsumedFood.id, playerWhoConsumedFood.getSegments());
                this.notificationService.notifyPlayerFoodCollected(
                    playerWhoConsumedFood.id,
                    'Swap!', food.coordinate, food.color, true,
                );
                this.notificationService.notifyPlayerFoodCollected(
                    otherPlayer.id,
                    'Swap!', playerWhoConsumedFood.getHeadCoordinate(), food.color, true,
                );

                this.playerStatBoard.setScore(otherPlayer.id, playerWhoConsumedFoodSegments.length);
                this.playerStatBoard.setScore(playerWhoConsumedFood.id, otherPlayerSegments.length);

                this.updateScore(otherPlayer);
            } else {
                this.notificationService.notifyPlayerFoodCollected(
                    playerWhoConsumedFood.id,
                    `+${points}`, food.coordinate, food.color,
                );
            }

            this.updateScore(playerWhoConsumedFood);// TODO: How to calculate score (facor in deaths/kills etc.?)
            this.removeFood(foodConsumed.foodId);
            foodToRespawn += 1;
        }

        this.generateFood(foodToRespawn);
    }

    generateDefaultFood() {
        this.generateFood(ServerConfig.FOOD.DEFAULT_AMOUNT);
    }

    generateFood(amount) {
        for (let i = 0; i < amount; i++) {
            this.generateSingleFood();
        }
    }

    generateSingleFood() {
        const randomUnoccupiedCoordinate = this.boardOccupancyService.getRandomUnoccupiedCoordinate();

        if (!randomUnoccupiedCoordinate) {
            this.notificationService.broadcastNotification('Could not add more food.  No room left.', 'white');
            return;
        }
        const foodId = this.nameService.getFoodId();
        let food;
        const spawnRate = Math.random();
        if (spawnRate < ServerConfig.FOOD.SWAP.SPAWN_RATE) {
            food = new Food(foodId, randomUnoccupiedCoordinate, ServerConfig.FOOD.SWAP.TYPE, ServerConfig.FOOD.SWAP.COLOR);
        } else if (spawnRate < ServerConfig.FOOD.GOLDEN.SPAWN_RATE) {
            food = new Food(foodId, randomUnoccupiedCoordinate, ServerConfig.FOOD.GOLDEN.TYPE, ServerConfig.FOOD.GOLDEN.COLOR);
        } else if (spawnRate < ServerConfig.FOOD.INCREASE_SPEED.SPAWN_RATE) {
            food = new Food(foodId, randomUnoccupiedCoordinate, ServerConfig.FOOD.INCREASE_SPEED.TYPE, ServerConfig.FOOD.INCREASE_SPEED.COLOR);
        } else if (spawnRate < ServerConfig.FOOD.SUPER.SPAWN_RATE) {
            food = new Food(foodId, randomUnoccupiedCoordinate, ServerConfig.FOOD.SUPER.TYPE, ServerConfig.FOOD.SUPER.COLOR);
        } else {
            food = new Food(foodId, randomUnoccupiedCoordinate, ServerConfig.FOOD.NORMAL.TYPE, ServerConfig.FOOD.NORMAL.COLOR);
        }

        this.food[foodId] = food;
        this.boardOccupancyService.addFoodOccupancy(food.id, food.coordinate);
    }

    getFood() {
        return this.food;
    }

    getFoodAmount() {
        return Object.keys(this.food).length;
    }

    getLastFoodIdSpawned() {
        return this.food[Object.keys(this.food)[Object.keys(this.food).length - 1]].id;
    }

    removeFood(foodId) {
        const foodToRemove = this.food[foodId];
        this.nameService.returnFoodId(foodId);
        this.boardOccupancyService.removeFoodOccupancy(foodId, foodToRemove.coordinate);
        delete this.food[foodId];
    }

    updateScore(player) {
        const thisPlayer = this.playerStatBoard.statBoard.get(player.id);
        DbService.updateScore(thisPlayer.name, thisPlayer.score, thisPlayer.highScore);
    }
}

module.exports = FoodService;
