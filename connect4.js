var playerRed = "R";
var playerYellow = "Y";
var currentPlayer = playerRed;

var gameOver = false;

var board;

var currColumns;

var rows = 6;

var columns = 7;

window.onload = initLoad;

function initLoad() {
  setGame();
}

// Populate tiles withinthe board
function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // JS
      row.push(" ");

      // HTML
      //   created <div id = "index possition" class="tile">
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-"); // "0-0" -> ["0","0"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];

  if (r < 0) {
    return;
  }

  board[r][c] = currentPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer == playerRed) {
    tile.classList.add("red-piece");
    currentPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currentPlayer = playerRed;
  }

  r -= 1; //Update row height

  currColumns[c] = r; //update array

  checkWinner();
}

function checkWinner() {
  // Sliding Window Checking

  // Horizontal Check

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (isWinnerHorizontal(board, r, c)) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Vertical Check

  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      if (board[r][c] != " ") {
        if (isWinnerVertical(board, r, c)) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

function setWinner(r, c) {
  let winner = document.getElementById("winner");

  if (board[r][c] == playerRed) {
    winner.innerText = "Red wins!";
  } else {
    winner.innerText = "Yellow wins!";
  }

  gameOver = true;
}

function isWinnerHorizontal(board, r, c) {
  if (
    board[r][c] == board[r][c + 1] &&
    board[r][c + 1] == board[r][c + 2] &&
    board[r][c + 2] == board[r][c + 3]
  ) {
    return true;
  }
  return false;
}

function isWinnerVertical(board, r, c) {
  if (
    board[r][c] == board[r + 1][c] &&
    board[r + 1][c] == board[r + 2][c] &&
    board[r + 2][c] == board[r + 3][c]
  ) {
    return true;
  }
  return false;
}
