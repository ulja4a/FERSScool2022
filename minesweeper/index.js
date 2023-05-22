const title = document.createElement('h1');
const wrap = document.createElement('div');
const result = document.createElement('div');
const options = document.createElement('div');
const flagsBomb = document.createElement('p');
const stepsElement = document.createElement('p');
const timerElement = document.createElement('p');
const startGame = document.createElement('p');

document.body.classList.add('body');
title.classList.add('title');
title.textContent = 'Minesweeper';
document.body.appendChild(title);

wrap.classList.add('grid-wrap');
document.body.appendChild(wrap);
startGame.classList.add('start');
startGame.textContent = 'New Game';
document.body.appendChild(startGame);



const grid = document.createElement('div');
  grid.classList.add('grid');
  wrap.appendChild(grid);
  grid.appendChild(result);

options.classList.add('options');
title.appendChild(options);
flagsBomb.classList.add('flag-bomb');
timerElement.classList.add('times');
stepsElement.classList.add('steps');
options.appendChild(flagsBomb);
options.appendChild(timerElement);
options.appendChild(stepsElement);


let size = 10;
let bombAmount = 10;
let cells = [];
let end = false;
let flags = 0;
let steps = 0;
let gameTime = 0;
let timerInterval = null;
flagsBomb.textContent = '💣: ' + bombAmount;
stepsElement.textContent = 'Steps: 0';
timerElement.textContent = 'Time: 0';

//Подсчет времени
function updateTimer() {
  gameTime++;
  timerElement.textContent = 'Time: ' + gameTime;
}


//Создание поля
function createGrid() {
  const flagsBomb = bombAmount;
  let steps = 0;
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
    });

    //Добовляем клик правой кнопкой міши
    cell.addEventListener('contextmenu', function(e) {
      e.preventDefault()
      addFlag(cell);
    });

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
// Запускаем таймер
  timerInterval = setInterval(updateTimer, 1000);
}
createGrid();

//Добовляем флаг правой кн мыши
function addFlag(cell) {
  if (end) return;
  if (!cell.classList.contains('checked') && (flags <= bombAmount)) {
    if (!cell.classList.contains('flag')) {
      cell.classList.add('flag');
      cell.innerHTML = '🚩';
      flags++;
      flagsBomb.innerHTML = '💣: ' + (bombAmount - flags);
      checkWin();
    } else {
          cell.classList.remove('flag');
          cell.innerHTML = '';
          flags--;
          flagsBomb.innerHTML = '💣: ' + (bombAmount - flags);
    }
  }
}

//Собітия при клике по клетке
function click(cell) {
  const currentIndex = cells.indexOf(cell);
  if (end) return;
  if (cell.classList.contains('checked') || cell.classList.contains('flag')) return;
  if (cell.classList.contains('bomb')) {
    gameOver(cell);
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
steps++;
console.log(steps)
stepsElement.innerHTML = 'Steps: ' + steps;
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

//Функция конца игры
function gameOver(cell) {
  result.innerHTML = 'Boom, boom! Game Over!';
  result.classList.add('result');
  console.log('Game over!');
  end = true;
// Показать где были бомбы
  cells.forEach(cell => {
    if (cell.classList.contains('bomb')) {
      cell.innerHTML = '💣';
    }
  })
  // Остановить таймер
  clearInterval(timerInterval);
}

//Функция проверки на победу
function checkWin() {
  let currentCount = 0;
  for (j =0; j < cells.length; j++) {
    if (cells[j].classList.contains('flag') && cells[j].classList.contains('bomb')) {
      currentCount++;
  }
    if (currentCount === bombAmount) {
      result.innerHTML = 'You WIN!';
      result.classList.add('result');
      console.log('win win');
      end = true;
    }
}
}

startGame.addEventListener('click', function() {
  location.reload();
});
