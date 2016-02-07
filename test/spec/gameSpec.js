var _require = require('../../.tmp/src/class/game.js');
var Game = _require.Game;
var MAX_X = _require.MAX_X;
var MAX_Y = _require.MAX_Y;

describe('Test Game class', function() {
  it('should have default dimensions of board', function() {
    expect(MAX_X).toBe(10);
    expect(MAX_Y).toBe(10);
  });

  it('should initialise the game', function() {
    var game = new Game();

    game.start();

    expect(game.board.length).toBe(10);
  });
});