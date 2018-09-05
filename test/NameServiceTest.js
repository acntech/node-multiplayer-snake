const assert = require('chai').assert;
const NameService = require('../app/services/name-service');

describe('NameService', () => {
    'use strict';

    const NUMBER_OF_NAMES_TO_TEST = 500;

    it('should generate a new unused player name', (done) => {
        const nameService = new NameService();
        const usedNames = new Set();
        for (let i = 0; i < NUMBER_OF_NAMES_TO_TEST; i++) {
            usedNames.add(nameService.getPlayerName());
        }
        assert.equal(usedNames.size, NUMBER_OF_NAMES_TO_TEST);

        done();
    });
});
