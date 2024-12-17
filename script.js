// script.js
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let isQuizStarted = false;

const questions = [
    {
        question: "What is transpiration?",
        options: {
            A: "Transpiration is the process of water movement through a plant and its evaporation from aerial parts, primarily from the leaves.",
            B: "Transpiration is the process of photosynthesis in plants.",
            C: "Transpiration refers to the absorption of nutrients by plant roots.",
            D: "Transpiration is the movement of water from the soil to the roots."
        },
        correctAnswer: "A"
    },
    {
        question: "What do stomata allow to enter the plant?",
        options: {
            A: "Water",
            B: "Nutrients",
            C: "Carbon dioxide",
            D: "Oxygen"
        },
        correctAnswer: "C"
    },
    {
        question: "What is the main function of xylem?",
        options: {
            A: "The main function of xylem is to transport water and minerals.",
            B: "To provide structural support to the plant.",
            C: "To store food for the plant.",
            D: "To facilitate photosynthesis in leaves."
        },
        correctAnswer: "A"
    },
    // Add other questions here...
];

// Play start sound when the quiz starts
function playStartSound() {
    const startSound = document.getElementById("start-sound");
    startSound.play();
}

// Play correct answer sound
function playCorrectSound() {
    const correctSound = document.getElementById("correct-sound");
    correctSound.play();
}

// Play incorrect answer sound
function playIncorrectSound() {
    const incorrectSound = document.getElementById("incorrect-sound");
    incorrectSound.play();
}

// Generate particle effects
function generateParticles() {
    const particlesContainer = document.getElementById("particles");
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 10 + 5;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.animationDuration = (Math.random() * 0.8 + 0.5) + "s";
    particlesContainer.appendChild(particle);
    setTimeout(() => {
        particlesContainer.removeChild(particle);
    }, 1000);
}

// Load the question and answers
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById("question").textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
        const options = currentQuestion.options;
        document.querySelectorAll(".answer-btn").forEach((button, index) => {
            const optionKey = Object.keys(options)[index];
            button.textContent = `${optionKey}. ${options[optionKey]}`;
        });

        // Reset the timer for each question
        timeLeft = 30;
        document.getElementById("timer").textContent = timeLeft;
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    } else {
        showResult();
    }
}

// Update the timer every second
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
    } else {
        clearInterval(timer);
        checkAnswer(""); // Automatically move to next question if time runs out
    }
}

// Track the user's answers
let userAnswers = [];

// Check if the selected answer is correct
function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
        score++;
        playCorrectSound();
        generateParticles();
        userAnswers.push({ questionNumber: currentQuestionIndex + 1, answer: "Correct" });
    } else {
        playIncorrectSound();
        userAnswers.push({ questionNumber: currentQuestionIndex + 1, answer: "Incorrect" });
    }
    currentQuestionIndex++;
    loadQuestion();
}

// Show the final result
function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("final-score").textContent = `Your score: ${score}`;
    
    let incorrectQuestionsText = "You got the following questions wrong: <ul>";
    userAnswers.forEach(answer => {
        if (answer.answer === "Incorrect") {
            incorrectQuestionsText += `<li>Question ${answer.questionNumber}</li>`;
        }
    });
    incorrectQuestionsText += "</ul>";
    document.getElementById("incorrect-questions").innerHTML = incorrectQuestionsText;
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";
    loadQuestion();
}

// Start the quiz
if (!isQuizStarted) {
    playStartSound();
    loadQuestion();
    isQuizStarted = true;
}
