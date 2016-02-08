/**
 * Game: Singleton class that defines the game object during the execution
 **/
var {Player} = require('./player.js');
var {Destroyer} = require('./boats/destroyer.js');
var {Battleship} = require('./boats/battleship.js');
var readlineSync = require('readline-sync');

var instance = null;
export const MAX_X = 10;
export const MAX_Y = 10;

export class Game {
  constructor() {
    if (!instance) {
      instance = this;

      // create the list of boats for this game
      this.boats = [
        new Battleship(),
        new Destroyer(),
        new Destroyer()
      ];

      // initialise player
      this.player = new Player(MAX_X, MAX_Y);

      for(let boat of this.boats) {
        this.player.place(boat);
      }
    }

    return instance;
  }

  start() {

    console.log('finished: ',this.player.finished());
   console.log('starting game!');

    while(!this.player.finished()) {
      this.player.render();
      let movement = readlineSync.question('\nWrite your movement: ');
      movement = this.formatMovement(movement);

      if (movement) {
        var result = this.player.shoot(movement);

        switch(result) {
          case 'fail':
            console.log('You have failed');
            break;
          case 'reattacked':
            console.log('You already destroyed that square.');
            break;
          case 'touched':
            console.log('Touched!');
            break;
          case 'destroyed':
            if (this.player.finished()) {
              console.log('You won!!');
              this.player.render();
            } else {
              console.log('You destroyed a boat!');  
            }
            break;
          default:
            console.log('something weird happened...');
            break;
        }
      } else {
        console.error('Not valid movement, it should be a letter and a number from 1, example: A5, B2...');
      }
    }
  }

  formatMovement(movement) {
    let result = false;

    if (/^[a-zA-Z][0-9]+$/.test(movement)) {
      let number = parseInt(/[0-9]+$/.exec(movement), 10);

      result = {
        x: /^[a-zA-Z]/.exec(movement).join().toLowerCase().charCodeAt(0)-97,
        y: (number>0)?(number-1):number
      };
    }

    return result;
  }
}
