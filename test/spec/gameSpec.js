var Game = require('../../.tmp/src/class/game.js');

describe('Test Game class', function() {
  it('should initialise the game', function() {
    var game = new Game();

    game.start();

    expect(game.board.length).toBe(0);
  });
});