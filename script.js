import { db } from "./firebase.js";

import {
    ref,
    get,
    set,
    push
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// Join Game Function

window.joinGame = async function(){


    let name = document.getElementById("playerName").value.trim();

    let code = document.getElementById("gameCode").value.trim();

    let message = document.getElementById("message");



    if(name=="" || code==""){

        message.innerHTML="⚠ Please enter name and game code";
        return;

    }



    // Check Game Code From Firebase

    let gameRef = ref(db,"games/"+code);

    let snapshot = await get(gameRef);



    if(!snapshot.exists()){

        message.innerHTML="❌ Wrong Game Code";
        return;

    }



    // Create New Player ID

    let playerRef = push(
        ref(db,"games/"+code+"/players")
    );


    let playerId = playerRef.key;



    // Save Player In Firebase

    await set(playerRef,{

        id:playerId,

        name:name,

        score:0,

        answers:{}

    });



    // Save Current Player Info

    localStorage.setItem(
        "playerName",
        name
    );


    localStorage.setItem(
        "gameCode",
        code
    );


    localStorage.setItem(
        "playerId",
        playerId
    );



    message.style.color="green";

    message.innerHTML="✅ Joined Game";



    setTimeout(()=>{

        window.location.href="quiz.html";

    },1000);


}
