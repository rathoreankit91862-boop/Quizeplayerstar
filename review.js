// Review Answers

let questions = [];

// Default Question

questions.push({

    question: "India ki capital kya hai?",

    options: ["Mumbai","Delhi","Chennai","Kolkata"],

    answer: 1

});



// Admin Questions

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

                answer:Number(lines[5].replace("Answer: ",""))

            });

        }

    });

}



let userAnswers = JSON.parse(
localStorage.getItem("userAnswers")
) || [];


let box = document.getElementById("reviewBox");

let html = "";



questions.forEach((q,index)=>{

let correct = userAnswers[index] == q.answer;

html += `

<div style="margin:20px 0;padding:10px;border:1px solid #ccc;border-radius:10px;">

<b>Q${index+1}. ${q.question}</b>

<br><br>

Your Answer:
<span style="color:${correct?"green":"red"}">
${q.options[userAnswers[index]] || "Not Answered"}
</span>

<br>

Correct Answer:
<span style="color:green">
${q.options[q.answer]}
</span>

</div>

`;

});


box.innerHTML = html;
