if (localStorage.getItem("quizCompleted") === "true") {
    window.location.href = "info.html";
    localStorage.removeItem("quizCompleted");
}

const questions = [
    {
        question: "Nice Person Your Reception ?",
        answers: ["Rahim", "Abdulla", "Junaid"],
        correct: 1
    },
    { 
        question: "Sir Ka Fav ?",
        answers: ["Hammad", "Saad Memon", "Arsalan"],
        correct: 0
        
    },
    {
        question: "Expatizo CEO ?",
        answers: ["Aamir", "Imran Ejaz ", "RJ"],
        correct: 2
    },
    {
        question: "Start Date Attacks Place in Palestine ?",
        answers: ["7 Oct 2023", "18 Nov 2023", "21 March 2024"],
        correct: 0
    },
    {
        question: "Masjid Aqsa ki Hifazat And Responsibility?",
        answers: ["Iran", "Palestine", "Muslims"],
        correct: 3
    },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.querySelector(".timer");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 300; // 2 minutes

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 300;
    nextButton.style.display = "none";
    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 120);
        const seconds = timeLeft % 120
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}s left`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    // Add "Q<number>- " before the question text
    questionElement.textContent = `Q${currentQuestionIndex + 1}- ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn");
        if (index === currentQuestion.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;

    // Highlight only the selected button
    Array.from(answerButtonsElement.children).forEach((button) => {
        button.classList.remove("selected"); // Remove highlight from other buttons
    });
    selectedButton.classList.add("selected"); // Highlight the clicked button

    // Check if the selected answer is correct and update the score
    if (selectedButton.dataset.correct === "true") {
        score++;
    }

    // Show the Next button after selection
    nextButton.style.display = "block";
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);

    // Show the modal
    const modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "flex";

    // Handle the "Submit" button click inside the modal
    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener("click", () => {
        // Hide the modal
        modalContainer.style.display = "none";

        // Retrieve student information from localStorage
        const studentName = localStorage.getItem("studentName");
        const studentRoll = localStorage.getItem("studentRoll");
        const studentBatch = localStorage.getItem("studentBatch");

        // Calculate performance advice based on the score
        let advice = "";
        const percentage = (score / questions.length) * 100;

        if (percentage >= 80) {
            advice = "Excellent job! You have a strong understanding of the material. Keep up the great work!";
        }
        else if (percentage >= 60) {
            advice = "Good work! You have a solid grasp of the concepts, but there’s still room for improvement.";
        }  
        else {
            "Good Job Buddy";
        } 

        // Display the result with advice
        questionElement.innerHTML = `
            <center><h1>Quiz Over!</h1></center>
            <br>
            <h2>RESULT :</h2>
            <p><strong>Name:</strong> ${studentName}</p>
            <p>Course: Web and Mobile Application Development</p>
            <p><strong>Roll No:</strong> ${studentRoll}</p>
            <p><strong>Batch:</strong> ${studentBatch}</p>
            <p><strong>Your Score:</strong> ${score} out of ${questions.length} (${percentage.toFixed(2)}%)</p>
            <br>
            <p><strong>Remarks:</strong> ${advice}</p>
        `;

        nextButton.style.display = "none";
        answerButtonsElement.innerHTML = "";

        // Set the `quizCompleted` flag in localStorage
        localStorage.setItem("quizCompleted", "true");
    });
}

nextButton.addEventListener("click", showNextQuestion);

startQuiz();
