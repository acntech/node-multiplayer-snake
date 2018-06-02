[![](https://simondiep.github.io/img/node-multiplayer-snake.gif)](https://node-multiplayer-snake.herokuapp.com/)
![Alt](https://simondiep.github.io/img/snake.gif)
[![Build Status](https://travis-ci.org/simondiep/node-multiplayer-snake.svg?branch=master)](https://travis-ci.org/simondiep/node-multiplayer-snake)
[![Dependency Status](https://david-dm.org/simondiep/node-multiplayer-snake/status.svg?style=flat)](https://david-dm.org/simondiep/node-multiplayer-snake)  

A multiplayer snake game built on NodeJs, Express, socket.io, and JavaScript ES6.  No unnecessary libraries.

Live demo [Here](https://node-multiplayer-snake.herokuapp.com/)

### Getting Started

Install the latest [Node.js](http://nodejs.org) 8 Stable

`git clone https://github.com/acntech/node-multiplayer-snake`

`cd node-multiplayer-snake`

`npm install`

`npm start`

Open your web browser to `localhost:3000`


### Game Features
 - Quick join and play (no sign-ups)
 - Player settings
   - Change colors
   - Change names
 - Admin controls
   - Change game speed
   - Change amount of food
   - Change player starting length
   - Add or remove bots
 - Different food types
 - Upload your own snake image and background image
 - Player statistics including kills/deaths/score
 - Steal player scores and length by killing them
 - Game notifications
 - Kill announcements
 - Randomized spawns
 - Spectate
 - Local storage of name and image
 - Add and remove walls by clicking
 - Sound effects

### Contributing

1. Fork the code base
2. Create a new git branch
3. Find or create an issue with a description of what you will be adding
4. Start making changes
5. Run tests `npm test`
6. Pull and rebase changes
7. Submit a pull request

### Tech Debt
 - Additional Client-side validation to reduce unnecessary emits to server
 - Additional Server-side optimization to reduce unnecessary emits to client
 - Validate sizes of base64 Strings
 - Toggle view of admin options as a menu item
 - Remove relaxed eslint checks from .eslintrc.js
 - Refactor into more testable code
 - Higher test coverage
 - Create more convenient build steps (dev vs prod) that don't require unbundling on pull
   - Ignore bundle that gets placed into public/js/config.js
 - support spinners - input type=number to replace existing admin buttons
 - animate/smooth out the scrolling to top and bottom of page
 - sprite-maker (convert all images into one)
 - high level jsdoc
 - convert innerHtml to templates (handlebars or mustache)
 - e.keyCode and other more reused values should be cached (stored in a local variable) to increase performance
   - such as 'click'
 - DomHelper extract all strings into an Object
 - an easy way to create new banner gifs as the game adds features
 - optimize data sent to each client, to only what's necessary, and not the entire game state
   - don't clear the entire canvas after each turn (look into canvas alternatives/ WebGL such as PixiJS)
   - smarter client code that can render snakes moving in a single direction without needed server state
   - smarter server code to send change events
 - clean up class constructors that take a lot of params, and instead pass in a single object
 - add game instructions possibly to a dismissible dialog
 - add a legend for different power ups
 - [Issues](https://github.com/simondiep/node-multiplayer-snake/issues)

### Longer-term Tech Debt
 - Chai does not support --use_strict mode, yet.  Replace chai or wait for support.
    - This means "use strict"; is needed in all node modules, even though it is redundant
 - Switch to SASS when Windows makes it easier to install [node-gyp dependencies](https://github.com/nodejs/node-gyp/issues/629).
   - [PR still open](https://github.com/nodejs/node-gyp/pull/867) as of March 22, 2016.

### Technologies to look into
 - Replace console.log with logging framework
    - https://www.loggly.com/ultimate-guide/node-logging-basics/
    - https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/
 - Unit test mocking frameworks for ES6 classes
 - Performance testing tools
 - Lightweight unit testing frameworks, such as [Tape](https://github.com/substack/tape)
 - ECMAScript 7
 
### Potential Features To Implement
 - Spin buttons for admin controls
 - Multiple rooms
 - Incremental death (head no longer moves, but tail does)
 - Randomize board to contain walls
 - Allow players to skip across the screen if they visit an edge without a wall
 - Increase game speed based on different conditions (faster if 1v1) or random
 - Choose your own color
 - Show a glowing outline when player is growing
 - Text chat
 - Support resolutions lower than 1225x550
 - Support mobile
 - Smarter bots (prioritize food, don't trap themselves, have a sense for other player movements)
 - Leave a message for the killer
 - Audio
    - Background music
    - Volume control
    - Voice chat
    - DOTA/CS kill-streak sounds
 - Images
    - Food image
    - Support animated gifs (snake and food)
    - Upload head image vs body images (head, body, L-turn, tail)
    - Preset images for use
 - Stats
    - Global high score
    - Custom sort stat board
    - More stats (max length)
 - Power-ups or Perks
    - very long
    - individual speed (2 or more steps for a player)
      - variant: limited turbo (press key to activate)
    - invulnerable
    - width increase
    - reverse controls
    - be able to draw on canvas
    - choice of power-up to start with
    - random power up on kill
    - activatable skills such as swap
 - Game Modes
    - head to head with preselected spawn points
      - variant: four player start at middle facing away from each other
    - infinite length
    - fog of war
    - random walls
    - elimination
    - maze
    - diagonal movement
    - defined win conditions
    - pictionary
