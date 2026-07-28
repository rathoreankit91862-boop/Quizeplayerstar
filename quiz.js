import { db } from "./firebase.js";

import {
    ref,
    get,
    update
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


alert("Quiz JS Loaded");


// Player Data

let playerName = localStorage.getItem("playerName") || "Player";

let gameCode = localStorage.getItem("gameCode");

let playerId = localStorage.getItem("playerId");



document.getElementById("playerNameShow").innerHTML =
"Player: " + playerName;



let questions = [];

let currentQuestion = 0;

let score = 0;

let streak = 0;

let userAnswers = [];

let answered = false;

let strategyUsed = false;



// Load Questions

async function loadQuestions(){

    let qRef = ref(
        db,
        "games/"+gameCode+"/questions"
    );


    let snapshot = await get(qRef);


    if(snapshot.exists()){


        let data = snapshot.val().data;


        let blocks = data.split("\n\n");


        blocks.forEach(block=>{

            let lines = block.split("\n");


            if(lines.length >= 6){

                questions.push({

                    question:lines[0].replace("Question: ",""),

                    options:[

                        lines[1].replace("Option1: ",""),

                        lines[2].replace("Option2: ",""),

                        lines[3].replace("Option3: ",""),

                        lines[4].replace("Option4: ","")

                    ],

                    answer:Number(
                    lines[5].replace("Answer: ","")
                    )-1

                });

            }

        });


        showQuestion();

    }

}



// Show Question

function showQuestion(){

    answered=false;


    let q=questions[currentQuestion];


    document.getElementById("questionNumber").innerHTML =
    "Question "+(currentQuestion+1)+"/"+questions.length;


    document.getElementById("questionText").innerHTML =
    q.question;



    let buttons=document.querySelectorAll(".option-btn");


    buttons[0].innerHTML="A. "+q.options[0];
    buttons[1].innerHTML="B. "+q.options[1];
    buttons[2].innerHTML="C. "+q.options[2];
    buttons[3].innerHTML="D. "+q.options[3];


    buttons.forEach(btn=>{

        btn.disabled=false;

        btn.style.background="#007bff";

    });

}



// Check Answer

window.checkAnswer = async function(answer){


    if(answered) return;


    answered=true;


    let correct=questions[currentQuestion].answer;


    let buttons=document.querySelectorAll(".option-btn");


    userAnswers[currentQuestion]=answer;



    if(answer==correct){


        score++;

        streak++;


        buttons[answer].style.background="green";


        document.getElementById("score").innerHTML=score;

        document.getElementById("streak").innerHTML=streak;



        // Strategy unlock after 3 correct

        if(streak>=3 && !strategyUsed){


            document.getElementById("strategyBox").style.display="block";


        }


    }

    else{


        streak=0;


        document.getElementById("streak").innerHTML=streak;


        buttons[answer].style.background="red";

        buttons[correct].style.background="green";


        document.getElementById("strategyBox").style.display="none";


    }



    buttons.forEach(btn=>{

        btn.disabled=true;

    });



    // Save Score Firebase

    await update(

        ref(
        db,
        "games/"+gameCode+"/players/"+playerId
        ),

        {

            score:score,

            answers:userAnswers

        }

    );


}





// Show Target Players

window.useStrategy = async function(){


    let targetBox=document.getElementById("strategyTargetBox");


    targetBox.style.display="block";


    let select=document.getElementById("targetPlayer");


    select.innerHTML="";



    let snapshot=await get(

        ref(db,"games/"+gameCode+"/players")

    );



    if(snapshot.exists()){


        let players=snapshot.val();



        for(let id in players){


            if(id!=playerId){


                let option=document.createElement("option");


                option.value=id;

                option.innerHTML=players[id].name;


                select.appendChild(option);


            }

        }

    }


}





// Apply Strategy -1 Score

window.applyStrategy = async function(){


    let targetId =
    document.getElementById("targetPlayer").value;



    if(!targetId){

        alert("Select Player");

        return;

    }



    let targetRef =
    ref(
    db,
    "games/"+gameCode+"/players/"+targetId
    );



    let snap=await get(targetRef);



    if(snap.exists()){


        let oldScore=snap.val().score || 0;


        await update(

            targetRef,

            {

                score:Math.max(0,oldScore-1)

            }

        );


        strategyUsed=true;


        alert("⚡ Strategy Applied (-1 Score)");

    }



    document.getElementById("strategyBox").style.display="none";

    document.getElementById("strategyTargetBox").style.display="none";


}





// Skip

window.skipStrategy=function(){


    strategyUsed=true;


    document.getElementById("strategyBox").style.display="none";

}





// Next Question

window.nextQuestion=function(){


    currentQuestion++;


    if(currentQuestion < questions.length){

        showQuestion();

    }

    else{


        update(

            ref(
            db,
            "games/"+gameCode+"/players/"+playerId
            ),

            {

                score:score,

                answers:userAnswers,

                finished:true

            }

        );


        window.location.href="result.html";

    }

}



loadQuestions();
