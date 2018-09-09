'use strict';

const ServerConfig = require('../configs/server-config');

/**
 *  Generates new unused colors and stores used colors
 */
class ColorService {
    constructor() {
        this.usedColors = new Set();
    }

    getColor() {
        let newColor;
        if (this.usedColors.size === ServerConfig.SNAKES.COLORS.length) {
            newColor = '#383838';
        } else {
            do {
                newColor = this._getRandomColor();
            } while (this.usedColors.has(newColor));
            // TODO check if too similar to any used colors
            this.usedColors.add(newColor);
        }
        return newColor;
    }

    returnColor(color) {
        this.usedColors.delete(color);
    }

    // Format is #ABCDEF
    // eslint-disable-next-line class-methods-use-this
    _getRandomColor() {
        const colors = ServerConfig.SNAKES.COLORS;
        const max = colors.length;
        const index = Math.floor(Math.random() * Math.floor(max));
        return colors[index];
    }

    // eslint-disable-next-line class-methods-use-this
    _getRandomLightHexRGBVal() {
        return (Math.floor(Math.random() * 156) + 100).toString(16);
    }
}

module.exports = ColorService;