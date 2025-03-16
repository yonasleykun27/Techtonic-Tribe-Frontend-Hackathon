// Science quiz questions for kids (age 5-7)
const questions = [
    {
        question: "🌞 What gives us light and heat?",
        choices: ["Moon", "Sun", "Stars"],
        correct: "Sun"
    },
    {
        question: "🌱 What do plants need to grow?",
        choices: ["Milk", "Sunlight", "Ice"],
        correct: "Sunlight"
    },
    {
        question: "💧 What do we drink to stay alive?",
        choices: ["Water", "Juice", "Soda"],
        correct: "Water"
    },
    {
        question: "🐘 Which is the largest land animal?",
        choices: ["Elephant", "Dog", "Rabbit"],
        correct: "Elephant"
    },
    {
        question: "🫁 What do we use to breathe?",
        choices: ["Heart", "Lungs", "Feet"],
        correct: "Lungs"
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
