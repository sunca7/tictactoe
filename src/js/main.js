const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let board;
let turn = "X";
let win;
let oneScore;
let twoScore;
let timer = new Date().getTime() + 60 * 1000 * 3;

const squares = Array.from(document.querySelectorAll("#board div"));

document.getElementById("board").addEventListener("click", changeTurn);
document
  .getElementById("reset-button")
  .addEventListener("click", () => init(true));

function init(hard) {
  board = ["", "", "", "", "", "", "", "", ""];
  if (hard) {
    oneScore = 0;
    twoScore = 0;
    document.getElementById("score_one").innerHTML = oneScore;
    document.getElementById("score_two").innerHTML = twoScore;
  }

  render();
}

init(true);

function render() {
  board.forEach(function (mark, index) {
    squares[index].textContent = mark;
  });
  timer = new Date().getTime() + 60 * 1000 * 3;
  const text =
    win === "T" ? `That's a tie!` : win ? `${win} wins the game!` : 0;
  document.querySelector(".player_one .fas").style.opacity =
    turn === "X" ? 1 : 0;
  document.querySelector(".player_two .fas").style.opacity =
    turn === "O" ? 1 : 0;
  if (win) {
    setTimeout(() => {
      confirm(text);
      win = null;
      init(false);
    }, 1);
  }
}

function changeTurn(event) {
  let idx = squares.findIndex(function (square) {
    return square === event.target;
  });

  board[idx] = turn;

  turn = turn === "X" ? "O" : "X";

  win = getWinner();

  if (win === "X") {
    oneScore++;
    document.getElementById("score_one").innerHTML = oneScore;
  } else if (win === "O") {
    twoScore++;
    document.getElementById("score_two").innerHTML = twoScore;
  }
  render();
}

function getWinner() {
  let winner = null;
  winning.forEach(function (combo) {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    )
      winner = board[combo[0]];
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function renderTimer() {
  const date = new Date().setTime(timer - new Date().getTime());
  document.getElementById("timer").innerHTML =
    new Date(date).getMinutes() + ":" + new Date(date).getSeconds();
}

setInterval(() => {
  if (timer < new Date().getTime()) {
    alert("Your time is done");
    init(true);
  }
  renderTimer();
}, 1000);
