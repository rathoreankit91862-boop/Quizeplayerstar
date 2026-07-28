import { db } from "./firebase.js";

import { 
    ref, 
    set 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


alert("Admin JS Loaded");


// Create Game

window.createGame = async function(){


    let admin = document.getElementById("adminName").value.trim();


    if(admin==""){

        alert("Enter Admin Name");
        return;

    }



    let code = "QUIZ" + Math.floor(1000 + Math.random()*9000);



    await set(
        ref(db,"games/"+code),
        {

            adminName:admin,

            gameCode:code,

            status:"waiting"

        }

    );



    // Save only for Admin session

    localStorage.setItem(
        "adminGameCode",
        code
    );



    document.getElementById("codeShow").innerHTML =
    "Game Code: "+code;



    alert("Game Created Successfully");


}





// Save Questions

window.saveQuestions = async function(){


    let text =
    document.getElementById("questionsText").value;



    if(text==""){

        alert("Please paste questions");
        return;

    }



    let code =
    localStorage.getItem("adminGameCode");



    if(!code){

        alert("Create Game First");
        return;

    }



    await set(

        ref(db,"games/"+code+"/questions"),

        {

            data:text

        }

    );



    alert("Questions Saved Successfully");


}





// Start Game

window.startGame=function(){


    window.location.href="index.html";


}
