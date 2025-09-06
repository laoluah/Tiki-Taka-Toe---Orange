const board = document.getElementById('board');
const cells = board.querySelectorAll('.cell');
const newGameBtn = document.getElementById('newGameBtn');
const resetBtn = document.getElementById('resetBtn');
const scoreO = document.getElementById('scoreO');
const scoreX = document.getElementById('scoreX');
const scoreT = document.getElementById('scoreT');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scores = { X: 0, O: 0, T: 0 };

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleCellClick(e) {
  const idx = e.target.dataset.index;
  if (boardState[idx]) return;
  boardState[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    scores[currentPlayer]++;
    updateScores();
    highlightWin(currentPlayer);
  } else if (boardState.every(v => v !== '')) {
    scores.T++;
    updateScores();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(i => boardState[i] === player)
  );
}

function highlightWin(player) {
  winPatterns.forEach(pattern => {
    if (pattern.every(i => boardState[i] === player)) {
      pattern.forEach(i => cells[i].classList.add('win'));
    }
  });
  setTimeout(resetBoard, 1000);
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreT.textContent = scores.T;
}

function resetBoard() {
  boardState = boardState.map(() => '');
  cells.forEach(c => {
    c.textContent = '';
    c.classList.remove('win');
  });
}

function resetAll() {
  scores = { X: 0, O: 0, T: 0 };
  updateScores();
  resetBoard();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
newGameBtn.addEventListener('click', resetBoard);
resetBtn.addEventListener('click', resetAll);

// Initialize board
resetBoard();
updateScores();
