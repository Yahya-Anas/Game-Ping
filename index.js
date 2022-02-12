window.addEventListener("load", function () {
  const playerOneResult = document.querySelector("#player-1-result");
  const playerTowResult = document.querySelector("#player-2-result");
  const diceEl = document.querySelector("#dice-image");
  const btnRollDice = document.querySelector("#btn-roll-dice");
  const playerOneElement = document.querySelector("#player-pos-1");
  const playerTowElement = document.querySelector("#player-pos-2");
  const btnHolld = document.querySelector("#btn-hold");
  const btnCreateGame = document.querySelector("#btn-create-game");
  const playerOneCurrent = document.querySelector("#player-1-current");
  const playerTowCurrent = document.querySelector("#player-2-current");

  let scores, current, activePlayer, playing;

  let init = function () {
    scores = [0, 0, 0];
    current = 0;
    activePlayer = 1;
    playing = true;
    // reset The Score Players
    playerOneResult.textContent = 0;
    playerTowResult.textContent = 0;

    playerOneResult.textContent = 0;
    playerTowResult.textContent = 0;
    playerOneCurrent.textContent = 0;
    playerTowCurrent.textContent = 0;

    // hidden The image
    diceEl.classList.add("hidden");
    document.querySelector(".player-1").classList.remove("player-winner");
    document.querySelector(".player-2").classList.remove("player-winner");
    playerOneElement.classList.add("active");
    playerTowElement.classList.remove("active");
  };

  init();

  const switchPlayer = function () {
    document.getElementById(`player-${activePlayer}-current`).textContent = 0;
    current = 0;
    // Switch to next player
    if (activePlayer === 1) {
      activePlayer = 2;
    } else {
      activePlayer = 1;
    }
    playerOneElement.classList.toggle("active");
    playerTowElement.classList.toggle("active");
  };

  btnRollDice.addEventListener("click", function () {
    if (playing) {
      //create the Random Number
      let randomDice = Math.trunc(Math.random() * 6) + 1;

      // display dice
      diceEl.classList.remove("hidden");
      diceEl.src = `dice-${randomDice}.png`;

      if (randomDice !== 1) {
        // add dice number to the Current
        current = current + randomDice;
        document.getElementById(`player-${activePlayer}-current`).textContent =
          current;
      } else {
        // Rest the current Player and Switch to next player
        switchPlayer();
      }
    }
  });

  btnHolld.addEventListener("click", function () {
    if (playing) {
      scores[activePlayer] += current;
      console.log(scores[activePlayer]);
      document.getElementById(`player-${activePlayer}-result`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 20) {
        playing = false;
        document
          .querySelector(`.player-${activePlayer}`)
          .classList.add("player-winner");
        document
          .querySelector(`.player-${activePlayer}`)
          .classList.remove("active");
        diceEl.classList.add("hidden");
      } else {
        switchPlayer();
      }
    }
  });

  btnCreateGame.addEventListener("click", function () {
    init();
  });
});
