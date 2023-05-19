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
  const bombs = Array(bombAmount).fill('bomb'); // Создаем массив из бомб со значением bomb
  console.log(bombs);
  const emptySquares = Array((size*size) - bombAmount).fill('valid'); //Создаем массив оставшихся валидніх пустіх клеток
  console.log(emptySquares);
  const board = emptySquares.concat(bombs); //Объединяем массивы в один
  console.log(board);
  const randomBoard = board.sort(() => Math.random()-0.5); // Рандомно распределяем бомбы
  console.log(randomBoard);

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (randomBoard[i] === 'bomb') {
      cell.classList.add('bomb');
    }
    if (randomBoard[i] === 'valid') {
      cell.classList.add('valid');
    }
    grid.appendChild(cell);
    cells.push(cell);
  }
    // Добавляем числа по количеству бомб
    for (let i = 0; i < size * size; i++) {
      let number = 0;
      const column = i % size;
      const row = Math.floor(i / size);
      if (cells[i].classList.contains('valid')) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const currentColumn = column + x;
          const currentRow = row + y;
          if (
            currentColumn >= 0 &&
            currentColumn < size &&
            currentRow >= 0 &&
            currentRow < size &&
            !(x === 0 && y === 0) 
          ) {
            const currentIndex = currentRow * size + currentColumn;
            if (cells[currentIndex] && cells[currentIndex].classList.contains('bomb')) {
              number++;
            }
            
          }
        }
      }
      cells[i].setAttribute('data', number);
    }
    

}
  
}
createGrid();