//STATE

const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let chosenMaxLife, currentMonsterHealth, currentPlayerHealth;
let battleLog = [];
let hasBonusLife = true;

// ONMOUNT FUNCTIONS

sanitizeInputAndSetState(
  prompt("Maximum life for you and the monster.", "100")
);

adjustHealthBars(chosenMaxLife);

// HELPER FUNCTIONS

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry = {
        ...logEntry,
        target: "MONSTER",
      };
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        ...logEntry,
        target: "MONSTER",
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        ...logEntry,
        target: "PLAYER",
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        ...logEntry,
        target: "PLAYER",
      };
      break;
  }

  //if there is a game over there is no target

  battleLog.push(logEntry);
}

function sanitizeInputAndSetState(input) {
  let numInput = parseInt(input);
  // check if input is of type number
  if (isNaN(numInput) || numInput <= 0) {
    chosenMaxLife = 100;
  } else {
    chosenMaxLife = numInput;
  }
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  //set health labels
  monHealth.innerText = parseInt(currentMonsterHealth);
  playerHealth.innerText = parseInt(currentPlayerHealth);
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  /*
    Note that else if is more useful here. This is because we never want
    two successful if cases to go through. 
    */
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(maxDamage); //decrease health in display
  currentMonsterHealth -= damage; //decrease health in state
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

  endRound(); //function definitions can be hoisted
}

function endRound() {
  const initalPlayerHealth = currentPlayerHealth;

  //monster attacks at end of every round
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); //only player launches strong attack
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initalPlayerHealth;
    alert("You would be dead but the bonus life saved you!");
    setPlayerHealth(initalPlayerHealth);
  }

  /*
        Without final if statement and penultimate conditional: 
    
        The advantage is with the player here. This is because the
        monster health is checked first and the winner is decided. 
    
        So even if the monster inflicts more damage when both parties
        are near zero, the player will still win!
        */

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("This is a draw!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }

  //set health labels
  monHealth.innerText = parseInt(currentMonsterHealth);
  playerHealth.innerText = parseInt(currentPlayerHealth);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

// EVENT HANDLERS

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayer() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You cannot heal past your max initial health");
    healValue = chosenMaxLife - currentPlayerHealth; //heal up to max
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue); //increase in display
  currentPlayerHealth += healValue; //increase in state
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  for (const item of battleLog) {
    for (const key in item) {
      console.log(`${key} => ${item[key]}`);
    }
    console.log("*****");
  }
}

// TIE HANDLERS TO ELEMENTS

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayer);
logBtn.addEventListener("click", printLogHandler);
