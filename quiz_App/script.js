document.addEventListener("DOMContentLoaded", () => {


const startBtn = document.getElementById("start-btn")
const nextBtn = document.getElementById("next-btn")
const restartBtn = document.getElementById("restart-btn")
const questionText = document.getElementById("question-text")
const choiseList = document.getElementById("choises-list")
const scoreDisplay = document.getElementById("score")
const questionContainer = document.getElementById("question-container")
const resultContainer = document.getElementById("result-container")


const Questions  = [
    {
        question: "1. What should be added to -5/4 to get -1?",
        choises: [ "-1/4", "1/4", "1", "-3/4"],
        answer: "1/4"
    },

    {
       question: "2. Find the solution of 2x - 3 = 7",
       choises: [ 3, 4, 5, 6],
       answer: 5
    },

    {
       question: "3. Solve: 2x - 3 = x + 2",
       choises: [ 4, 5, 3, 0],
       answer: 5
    }, 

    {
        question: "4. What is the capital of France?",
        choises: [ "Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },

    {
        question: "5. Which planet is known as the Red Planet?",
        choises:  [ "Mars", "Venus", "Jupiter","Saturn"],
        answer: "Mars"
    }
]

let currentOuestionIndex = 0
let score = 0

startBtn.addEventListener("click", startQuiz)

nextBtn.addEventListener("click", () => {
   currentOuestionIndex++
   if( currentOuestionIndex < Questions.length){
    showQuestion();

   } else {
    showResult()
   }
   choiseList.innerHTML = ""
    questionText.textContent = Questions[currentOuestionIndex].question
    choiseList.innerHTML = ""
    Questions[currentOuestionIndex].choises.forEach(choise => {
        const li = document.createElement("li")
        li.textContent = choise
        choiseList.appendChild(li)
        li.addEventListener("click", () => selectAnswer(choise, li))
    })

})

restartBtn.addEventListener("click", startQuiz)

function startQuiz() {
    startBtn.classList.add("hidden")
    resultContainer.classList.add("hidden")
    questionContainer.classList.remove("hidden")
    currentOuestionIndex = 0
    
    showQuestion();
}


function showQuestion() {
    nextBtn.classList.add("hidden")
    questionText.textContent = Questions[currentOuestionIndex].question
    choiseList.innerHTML = "" // clear previous choises
    Questions[currentOuestionIndex].choises.forEach(choise => {
        const li = document.createElement("li")
        li.textContent = choise
        choiseList.appendChild(li)
        li.addEventListener("click", () => selectAnswer(choise, li))
    })
    

} 

function selectAnswer(choise, liElement) {
const correctAnswer = Questions[currentOuestionIndex].answer
if (choise === correctAnswer){
    score++;
    liElement.style.backgroundColor = "green"
} else {
    liElement.style.backgroundColor = "red"
}



  nextBtn.classList.remove("hidden")

  preventFurtherClick()
}

 
function showResult() {
    resultContainer.classList.remove("hidden")
    scoreDisplay.innerHTML = `${score} out of 5`
    if ( score === 5){
        scoreDisplay.innerHTML = `
        ${score}
        <p> Congratulations you've answered all correct 👍🎉</p>
        `
    }
    questionContainer.classList.add("hidden")
}

function preventFurtherClick(choise) {
 const listItems = choiseList.querySelectorAll("li")
    listItems.forEach(item => {
        item.style.pointerEvents = "none"; // Prevent further clicks
    })
}

})