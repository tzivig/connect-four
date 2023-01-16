/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 const board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   for (let y = 0; y < HEIGHT; y++) {
     board.push(Array.from({ length: WIDTH}));
   }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
 // TODO: add comment for this code
  //create top row of the board. add an event listener.   
  const htmlBoard = document.getElementById('board');
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
  // TODO: add comment for this code
  //creates a table in html document  by iterating through y coordinates to create rows and the x coordinates to crete cells set to the variable "cell", each cell contains the ID  of the cirrent coordinates. then it appends each row to the board.   for (let y = 0; y < HEIGHT; y++) {
  // Creates the HTML elements that make up the lower section of the board.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0 DONE
   for (let y = HEIGHT - 1; y >= 0; y--) {
     if (!board[y][x]){
       return y;
     }
   }
   return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell DONE
   const piece = document.createElement('div');
   piece.classList.add('piece');
   currPlayer === 1 ? piece.classList.add('p1') : piece.classList.add('p2');
   piece.style.top = -50 * (y + 2);
   // piece.classList.add(`p${currPlayer}`);
   const spot = document.getElementById(`${y}-${x}`);
   spot.append(piece);
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message DONE
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id;
   
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board DONE
   board[y][x] = currPlayer;
   placeInTable(y, x);
 
   // check for win
   
   if (checkForWin()) {
     setTimeout(() => {return endGame(`Player ${currPlayer} won!`);
     }, 500);
     document.getElementById("center").classList.toggle('noclick');
     setTimeout(() => {document.querySelector('button').classList.toggle('playagain')} ,500)
   };
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame DONE
     if(board.every(row => row.every(cell => cell))) {
       return endGame('Looks like a tie!');
     }
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2 DONE 
     currPlayer = currPlayer === 1 ? 2 : 1;
   
 } ; 
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you. DONE
   
// It checks for all possible winning combination on the board by iterating over the board by comapring with arrays of all possible win conditions.
 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //this is 4 in a row horizontally
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //this is 4 in a row vertically
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //this is 4 in a row diagonally to the right
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //this is 4 in a row diagonally to the left
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //this is checking each of these 4 constants with the _win function for 4 in a row and legal coordinates. 
         return true;
       }
     }
   }
 }
 
 
 makeBoard();
 makeHtmlBoard();
