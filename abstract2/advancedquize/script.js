// Math quiz questions for kids (age 8-10)
const questions = [
    {
        question: "➕ What is 15 + 7?",
        choices: ["22", "23", "21"],
        correct: "22"
    },
    {
        question: "➖ What is 30 - 12?",
        choices: ["17", "18", "19"],
        correct: "18"
    },
    {
        question: "✖️ What is 6 × 4?",
        choices: ["20", "24", "26"],
        correct: "24"
    },
    {
        question: "➗ What is 36 ÷ 6?",
        choices: ["4", "5", "6"],
        correct: "6"
    },
    {
        question: "🔢 What number comes next? 2, 4, 6, __?",
        choices: ["7", "8", "10"],
        correct: "8"
    },
    {
        question: "📐 What is the shape with three sides called?",
        choices: ["Square", "Triangle", "Circle"],
        correct: "Triangle"
    },
    {
        question: "🧮 If you have 5 apples and give away 2, how many do you have left?",
        choices: ["2", "3", "5"],
        correct: "3"
    },
    {
        question: "🕰️ What is half of 60?",
        choices: ["20", "30", "40"],
        correct: "30"
    }
];

let currentQuestionIndex = 0;
let score = 0; // Score tracker

const questionContainer = document.getElementById('question');
const choicesContainer = document.getElementById('choices');
const submitButton = document.getElementById('submit');

// Function to generate a new question
function generateQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showFinalResult();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    speakMessage(currentQuestion.question);

    choicesContainer.innerHTML = ""; // Clear previous choices
    currentQuestion.choices.forEach(choice => {
        const div = document.createElement('div');
        div.classList.add('choice');
        div.textContent = choice;
        div.addEventListener('click', () => selectChoice(div, choice));
        choicesContainer.appendChild(div);
    });
}

// Function to handle choice selection
function selectChoice(choiceElement, choice) {
    document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
    choiceElement.classList.add('selected');
    selectedChoice = choice;
}

// Function to check the answer and provide feedback
function checkAnswer() {
    const selectedChoice = document.querySelector('.choice.selected');

    if (!selectedChoice) {
        speakMessage("Please select an answer!");
        return;
    }

    const selectedAnswer = selectedChoice.textContent;
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
        score++; // Increase score
        speakMessage(`✅ Correct! ${correctAnswer} is the right answer!`);
    } else {
        speakMessage(`❌ Oops! The correct answer was ${correctAnswer}.`);
    }

    currentQuestionIndex++;
    setTimeout(generateQuestion, 2000);
}

// Function to show final result
function showFinalResult() {
    let message = `🎉 You finished the quiz! You scored ${score} out of ${questions.length}!`;

    questionContainer.textContent = message;
    choicesContainer.innerHTML = ""; // Clear choices
    submitButton.style.display = "none"; // Hide submit button
    speakMessage(message);
}

// Voice assistance function
function speakMessage(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1.5;
    window.speechSynthesis.speak(speech);
}

// Set up submit button
submitButton.addEventListener('click', checkAnswer);

// Initialize the first question
generateQuestion();
