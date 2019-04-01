// Code your JavaScript / jQuery solution here
function player() {
  let player;
  if (turn % 2 == 0 || turn == 0) {
    player = 'X';
  } else if (turn %2 == 1 || turn == 1) {
    player = 'O';
  };
  return player;
};