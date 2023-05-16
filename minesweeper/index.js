

let size = 10;
let bombFrequency = 0.1;  //Коэффициент бомб
let bombNumber = size * bombFrequency;
let cellSize = 40;  //Размер клетки
let cells = size * size;
let bombs = [];
let numbers = [];
let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
const title = document.createElement('h1');

document.body.classList.add('body');
title.classList.add('title');
title.textContent = 'Minesweeper';
document.body.appendChild(title);


function startGame(size, bombNumber) {
  const grid = document.createElement('div');
  grid.classList.add('grid');
  document.body.appendChild(grid);

  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          grid.appendChild(cell);
      }
  }
}
startGame(size, bombNumber);

// Функция для создания поля
/*function createBoard() {
  const grid = [];
  for (let w = 0; w < size; w++) {
    const row = [];
    for (let h = 0; h < size; h++) {
      const cell = {w, h}
      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
}*/

/*const size = 10;
const bombNumber = 10;
console.log(createBoard(10, 10));
grid = createBoard(size, bombNumber);
let bombs = [];
let numbers = [];*/
