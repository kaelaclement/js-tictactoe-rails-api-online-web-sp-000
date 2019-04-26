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
      saveGame();
      resetBoard();
    } else if (gameState.every(token => token === 'X' || token === 'O')) {
      setMessage('Tie game.');
      saveGame();
      resetBoard();
    } else {
      turn +=1;
    };
  };
};

function resetBoard() {
  $('td').empty();
  turn = 0;
}

// get the current state of the board
function currentBoard() {
  const gameState = [];
  $("td").each(function (i, el) {
    gameState.push(el.innerText);
  });
  return gameState;
};

// temp value for game id while we test if it exists or not
let currentGame = 0;
// update an existing saved game, or save a new game
function saveGame() {
  if (currentGame != 0) {
    $.ajax({
      type: 'PATCH',
      url: '/games/' + currentGame,
      data: { state: currentBoard() },
    });
  } else {
    $.post("/games", { state: currentBoard()}, function(game) {
      currentGame = game.data.id;
      $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
    });
  }
};

function previousGames() {
  $('#games').empty();
  $.get("/games", (savedGames) => {
    if (savedGames.data.length) {
      savedGames.data.forEach(makeGameButton);
    }
  });
}

function makeGameButton(game) {
  $('#games').append(`<button id="gameid-${game.id}">${game.id}</button><br>`);
  $(`#gameid-${game.id}`).on('click', () => reloadGame(game.id));
}

//reload game....somehow
function reloadGame(gameID) {
  $.get(`/games/${gameID}`, function (data) {
    let savedGame = data["data"]["attributes"]["state"]
    $('td[data-x="0"][data-y="0"]').text(savedGame[0]);
    $('td[data-x="1"][data-y="0"]').text(savedGame[1]);
    $('td[data-x="2"][data-y="0"]').text(savedGame[2]);
    $('td[data-x="0"][data-y="1"]').text(savedGame[3]);
    $('td[data-x="1"][data-y="1"]').text(savedGame[4]);
    $('td[data-x="2"][data-y="2"]').text(savedGame[5]);
    $('td[data-x="0"][data-y="2"]').text(savedGame[6]);
    $('td[data-x="1"][data-y="2"]').text(savedGame[7]);
    $('td[data-x="2"][data-y="2"]').text(savedGame[8]);
  })
};

// attach event listeners for gameplay
function attachListeners() {
  $("td").click(function() {
    if (!checkWinner()) {
      doTurn(this);
    }
  });

  $("button#save").click(function (e) {
    e.preventDefault;
    saveGame();
  });

  $("button#clear").click(function (e) {
    e.preventDefault;
    resetBoard();
    setMessage('Game cleared.');
    currentGame = 0;
  });

  $("button#previous").click(function (e) {
    e.preventDefault;
    // get the previous games and display them
    previousGames();
  })

};

$(document).ready(
  attachListeners()
);


