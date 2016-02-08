/**
 * Destroyer: Boat with 4 squares
 **/

var {Boat} = require('../boat.js');

export class Destroyer extends Boat {
  constructor() {
    super('Destroyer', 4);
  }
}
