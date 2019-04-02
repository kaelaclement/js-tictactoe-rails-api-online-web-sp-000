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
  const $topRow = $("td[data-y='0']");
  // const $midRow = $("td[data-y='1']");
  // const $botRow = $("td[data-y='2']");
  // const $leftCol = $("td[data-x='0']");
  // const $midCol = $("td[data-x='1']");
  // const $rightCol = $("td[data-x='2']");
  // const $majorDiag = $("td[data-x='0']");
  $topRow.each(function(e) {
    let winner;
    let winningPlayer;
    if (e.innerHTML == 'X') {
      winner = true;
      winningPlayer = 'X';
    } else if (e.innerHTML == 'O') {
      winner = true;
      winningPlayer = 'O';
    } else {
      winner = false;
    };
  });
  debugger
  return winner
};