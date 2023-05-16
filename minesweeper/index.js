

let size = 10;
let bombFrequency = 0.1;  //Коэффициент бомб
let bombNumber = size * bombFrequency;
let cells;
//let bombs = [];
//let numbers = [];
//let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
const title = document.createElement('h1');
const wrap = document.createElement('div');

document.body.classList.add('body');
title.classList.add('title');
title.textContent = 'Minesweeper';
document.body.appendChild(title);
wrap.classList.add('grid-wrap');
document.body.appendChild(wrap);


const startGame = () => {
  const grid = document.createElement('div');
  grid.classList.add('grid');
  wrap.appendChild(grid);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.setAttribute('data-tile', `${i},${j}`); //Добавляем к клеткам координаты
          grid.appendChild(cell);
    }
  }
}
startGame();