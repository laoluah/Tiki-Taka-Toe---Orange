const board = document.getElementById("board");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const targetScore = document.getElementById("targetScore");
const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const message = document.getElementById("message");

let currentPlayer = "X";
let moves = [];
let gameActive = false;
let scores = { X: 0, O: 0 };
let target = 1;

function createBoard() {
  board.innerHTML = "";
  moves = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.addEventListener("click", () => makeMove(i));
    board.appendChild(cell);
  }
}

function makeMove(index) {
  if (!gameActive || moves[index] !== "") return;
  moves[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;
  if (checkWinner()) {
    scores[currentPlayer]++;
    updateScore();
    if (scores[currentPlayer] >= target) {
      message.textContent = `Player ${currentPlayer} wins the game!`;
      gameActive = false;
    } else {
      message.textContent = `Player ${currentPlayer} wins this round!`;
      setTimeout(startRound, 1000);
    }
  } else if (!moves.includes("")) {
    message.textContent = "It's a draw!";
    setTimeout(startRound, 1000);
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateActivePlayer();
}

function updateActivePlayer() {
  playerX.classList.toggle("active", currentPlayer === "X");
  playerO.classList.toggle("active", currentPlayer === "O");
}

function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => moves[i] === currentPlayer)
  );
}

function startRound() {
  message.textContent = "";
  createBoard();
  updateActivePlayer();
}

function startGame() {
  target = parseInt(targetScore.value);
  scores = { X: 0, O: 0 };
  updateScore();
  currentPlayer = "X";
  gameActive = true;
  startRound();
}

function resetGame() {
  location.reload();
}

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

createBoard();
