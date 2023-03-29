var playerRed = "R";
var playerYellow = "Y";
var currentPlayer = playerRed;

var gameOver = false;

var board;

var rows = 6;

var columns = 7;

window.onload = initLoad;

function initLoad() {
  setGame();
}

// Populate tiles withinthe board
function setGame() {
  board = [];
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

  board[r][c] = currentPlayer;
  let tile = this;
  if (currentPlayer == playerRed) {
    tile.classList.add("red-piece");
    currentPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currentPlayer = playerRed;
  }
}
