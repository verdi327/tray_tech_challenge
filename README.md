# Tray.io Coding Challenge
## For Solutions Architect

### How to Run
* Clone the repo
* Run `npm install`
* Run the unit tests: `npm test`
* Run the main file: `node app.js`
* You can test out different variations by updating the `input.txt` file.  By aware that the program expects inputs in the following manner and will throw errors if given incorrectly.
  * Line 1: Grid dimensions
  * Line 2: Roomba starting position
  * Line 3-X: Coordinates for dirty spots
  * Final Line: Roomba movement instructions

### Folder Org
#### App.js
File runner.  Loads `Roomba.js` and the `input.txt` file.

#### Roomba.js
Where all the logic lives for moving the roomba through the room while keeping track of dirt that it cleans.
