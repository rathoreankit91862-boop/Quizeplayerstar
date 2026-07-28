import { db } from "./firebase.js";

import {
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

alert("Admin JS Loaded");

// Create Game
window.createGame = async function () {

  let admin = document.getElementById("adminName").value.trim();

  if (admin == "") {
    alert("Enter Admin Name");
    return;
  }

  let code = "QUIZ" + Math.floor(1000 + Math.random() * 9000);

  await set(ref(db, "games/" + code), {
    adminName: admin,
    gameCode: code,
    status: "waiting"
  });

  localStorage.setItem("adminGameCode", code);

  document.getElementById("codeShow").innerHTML =
    "Game Code: " + code;

  alert("Game Created Successfully");

  loadPlayers();
};

// Save Questions
window.saveQuestions = async function () {

  let text = document.getElementById("questionsText").value;

  if (text == "") {
    alert("Please paste questions");
    return;
  }

  let code = localStorage.getItem("adminGameCode");

  await set(
    ref(db, "games/" + code + "/questions"),
    {
      data: text
    }
  );

  alert("Questions Saved Successfully");
};

// Start Game
window.startGame = async function () {

  let code = localStorage.getItem("adminGameCode");

  await set(
    ref(db, "games/" + code + "/status"),
    "started"
  );

  window.location.href = "index.html";
};

// Live Players
function loadPlayers() {

  let code = localStorage.getItem("adminGameCode");

  if (!code) return;

  onValue(ref(db, "games/" + code + "/players"), (snapshot) => {

    let playersBox = document.getElementById("playersBox");
    let leaderboardBox = document.getElementById("leaderboardBox");
    let playerCount = document.getElementById("playerCount");
    let gameStatus = document.getElementById("gameStatus");

    if (!snapshot.exists()) {
      playersBox.innerHTML = "No Players Joined";
      leaderboardBox.innerHTML = "No Scores Yet";
      playerCount.innerHTML = "0";
      gameStatus.innerHTML = "Waiting for Players...";
      return;
    }

    let players = Object.values(snapshot.val());

    playerCount.innerHTML = players.length;

    let html = "";

    players.forEach((player, index) => {

      html += `
      <p>
      👤 ${index + 1}. ${player.name}
      <br>
      🎯 Score : ${player.score || 0}
      </p>
      <hr>
      `;

    });

    playersBox.innerHTML = html;

    players.sort((a, b) => (b.score || 0) - (a.score || 0));

    let board = "";

    players.forEach((player, index) => {

      board += `
      <p>
      🏅 ${index + 1}. ${player.name} - ${player.score || 0}
      </p>
      `;

    });

    leaderboardBox.innerHTML = board;

    gameStatus.innerHTML = "Game Running";

  });

}

// Auto Load
window.onload = function () {
  loadPlayers();
};
