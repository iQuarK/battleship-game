/**
 * Game: Singleton class that defines the game object during the execution
 **/

var instance = null;
export const MAX_X = 10;
export const MAX_Y = 10;

export class Game {
  constructor() {
    if (!instance) {
      instance = this;

      // initialise board
      this.board = [];
      for (let idx=0; idx<MAX_X; idx++) {
        let row = [];
        for (let idy=0; idy<MAX_Y; idy++) {
          row.push('W');
        }
        this.board.push(row);
      }
    }

    return instance;
  }

  start() {
    console.log('starting game!');
  }

  // Draws the board on the screen
  printBoard() {
    console.log('printing board');
  }

}
