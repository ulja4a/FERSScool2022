const title = document.createElement('h1');
const wrap = document.createElement('div');

document.body.classList.add('body');
title.classList.add('title');
title.textContent = 'Minesweeper';
document.body.appendChild(title);
wrap.classList.add('grid-wrap');
document.body.appendChild(wrap);


const grid = document.createElement('div');
  grid.classList.add('grid');
  wrap.appendChild(grid);

let size = 10;
let bombAmount = 10;
let cells = [];


//Создание поля
function createGrid() {
  

  for (let i = 0; i < size * size; i++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          grid.appendChild(cell);
          cells.push(cell);
    }
}

createGrid();