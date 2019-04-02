// Code your JavaScript / jQuery solution here
function player() {
  let player;
  if (turn % 2 == 1) {
    player = 'O';
  } else {
    player = 'X';
  };
  return player;
};

function updateState(el) {
  const token = player();
  el.innerHTML = token;
};

function setMessage(message) {
  $("#message").text(message);
};

function checkWinner() {
  const winningCombinations = [
  [0, 1, 2], // top –––
  [3, 4, 5], // middle –––
  [6, 7, 8], // bottom –––
  [0, 3, 6], // left |
  [1, 4, 7], // middle |
  [2, 5, 8], // right |
  [0, 4, 8], // \ diagonal
  [2, 4, 6] // / diagonal
  ]
  let gameState = [];

  $("td").each(function (i, el) {
    gameState.push(el.innerText);
  });

  // check for a winning pattern

  winningCombinations.forEach(function (winArr) {
    if (gameState[winArr[0]] === 'X' || gameState[winArr[0]] === 'O') {
      if (gameState[winArr[0]] === gameState[winArr[1]] && gameState[winArr[1]] === gameState[winArr[2]]) {
        setMessage('Player ' + gameState[winArr[0]] + ' Won!');
        return true;
      }
    } else {
      return false;
    }
  });
};