import { db } from "./firebase.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


let gameCode = localStorage.getItem("gameCode");


async function loadLeaderboard(){

    let box = document.getElementById("leaderboardBox");

    let snapshot = await get(
        ref(db,"games/"+gameCode+"/players")
    );

    if(!snapshot.exists()){

        box.innerHTML = "No Players";
        return;

    }

    let players = Object.values(snapshot.val());

    players.sort((a,b)=>b.score-a.score);

    let html="";

    players.forEach((player,index)=>{

        html += `
        <p>
        ${index+1}. ${player.name} - ${player.score} Points
        </p>
        `;

    });

    box.innerHTML = html;

}

loadLeaderboard();
