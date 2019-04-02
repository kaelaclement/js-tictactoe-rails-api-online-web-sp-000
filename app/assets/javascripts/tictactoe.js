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
  // select each possible win row

  // but not like this
  const $topRow = $("td[data-y='0']");
  // const $midRow = $("td[data-y='1']");
  // const $botRow = $("td[data-y='2']");
  // const $leftCol = $("td[data-x='0']");
  // const $midCol = $("td[data-x='1']");
  // const $rightCol = $("td[data-x='2']");
  // const $majorDiag = $("td[data-x='0']");

  // check for a winning pattern

  // return if someone won

  // use setMessage to return who won
};