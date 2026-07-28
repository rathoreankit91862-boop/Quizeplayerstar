
import { db } from "./firebase.js";

import { ref, set } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
alert("Admin JS Loaded");

window.createGame = function(){

let admin = document.getElementById("adminName").value;


if(admin==""){
alert("Enter Admin Name");
return;
}


let code = "QUIZ" + Math.floor(1000 + Math.random()*9000);


set(ref(db,"games/"+code),{

adminName: admin,
gameCode: code

});


localStorage.setItem("gameCode",code);


document.getElementById("codeShow").innerHTML =
"Game Code: " + code;


alert("Game Created Successfully");

}



window.saveQuestions = function(){

let text = document.getElementById("questionsText").value;


if(text==""){
alert("Please paste questions");
return;
}


let code = localStorage.getItem("gameCode");


set(ref(db,"games/"+code+"/questions"),{

data:text

});


alert("Questions Saved Successfully");

}



window.startGame = function(){

window.location.href="index.html";

}
