import { db } from "./firebase.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


let playerName = localStorage.getItem("playerName") || "Player";
let gameCode = localStorage.getItem("gameCode");
let playerId = localStorage.getItem("playerId");


document.getElementById("playerResult").innerHTML =
"Player: " + playerName;


async function loadResult(){

    let playerRef = ref(
        db,
        "games/"+gameCode+"/players/"+playerId
    );

    let snapshot = await get(playerRef);

    if(snapshot.exists()){

        let data = snapshot.val();

        document.getElementById("finalScore").innerHTML =
        data.score || 0;

    }

    else{

        document.getElementById("finalScore").innerHTML = "0";

    }

}

loadResult();
