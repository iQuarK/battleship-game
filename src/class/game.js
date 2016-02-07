/**
 * Game: Singleton class that defines the game object during the execution
 **/

var instance = null;

class Game {
  static get MAX_X() {
    return 10;
  }
  static get MAX_Y() {
    return 10;
  }

  constructor() {
    if (!instance) {
      console.log('creating');
      instance = this;

      this.board = [];
      // // initialise board
      // board = new Array(this.MAX_X);

      // for (let idx=0; idx<this.MAX_X; idx++) {
      //   board[idx] = new Array(this.MAX_Y);
      // }
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

module.exports = Game;