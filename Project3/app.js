const startGameBtn = document.getElementById("start-game-btn");

// STATE
let gameIsRunning = false;

// SELECTION VALUES
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER WINS";
const RESULT_COMPUTER_WINS = "COMPUTER WINS";

// HELPER FUNCTIONS
const getPlayerChoice = function () {
  let selection = prompt("Rock, Paper or Scissors?", "").toUpperCase();

  switch (selection) {
    case ROCK:
      break;
    case PAPER:
      break;
    case SCISSORS:
      break;
    default:
      alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
      selection = DEFAULT_USER_CHOICE;
      break;
  }

  return selection;
};

const getComputerChoice = function () {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice) => {
  if (cChoice === pChoice) {
    return RESULT_DRAW;
  } else if (
    (cChoice === ROCK && pChoice === PAPER) ||
    (cChoice === PAPER && pChoice === SCISSORS) ||
    (cChoice === SCISSORS && pChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

// ADDING EVENT LISTENERS
startGameBtn.addEventListener("click", function () {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log("Game is starting...");
  const playerSelection = getPlayerChoice();
  const computerChoice = getComputerChoice();
  const winner = getWinner(computerChoice, playerSelection);
  let message = `You picked ${playerSelection}, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + 'had a draw.';
  } else if(winner === RESULT_PLAYER_WINS){
    message = message + 'had a win.';
  } else{
    message = message + 'had a loss';
  }
  alert(message);
  gameIsRunning = false;
});
