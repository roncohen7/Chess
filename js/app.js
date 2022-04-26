const BOARD_SIZE = 8;
const WHITE_PLAYER = "white";
const BLACK_PLAYER = "black";

const BOARD_ID = "chess-board";

const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const KING = "king";
const QUEEN = "queen";

const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];

let selectedPiece;
let game;
let table;

function tryUpdateSelectedPiece(row, col) {
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("possible-move");
      table.rows[i].cells[j].classList.remove("selected");
    }
  }

  // Show possible moves
  const piece = game.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = game.getPossibleMoves(piece);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("possible-move");
    }
  }

  table.rows[row].cells[col].classList.add("selected");
  selectedPiece = piece;
}

function onCellClick(row, col) {
  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;
    // create board again
    createChessBoard(game.boardData);
  } else {
    tryUpdateSelectedPiece(row, col);
  }
}

function addImage(cell, player, name) {
  const image = document.createElement("img");
  image.src = "images/" + player + "/" + name + ".svg";
  cell.appendChild(image);
}

function createChessBoard(boardData) {
  table = document.getElementById(BOARD_ID);
  if (table !== null) {
    table.remove();
  }

  // Create empty chess board HTML:
  table = document.createElement("table");
  table.id = BOARD_ID;
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = "light-cell";
      } else {
        cell.className = "dark-cell";
      }
      cell.addEventListener("click", () => onCellClick(row, col));
    }
  }

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

// function getInitialPieces() {
//   let result = [];

//   addFirstRowPieces(result, 0, WHITE_PLAYER);
//   addFirstRowPieces(result, 7, BLACK_PLAYER);

//   for (let i = 0; i < BOARD_SIZE; i++) {
//     result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
//     result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
//   }
//   return result;
// }

// function addFirstRowPieces(result, row, player) {
//   result.push(new Piece(row, 0, ROOK, player));
//   result.push(new Piece(row, 1, KNIGHT, player));
//   result.push(new Piece(row, 2, BISHOP, player));
//   result.push(new Piece(row, 3, KING, player));
//   result.push(new Piece(row, 4, QUEEN, player));
//   result.push(new Piece(row, 5, BISHOP, player));
//   result.push(new Piece(row, 6, KNIGHT, player));
//   result.push(new Piece(row, 7, ROOK, player));
// }

// function showMovesForPiece(row, col) {
//   for (let i = 0; i < BOARD_SIZE; i++) {
//     for (let j = 0; j < BOARD_SIZE; j++) {
//       table.rows[i].cells[j].classList.remove("possible-move");
//       table.rows[i].cells[j].classList.remove("selected");
//     }
//   }
//   const piece = boardData.getPiece(row, col);
//   if (Piece !== undefined) {
//     let possibleMoves = piece.getPossibleMoves(boardData);
//     for (let possibleMove of possibleMoves) {
//       const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
//       cell.classList.add("possible-move");
//     }
//   }
//   table.rows[row].cells[col].classList.add("selected");
//   selectedPiece = piece;
// }

function initGame() {
  game = new Game(WHITE_PLAYER);
  createChessBoard(game.boardData);
}

window.addEventListener("load", initGame);
