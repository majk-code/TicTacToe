const cells = document.querySelectorAll('.cell');
const title = document.querySelector('.title');

let currentPlayer = 'X';
let gameOver = false;

// Tablica zawierająca możliwe kombinacje wygranej
const winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Poziomo
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Pionowo
  [0, 4, 8], [2, 4, 6]              // Na ukos
];

function checkWin(player) {
  const winCombination = winCombinations.find(combination => {
    return combination.every(index => cells[index].textContent === player);
  });

  if (winCombination) {
    winCombination.forEach(index => {
      cells[index].style.color = '#03c26f';
      cells[index].style.fontweight = '900'
    });
    return true;
  }

  return false;
}

function checkDraw() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = 'white';
  });
  currentPlayer = 'X';
  gameOver = false;
  title.textContent = 'Tic Tac Toe';
  title.style.color = 'white'
}

cells.forEach(cell => {
  cell.addEventListener('click', function () {
    if (!gameOver && cell.textContent === '') {
      cell.textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
        title.textContent = 'Wygrana ' + currentPlayer;
        title.style.color = '#03c26f'
        gameOver = true;
      } else if (checkDraw()) {
        title.textContent = 'Remis';
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  });
});
