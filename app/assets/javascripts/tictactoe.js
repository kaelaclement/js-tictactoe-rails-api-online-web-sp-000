// decide who the current player is
function player() {
  let player;
  if (turn % 2 === 1) {
    player = 'O';
  } else {
    player = 'X';
  };
  return player;
};

// put current player's token on the board
function updateState(el) {
  const token = player();
  el.innerHTML = token;
};

// display a message under the board
function setMessage(message) {
  $("#message").text(message);
};

// check if there is a winner and alert if there is
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
  
  // convert current game into an array
  const gameState = [];
  $("td").each(function (i, el) {
    gameState.push(el.innerText);
  });

  // check if any winning combinations have the same character in each cell
  const sameValue = winningCombinations.filter(function (winArr) {
    return gameState[winArr[0]] === gameState[winArr[1]] && gameState[winArr[1]] === gameState[winArr[2]];
  });

  // check that it's a player token in those cells
  const winRow = sameValue.find(function (winArr) {
    return gameState[winArr[0]] === 'X' || gameState[winArr[0]] === 'O';
  });

  // return whether or not there is a winner
  if (winRow) {
    setMessage(`Player ${gameState[winRow[0]]} Won!`)
    return true;
  } else {
    return false;
  }
};

let gameOver;
// take a turn
function doTurn(el) {
  if (el.innerHTML === "") {
    updateState(el);

    const gameState = [];
    $("td").each(function (i, el) {
      gameState.push(el.innerText);
    });
  
    if (checkWinner()) {
      $("td").each(function (i, el) {
        el.innerText = "";
      });
      turn = 0;
    } else if (gameState.every(token => token === 'X' || token === 'O')) {
      setMessage('Tie game.');
      $("td").each(function (i, el) {
        el.innerText = "";
      });
      turn = 0;
    } else {
      turn +=1;
    };
  }
};

// get the current state of the board
function currentBoard() {
  const gameState = [];
  $("td").each(function (i, el) {
    gameState.push(el.innerText);
  });
  return gameState;
};

// attach event listeners for gameplay
function attachListeners() {
   $("td").click(function() {
     doTurn(this);
   });

   
  // save button functionality currently saves as a new game every time

  $("button#save").click(function (e) {
    e.preventDefault;
    $.post("/games", {state: currentBoard()})
  });

  $("button#clear").click(function (e) {
    e.preventDefault;
    $("td").each(function (i, el) {
      el.innerText = "";
    });
  });

  $("button#previous").click(function (e) {
    e.preventDefault;
    // get the previous game and display it
  })

};

$(document).ready(
  attachListeners()
);


