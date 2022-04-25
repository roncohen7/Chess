// window.addEventListener("load", chessboard);
// const white_type = "white";
// const dark_type = "dark";

// function addimage(cell, type, name) {
//   let image = document.createElement("img");
//   image.src = "images/" + type + "/" + name + ".svg";
//   cell.appendChild(image);
// }
// function addImageByIndex(cell, type, index) {
//   if (index === 0 || index === 7) {
//     addimage(cell, type, "rook");
//   } else if (index === 1 || index === 6) {
//     addimage(cell, type, "knight");
//   } else if (index === 2 || index === 5) {
//     addimage(cell, type, "bishop");
//   } else if (index === 3) {
//     addimage(cell, type, "king");
//   } else if (index === 4) {
//     addimage(cell, type, "queen");
//   }
// }

// cell.addEventListener("click", oncellclick);

// let selectedcell
// function oncellclick(event) {
//   if (selectedcell !== undefined) {
//     selectedcell.classList.remove("selected");
//   }
//   selectedcell = event.currenttarget;
//   selectedcell.classList.add("selected");
// }

// function chessboard() {
//   //create table
//   let table = document.createElement("table");
//   table.classList.add("tbl");
//   document.body.appendChild(table);
//   //create a row
//   for (let i = 0; i < 8; i++) {
//     let row = document.createElement("tr");
//     //create a column
//     for (let j = 0; j < 8; j++) {
//       let cell = document.createElement("td");
//       //define which cell will be black or white
//       if ((i + j) % 2 == 0) {
//         //seperate cells to classes
//         cell.className = "wcell";
//         row.appendChild(cell);
//       } else {
//         cell.className = "bcell";
//         //connecting row to columns
//         row.appendChild(cell);
//       }
//       //connecting both rows and columns to table
//       table.appendChild(row);
//       if (i === 0) {
//         addImageByIndex(cell, white_type, j);
//       } else if (i === 1) {
//         addimage(cell, white_type, "pawn");
//       } else if (i === 6) {
//         addimage(cell, dark_type, "pawn");
//       } else if (i === 7) {
//         addImageByIndex(cell, dark_type, j);
//       }
//     }
//   }
// }

const BOARD_SIZE = 8;
const WHITE_PLAYER = "white";
const BLACK_PLAYER = "black";

const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const KING = "king";
const QUEEN = "queen";

let selectedCell;
let boardData;
let table;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getEnemy() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    }
    return WHITE_PLAYER;
  }

  getPossibleMoves(boardData) {
    // Get relative moves
    let moves;
    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData);
    } else if (this.type === ROOK) {
      moves = this.getRookMoves(boardData);
    } else if (this.type === KNIGHT) {
      moves = this.getKnightMoves(boardData);
    } else if (this.type === BISHOP) {
      moves = this.getBishopMoves(boardData);
    } else if (this.type === KING) {
      moves = this.getKingMoves(boardData);
    } else if (this.type === QUEEN) {
      moves = this.getQueenMoves(boardData);
    } else {
      console.log("Unknown type", type);
    }

    // Get absolute moves
    // let absoluteMoves = [];
    // for (let relativeMove of relativeMoves) {
    //   const absoluteRow = this.row + relativeMove[0];
    //   const absoluteCol = this.col + relativeMove[1];
    //   absoluteMoves.push([absoluteRow, absoluteCol]);
    // }

    // Get filtered absolute moves
    let filteredMoves = [];
    for (let absoluteMove of moves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  getPawnMoves(boardData) {
    let result = [];
    let direction = 1;
    if (this.player === BLACK_PLAYER) {
      direction = -1;
    }

    let position = [this.row + direction, this.col];
    if (boardData.isClear(position[0], position[1])) {
      result.push(position);
    }

    position = [this.row + direction, this.col + direction];
    if (boardData.isPlayer(position[0], position[1], this.getEnemy())) {
      result.push(position);
    }
    position = [this.row + direction, this.col - direction];
    if (boardData.isPlayer(position[0], position[1], this.getEnemy())) {
      result.push(position);
    }
    return result;
  }

  getRookMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    return result;
  }

  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];

    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i;
      let col = this.col + directionCol * i;
      if (boardData.isClear(row, col)) {
        result.push([row, col]);
      } else if (boardData.isPlayer(row, col, this.getEnemy())) {
        result.push([row, col]);
        return result;
      } else if (boardData.isPlayer(row, col, this.player)) {
        return result;
      }
    }
    return result;
  }

  getKnightMoves(boardData) {
    let result = [];
    const relativeMoves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [-1, 2],
      [1, 2],
      [-1, -2],
      [1, -2],
    ];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    return result;
  }

  getKingMoves(boardData) {
    let result = [];
    const relativeMoves = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getQueenMoves(boardData) {
    let result = this.getBishopMoves(boardData);
    result = result.concat(this.getRookMoves(boardData));
    return result;
  }
}

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }

  isClear(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player;
  }
}

function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;
}

function addFirstRowPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 3, KING, player));
  result.push(new Piece(row, 4, QUEEN, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}

function addImage(cell, player, name) {
  const image = document.createElement("img");
  image.src = "images/" + player + "/" + name + ".svg";
  cell.appendChild(image);
}

function onCellClick(event, row, col) {
  console.log("row", row);
  console.log("col", col);
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("possible-move");
    }
  }
  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves(boardData);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("possible-move");
    }
  }

  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add("selected");
}

function createChessBoard() {
  // Create empty chess board HTML:
  table = document.createElement("table");
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
      cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }

  // Create list of pieces (32 total)
  boardData = new BoardData(getInitialPieces());

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

window.addEventListener("load", createChessBoard);
