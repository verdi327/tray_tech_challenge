class Roomba {
  constructor(argArr) {
    // ensure array has all inputs and no trailing new lines at end of file
    if (argArr.length < 4 || argArr[argArr.length - 1] === "") {
      throw new Error(this._errorTextForInvalidInputFile());
    }

    // order matters here as I'm using destructive methods
    // while this can be brittle, chose to use based off expected input file
    // I've included error checking on inputs to safeguard

    this.bounds = this._setRoomDimensions(argArr.shift());
    this.currentPos = this._setCurrentPosition(argArr.shift());
    this.directions = this._setDirections(argArr.pop());
    this.dirtSpots = this._setDirtSpots(argArr);
    this.spotsCleaned = 0;
  }

  _setRoomDimensions(value) {
    let grid = value.split(" ").map((val) => parseInt(val));
    if (grid[0] <= 0 || grid[1] <= 0) {
      throw new Error("Room dimensions (x & y) must be greater than 0");
    }
    return { N: grid[1] - 1, S: 0, W: 0, E: grid[0] - 1 };
  }

  _setCurrentPosition(value) {
    if (this._isValidCoordinate(value)) {
      return value.split(" ").map((val) => parseInt(val));
    }
  }

  _setDirections(value) {
    return value.split("").map((direction) => {
      if (!["N", "S", "E", "W"].includes(direction)) {
        throw new Error("[Invalid Directions]: Must be one of N,S,E,W");
      } else {
        return direction;
      }
    });
  }

  _setDirtSpots(arr) {
    arr.forEach((value) => this._isValidCoordinate(value));
    return arr;
  }

  _isValidCoordinate(strValue) {
    // strValue is expected as --> '1 2'
    let coordinates = strValue.split(" ").map((val) => parseInt(val));
    if (
      coordinates[1] > this.bounds["N"] ||
      coordinates[1] < 0 ||
      coordinates[0] > this.bounds["E"] ||
      coordinates[0] < 0
    ) {
      throw new Error(
        `[Invalid Input] Coordinates [${coordinates[0]},${coordinates[1]}] must be within room dimensions [${this.bounds["E"]},${this.bounds["N"]}]`
      );
    }
    return true;
  }

  _stringifyCurrentPosition() {
    return `${this.currentPos[0]} ${this.currentPos[1]}`;
  }

  _errorTextForInvalidInputFile() {
    return "input file must contain the following: \n1) Room dimensions (ex. 5 4)\n2) Roomba starting position (ex. 1 3)\n3) Dirt patch location(s) (ex. 3 3)\n4) Move directions (ex. 'NSEWW')";
  }

  run() {
    this.directions.forEach((direction) => {
      // update the current position only if it's not at a wall
      // N & S change Y axis while E & W change X axis
      if (direction === "N" && this.currentPos[1] < this.bounds[direction]) {
        this.currentPos[1] += 1;
      } else if (
        direction === "S" &&
        this.currentPos[1] > this.bounds[direction]
      ) {
        this.currentPos[1] -= 1;
      } else if (
        direction === "E" &&
        this.currentPos[0] < this.bounds[direction]
      ) {
        this.currentPos[0] += 1;
      } else if (
        direction === "W" &&
        this.currentPos[0] > this.bounds[direction]
      ) {
        this.currentPos[0] -= 1;
      }

      // check to see if roomba is on a dirt spot
      this.dirtSpots = this.dirtSpots.filter((spot) => {
        if (spot === this._stringifyCurrentPosition()) {
          // there's dirt at the current position, clean it!
          this.spotsCleaned += 1;
          // remove the dirt spot from our array of dirt spots
          return false;
        } else {
          return true;
        }
      });
    });

    return {
      finalPosition: this.currentPos,
      spotsCleaned: this.spotsCleaned,
    };
  }
}

module.exports = Roomba;
