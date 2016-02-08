/**
 * Battleship: Boat with 5 squares
 **/

var {Boat} = require('../boat.js');

export class Destroyer extends Boat {
  constructor() {
    super('Destroyer', 4);
  }
}
