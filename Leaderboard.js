// Leaderboard System


let playerName = localStorage.getItem("playerName") || "Player";

let score = Number(localStorage.getItem("score")) || 0;


let players = JSON.parse(
    localStorage.getItem("players")
) || [];


// Add Current Player

players.push({

    name: playerName,
    score: score

});


// Save Players

localStorage.setItem(
    "players",
    JSON.stringify(players)
);


// Sort By Score

players.sort(function(a,b){

    return b.score - a.score;

});


// Display Leaderboard

let box = document.getElementById("leaderboardBox");


let html = "";


players.forEach(function(player,index){

    html += `

    <p>
    ${index+1}. ${player.name} - ${player.score} Points
    </p>

    `;

});


box.innerHTML = html;
