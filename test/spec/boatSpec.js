var _require = require('../../.tmp/src/class/boats/battleship.js');
var Battleship = _require.Battleship;
_require = require('../../.tmp/src/class/boats/destroyer.js');
var Destroyer = _require.Destroyer;

describe('Test Boat classes', function() {
  var battleship, destroyer;

  beforeEach(function() {
    battleship = new Battleship();
    destroyer = new Destroyer();
  });

  it('should initialise the boats', function() {

    // Battleship
    expect(battleship.name).toBe('Battleship');
    expect(battleship.squares).toBe(5);
    expect(battleship.destroyed()).toBeFalsy();
    expect(battleship.horizontal).toBeTruthy();
    expect(battleship.position.x).toBe(-1);
    expect(battleship.position.y).toBe(-1);

    // Destroyer
    expect(destroyer.name).toBe('Destroyer');
    expect(destroyer.squares).toBe(4);
    expect(destroyer.destroyed()).toBeFalsy();
    expect(destroyer.horizontal).toBeTruthy();
    expect(destroyer.position.x).toBe(-1);
    expect(destroyer.position.y).toBe(-1);

  });

  it('should destroy the boats', function() {

    // Battleship
    expect(battleship.destroyed()).toBeFalsy();
    battleship.touch();
    expect(battleship.destroyed()).toBeFalsy();
    battleship.touch();
    expect(battleship.destroyed()).toBeFalsy();
    battleship.touch();
    expect(battleship.destroyed()).toBeFalsy();
    battleship.touch();
    expect(battleship.destroyed()).toBeFalsy();
    battleship.touch();
    expect(battleship.destroyed()).toBeTruthy();

    // Destroyer
    expect(destroyer.destroyed()).toBeFalsy();
    destroyer.touch();
    expect(destroyer.destroyed()).toBeFalsy();
    destroyer.touch();
    expect(destroyer.destroyed()).toBeFalsy();
    destroyer.touch();
    expect(destroyer.destroyed()).toBeFalsy();
    destroyer.touch();
    expect(destroyer.destroyed()).toBeTruthy();

  });
});