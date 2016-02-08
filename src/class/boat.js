/**
 * Boat: Parent class that defines the base of the boats
 **/

export class Boat {
  constructor(name, squares) {
    this.name = name;
    this.squares = squares;
    this.shots = 0;
    this.horizontal = true;
    this.position = {x:-1, y:-1};
  }

  touch() {
    this.shots++;
  }

  destroyed() {
    return this.shots >= this.squares;
  }
}
