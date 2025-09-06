const board = document.getElementById("board");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const targetScoreSelect = document.getElementById("targetScore");

let currentPlayer = "X";
let gameActive = false;
let targetScore = 1;
let boardState = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

function startGame() {
  targetScore = parseInt(targetScoreSelect.value);
  scores = { X: 0, O: 0 };
  updateScore();
  gameActive = true;
  message.textContent = "";
  currentPlayer = "X";
  document.getElementById("playerX").classList.add("active");
  document.getElementById("playerO").classList.remove("active");
  newRound();
}

function resetGame() {
  gameActive = false;
  scores = { X: 0, O: 0 };
  updateScore();
  boardState = ["", "", "", "", "", "", "", "", ""];
  updateBoard();
  message.textContent = "Game reset.";
}

function newRound() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  updateBoard();
}

function updateScore() {
  document.getElementById("scoreX").textContent = scores.X;
  document.getElementById("scoreO").textContent = scores.O;
}

function updateBoard() {
  board.innerHTML = "";
  boardState.forEach((cell, index) => {
    const div = document.createElement("div");
    div.textContent = cell;
    div.addEventListener("click", () => handleMove(index));
    board.appendChild(div);
  });
}

function handleMove(index) {
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  updateBoard();

  if (checkWin(currentPlayer)) {
    scores[currentPlayer]++;
    updateScore();

    if (scores[currentPlayer] >= targetScore) {
      message.textContent = `🎉 Player ${currentPlayer} wins the match!`;
      gameActive = false;
      return;
    }

    message.textContent = `🎉 Player ${currentPlayer} wins the round!`;
    setTimeout(() => {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      toggleActivePlayer();
      newRound();
    }, 1000);
  } else if (!boardState.includes("")) {
    message.textContent = "It's a draw!";
    setTimeout(() => {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      toggleActivePlayer();
      newRound();
    }, 1000);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    toggleActivePlayer();
  }
}

function toggleActivePlayer() {
  document.getElementById("playerX").classList.toggle("active", currentPlayer === "X");
  document.getElementById("playerO").classList.toggle("active", currentPlayer === "O");
}

function checkWin(player) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  return winConditions.some((combo) =>
    combo.every((index) => boardState[index] === player)
  );
}
