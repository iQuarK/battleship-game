/**
 * Battleship: Boat with 5 squares
 **/

var {Boat} = require('../boat.js');

export class Battleship extends Boat {
  constructor() {
    super('Battleship', 5);
  }
}
