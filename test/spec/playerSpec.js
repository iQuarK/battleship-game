var _require = require('../../.tmp/src/class/player.js');
var Player = _require.Player;
_require = require('../../.tmp/src/class/boats/destroyer.js');
var Destroyer = _require.Destroyer;
_require = require('../../.tmp/src/class/boats/battleship.js');
var Battleship = _require.Battleship;

describe('Test Player class', function() {
  var maxX, maxY, player;

  beforeEach(function() {
    maxX = 10;
    maxY = 8;
    player = new Player(maxX, maxY);
  });

  it('should initialise the board', function() {
    // Size X
    expect(player.board.length).toBe(maxX);

    // Size Y
    for (var i=0; i<10; i++) {
      expect(player.board[i].length).toBe(maxY);
    }

    // there are zero boats
    expect(player.boats.length).toBe(0);
  });

  it('should place a boat', function() {
    var battleship = new Battleship();
    battleship.horizontal = true;
    battleship.position = { x: 0, y: 0 };
    expect(player.addBoat(battleship)).toBeTruthy();

    expect(player.place(new Destroyer())).toBeTruthy();
    expect(player.boats.length).toBe(2);

    describe('when it fails trying to place a new boat', function() {
      it('should be impossible to place a boat there there is another', function() {
        var boat = new Battleship();
        boat.horizontal = player.boats[0].horizontal;
        boat.position = player.boats[0].position;

        expect(player.checkPlace(boat)).toBeFalsy();
      });
      it('should throw an error if we try to put a boat out of the limits of the board', function() {
        battleship.position = { x: 100, y: 100 };
        expect(function() {
          player.addBoat(battleship);
        }).toThrow();
      });
    });

    describe('player receives a shoot', function() {
      it('should return state fail if the attack was to the water', function() {
        var position = { x: 8, y: 8 };
        expect(player.shoot(position)).toBe('fail');
      });

      it('should return state touched if the attack was to a square and reattacked when re-attacks the same square', function() {
        var position = { x: 0, y: 0 };
        expect(player.shoot(position)).toBe('touched');
        expect(player.shoot(position)).toBe('reattacked');
      });

      it('should return state destroyed if a boat is shank', function() {
        var position = { x: 1, y: 0 };
        expect(player.shoot(position)).toBe('touched');
        position = { x: 2, y: 0 };
        expect(player.shoot(position)).toBe('touched');
        position = { x: 3, y: 0 };
        expect(player.shoot(position)).toBe('touched');
        position = { x: 4, y: 0 };
        expect(player.shoot(position)).toBe('destroyed');
      });
    });
  });

});