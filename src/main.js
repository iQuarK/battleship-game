'use strict';

var {Game} = require('./class/game.js');

var game = new Game();

game.start();

console.log('game board', game.board);