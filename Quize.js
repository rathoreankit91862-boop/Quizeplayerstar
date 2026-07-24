// Default Questions
alert("Quiz JS Loaded");
let defaultQuestions = [

{
    question: "India ki capital kya hai?",
    options: ["Mumbai","Delhi","Chennai","Kolkata"],
    answer: 1
}

];



// Load Questions

let questions = [...defaultQuestions];


let savedQuestions = localStorage.getItem("questionsText");


if(savedQuestions){

    let blocks = savedQuestions.split("\n\n");


    blocks.forEach(block=>{

        let lines = block.split("\n");


        if(lines.length >= 6){

            questions.push({

                question: lines[0].replace("Question: ",""),

                options:[
                    lines[1].replace("Option1: ",""),
                    lines[2].replace("Option2: ",""),
                    lines[3].replace("Option3: ",""),
                    lines[4].replace("Option4: ","")
                ],
answer: Number(lines[5].replace("Answer: ","")) - 1
              

            });

        }

    });

}



// Player Name

let playerName = localStorage.getItem("playerName") || "Player";

document.getElementById("playerNameShow").innerHTML =
"Player: " + playerName;



// Variables

let currentQuestion = 0;

let score = 0;

let streak = 0;

let userAnswers = [];

let answered = false;




// Show Question

function showQuestion(){

    answered=false;


    let q = questions[currentQuestion];


    document.getElementById("questionNumber").innerHTML =
    "Question " + (currentQuestion+1) + "/" + questions.length;


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

function checkAnswer(answer){
 alert("Clicked: " + answer);

if(answered) return;


answered=true;


let correct = questions[currentQuestion].answer;


let buttons=document.querySelectorAll(".option-btn");


userAnswers[currentQuestion]=answer;



if(answer==correct){


score++;

streak++;


document.getElementById("score").innerHTML=score;

document.getElementById("streak").innerHTML=streak;


buttons[answer].style.background="green";



// Strategy Unlock

if(streak>=3){


let box=document.getElementById("strategyBox");


box.style.display="block";


box.innerHTML=`

🔥 Strategy Unlocked!

<br><br>

<button onclick="showTargetPlayers()">
🎯 Select Target
</button>


<button onclick="skipStrategy()">
⏭️ Skip Strategy
</button>

`;

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


}





// Show Target Players

function showTargetPlayers(){


let targetBox=document.getElementById("strategyTargetBox");


targetBox.style.display="block";



let players=JSON.parse(
localStorage.getItem("players")
) || [];



let select=document.getElementById("targetPlayer");


select.innerHTML="";



players.forEach(player=>{


let option=document.createElement("option");


option.value=player.name;


option.innerHTML=player.name;


select.appendChild(option);


});


}




// Apply Strategy

function applyStrategy(){


let target=document.getElementById("targetPlayer").value;


alert("⚡ Strategy used on: "+target);


document.getElementById("strategyTargetBox").style.display="none";


}




// Skip Strategy

function skipStrategy(){


document.getElementById("strategyBox").style.display="none";


document.getElementById("strategyTargetBox").style.display="none";


alert("⏭️ Strategy Skipped");


}





// Next Question

function nextQuestion(){


currentQuestion++;


if(currentQuestion < questions.length){

showQuestion();

}

else{


localStorage.setItem("score",score);


localStorage.setItem(
"userAnswers",
JSON.stringify(userAnswers)
);



window.location.href="result.html";


}


}



showQuestion();
