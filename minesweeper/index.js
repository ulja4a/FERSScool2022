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
let gameOver = false;


//Создание поля
function createGrid() {
  const bombs = Array(bombAmount).fill('bomb'); // Создаем массив из бомб со значением bomb
  const emptySquares = Array((size*size) - bombAmount).fill('valid'); //Создаем массив оставшихся валидніх пустіх клеток
  const board = emptySquares.concat(bombs); //Объединяем массивы в один
  const randomBoard = board.sort(() => Math.random()-0.5); // Рандомно распределяем бомбы

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

    //Добавляем обработчик клика по клетке
    cell.addEventListener('click', function(e) {
      click(cell)
    })

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

//Собітия при клике по клетке
function click(cell) {
  const currentIndex = cells.indexOf(cell);
  console.log(currentIndex);
  if (gameOver) return;
  if (cell.classList.contains('checked') || cell.classList.contains('flag')) return;
  if (cell.classList.contains('bomb')) {
    console.log('Game over');
  } else {
    let number = cell.getAttribute('data');
    if (number !=0) {
      cell.classList.add('checked');
      if (number == 1) cell.classList.add('one');
      if (number == 2) cell.classList.add('two');
      if (number == 3) cell.classList.add('three');
      if (number == 4) cell.classList.add('four');
      if (number == 5) cell.classList.add('five');
      if (number == 6) cell.classList.add('six');
      if (number == 7) cell.classList.add('seven');
      if (number == 8) cell.classList.add('eight');
      cell.innerHTML = number;
      return
    }
    
    checkCell(cell, currentIndex);
    
}
cell.classList.add('checked');
}

// Открытие пустых клеток до чисел при нажатии на свободную клетку
function checkCell(cell, currentIndex) {
  setTimeout(() =>{
    const column = currentIndex % size;
    const row = Math.floor(currentIndex / size);
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
            const newCurrentIndex = currentRow * size + currentColumn;
            const currentCell = cells[newCurrentIndex];
            if (currentCell && !currentCell.classList.contains('checked') && !currentCell.classList.contains('flag')
            && !(currentCell.classList.contains('one') || currentCell.classList.contains('two') || 
            currentCell.classList.contains('three') || currentCell.classList.contains('four')
            || currentCell.classList.contains('five') || currentCell.classList.contains('six') 
            || currentCell.classList.contains('seven') || currentCell.classList.contains('eight')))
              click(currentCell);
            }
      }
    }
  }, 10);
}