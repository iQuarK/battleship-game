/**
 * Player: Class that represents a player
 **/

export class Player {
  constructor(maxX = 0, maxY = 0) {
    // initialise board
    this.board = [];
    this.maxX = maxX;
    this.maxY = maxY;
    for (let idx=0; idx<maxX; idx++) {
      let row = [];
      for (let idy=0; idy<maxY; idy++) {
        row.push(null);
      }
      this.board.push(row);
    }

    this.boats = [];
  }

  /**
   * Places a boat in the board
   * 
   *  @param boat  The boat to place
   *  @return boolean The boat was correctly placed or it seems not to fit
   */
  place(boat) {
    let success = false;

    if (boat && boat.squares < this.maxX && boat.squares < this.maxX) {
      let trials = 0; // tries until 10 times to randomly place the boat

      do {
        // random orientation
        boat.horizontal = ((Math.floor(Math.random()*2)+1) === 1)?true:false;

        let limitX = ((boat.horizontal)?this.maxX - boat.squares:this.maxX - 1);
        let limitY = ((boat.horizontal)?this.maxY - 1:this.maxY - boat.squares);

        // random position
        boat.position = {
          x: (Math.floor(Math.random()*limitX)),
          y: (Math.floor(Math.random()*limitY))
        };
        // checks if the boat can be successfully placed
        if (this.checkPlace(boat)) {
          // boat can be successfully placed
          this.addBoat(boat);
          success = true;
        }
      } while(!success && (trials++)<10);
    }

    return success;
  }

  // places the boat in the map and stores
  addBoat(boat) {
    let success = false;

    if (boat) {
      let posX = boat.position.x,
          posY = boat.position.y;

      try {
        for (let idx = 0; idx < boat.squares; idx ++) {
          if (boat.horizontal) {
            posX = boat.position.x+idx;
          } else {
            posY = boat.position.y+idx;
          }
          this.board[posX][posY] = boat;
        }
        this.boats.push(boat);

        success = true;
      } catch (e) {
        // possible incorrect index on board
        success = false;
        throw new Error('Error adding a boat: ', e.message, e.stack);
      }
    }

    return success;
  }

  // checks if a boat can be placed in a consecution of squares
  // it could be checking boat by boat, but check square by square
  // can be a shorter loop
  checkPlace(boat) {
    let success = true;
    let posX = boat.position.x,
        posY = boat.position.y;

    for (let idx = 0; idx < boat.squares; idx++) {
      if (boat.horizontal) {
        posX = boat.position.x+idx;
      } else {
        posY = boat.position.y+idx;
      }
      if (this.board[posX][posY]) {
        success = false;
        break;
      }
    }

    return success;
  }

  shoot(position) {
    let state = 'fail';

    if (this.board[position.x][position.y] && this.board[position.x][position.y] !== 'T') {
      this.board[position.x][position.y].touch();
      state = (this.board[position.x][position.y].destroyed())?'destroyed':'touched';
      this.board[position.x][position.y] = 'T';
    } else {
      if (this.board[position.x][position.y] === 'T') {
        state = 'reattacked';
      }
    }

    return state;
  }

  finished() {
    let finished = true;

    for(let boat of this.boats) {
      if (!boat.destroyed()) {
        finished = false;
        break;
      }
    }

    return finished;
  }

  // Renders the board of the player
  render() {
    for(let idx = 0; idx < this.maxX; idx++) {
      for(let idy = 0; idy <this.maxY; idy++) {
        let character = 'W';
        if (this.board[idy][idx]) {
          if (this.board[idy][idx] !== 'T') {
            character = 'B';
          } else {
            character = 'T';
          }
          
        }
        process.stdout.write(character+' ');
      }
      process.stdout.write('\n');
    }
  }
}
