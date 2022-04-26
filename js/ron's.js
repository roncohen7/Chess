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
