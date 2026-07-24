// Join Game Function

function joinGame(){

    let name = document.getElementById("playerName").value.trim();

    let code = document.getElementById("gameCode").value.trim();

    let message = document.getElementById("message");


    let correctCode = localStorage.getItem("gameCode");



    if(name=="" || code==""){

        message.innerHTML="⚠ Please enter name and game code";

        return;

    }



    if(code !== correctCode){

        message.innerHTML="❌ Wrong Game Code";

        return;

    }



    localStorage.setItem("playerName",name);



    // Save Player List

    let players = JSON.parse(
        localStorage.getItem("players")
    ) || [];



    players.push({

        name:name,
        score:0

    });



    localStorage.setItem(
        "players",
        JSON.stringify(players)
    );



    message.style.color="green";

    message.innerHTML="✅ Joined Game";



    setTimeout(()=>{

        window.location.href="quiz.html";

    },1000);


}
