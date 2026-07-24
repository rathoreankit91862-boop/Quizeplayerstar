// Result Page


let playerName = localStorage.getItem("playerName") || "Player";

let score = localStorage.getItem("score") || 0;


document.getElementById("playerResult").innerHTML =
    "Player: " + playerName;


document.getElementById("finalScore").innerHTML =
    score;
