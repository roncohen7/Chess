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
const DARK_PLAYER = "dark";

let selectedCell;
let pieces = [];

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
}

function getInitialBoard() {
  let result = [];
  addpieces(result, 0, WHITE_PLAYER);
  addpieces(result, 7, DARK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, "pawn", WHITE_PLAYER));
    result.push(new Piece(6, i, "pawn", DARK_PLAYER));
  }
  return result;
}

function addpieces(result, row, player) {
  result.push(new Piece(row, 0, "rook", player));
  result.push(new Piece(row, 1, "knight", player));
  result.push(new Piece(row, 2, "bishop", player));
  result.push(new Piece(row, 3, "queen", player));
  result.push(new Piece(row, 4, "king", player));
  result.push(new Piece(row, 5, "bishop", player));
  result.push(new Piece(row, 6, "knight", player));
  result.push(new Piece(row, 7, "rook", player));
}

function addImage(cell, player, name) {
  const image = document.createElement("img");
  image.src = "images/" + player + "/" + name + ".svg";
  cell.appendChild(image);
}

function onCellClick(event) {
  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add("selected");
}

function createChessBoard() {
  const table1 = document.createElement("table");
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = "light-cell";
      } else {
        cell.className = "dark-cell";
      }
      cell.addEventListener("click", onCellClick);
    }
  }
  pieces = getInitialBoard();

  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener("load", createChessBoard);
