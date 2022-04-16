window.addEventListener("load", chessboard);
function chessboard() {
  //create table
  let table = document.createElement("table");
  table.classList.add("tbl");
  document.body.appendChild(table);
  //create a row
  for (let i = 0; i < 8; i++) {
    let tr = document.createElement("tr");
    //create a column
    for (let r = 0; r < 8; r++) {
      let td = document.createElement("td");
      //define which cell will be black or white
      if ((i + r) % 2 == 0) {
        //seperate cells to classes
        td.classList.add("wcell");
        tr.appendChild(td);
      } else {
        td.classList.add("bcell");
        //connecting row to columns
        tr.appendChild(td);
      }
    }
    //connecting both rows and columns to table
    table.appendChild(tr);
  }
}
