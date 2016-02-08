var _require = require('../../.tmp/src/class/game.js');
var Player = require('../../.tmp/src/class/player.js').Player;
var Game = _require.Game;
var MAX_X = _require.MAX_X;
var MAX_Y = _require.MAX_Y;

describe('Test Game class', function() {
  it('should have maximum default dimensions of board', function() {
    expect(MAX_X).toBe(10);
    expect(MAX_Y).toBe(10);
  });

  it('should initialise the game', function() {
    var game = new Game();

    // Player is initialised
    expect(game.player).toEqual(jasmine.any(Player));
    // there are three boats
    expect(game.boats.length).toBe(3);

    expect(game.player.boats.length).toBe(3);
  });

  if('should format the movements of the user', function() {
    expect(game.formatMovement("A5")).toBe({x:0, y:4});
    expect(game.formatMovement("Kill the king")).toBeFalsy();
    expect(game.formatMovement("A1")).toBe({x:0, y:0});
    expect(game.formatMovement("A0")).toBe({x:0, y:0});
    expect(game.formatMovement("A-1")).toBeFalsy();
  });
});