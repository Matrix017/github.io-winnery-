// button in the begining to start using wiinery

$(" #start-winnery").click( function (e){
    scroll("form")


})


// This script handles the betting strategy simulation for a gambling game.


let balance = 0;
let startingBet = 0;
let strategy = "flat";
let lossLimit = 0;
let rounds = 0;
let currentRound = 0;
let currentBet = 0;
let log = [];

document.querySelector("form").addEventListener ("submit", function (e) {
  e.preventDefault();

  balance = parseFloat(document.getElementById("balance").value);
  startingBet = parseFloat(document.getElementById("betAmount").value);
  strategy = document.getElementById("strategy").value;
  lossLimit = parseFloat(document.getElementById("lossLimit").value) || 0;
  rounds = parseInt(document.getElementById("rounds").value);
  currentRound = 0;
  currentBet = startingBet;
  log = [];

  document.getElementById("controls").classList.remove("hidden");
  document.getElementById("output").classList.remove("hidden");
  document.getElementById("log").innerHTML = "";

  alert("Strategy session started 💼. Start clicking WIN or LOSE buttons.");
});

function recordResult(isWin) {
    if (currentRound >= rounds || (lossLimit && balance <= lossLimit * -1)) {
      alert("Session over. Either rounds are done or loss limit reached.");
      return;
    }
  
    let resultText = `Round ${currentRound + 1}: `;
    if (isWin) {
      balance += currentBet;
      resultText += `WIN 🟢 | Bet: $${currentBet} | New Balance: $${balance}`;
      if (strategy === "anti-martingale") {
        currentBet *= 2;
      } else if (strategy === "martingale") {
        currentBet = startingBet;
      }
    } else {
      balance -= currentBet;
      resultText += `LOSS 🔴 | Bet: $${currentBet} | New Balance: $${balance}`;
      if (strategy === "martingale") {
        currentBet *= 2;
      } else if (strategy === "anti-martingale") {
        currentBet = startingBet;
      }
    }
  
    log.push(resultText);
    currentRound++;
  
    const logBox = document.getElementById("log");
    logBox.innerHTML += `<p>${resultText}</p>`;
  }

 
