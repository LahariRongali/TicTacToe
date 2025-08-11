const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resultScreen = document.getElementById('resultScreen');
const resultText = document.getElementById('resultText');

let currentPlayer = 'X';
let gameActive = true;
let cells = [];

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  board.innerHTML = '';
  cells = [];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  resultScreen.style.display = 'none';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (!gameActive || cells[index].textContent !== '') return;

  cells[index].textContent = currentPlayer;
  cells[index].classList.add('taken');

  if (checkWin()) {
    gameActive = false;
    showResult(`Player ${currentPlayer} wins!`);
  } else if (isDraw()) {
    gameActive = false;
    showResult("It's a draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent !== '');
}

function showResult(message) {
  resultText.textContent = message;
  resultScreen.style.display = 'flex';
}

window.onload = startGame;
