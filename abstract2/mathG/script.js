const questionContainer = document.getElementById("question");
const feedbackContainer = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const answerButtons = document.querySelectorAll(".answer-btn");

let currentQuestion = 0;

const questions = [
  { question: "What is 5 + 3?", correctAnswer: 8, options: [7, 8, 9, 10] },
  { question: "What is 4 + 6?", correctAnswer: 10, options: [7, 8, 9, 10] },
  { question: "What is 2 + 9?", correctAnswer: 11, options: [10, 11, 12, 13] },
  { question: "What is 3 + 7?", correctAnswer: 10, options: [7, 8, 9, 10] }
];

// Function to use Web Speech API to speak text
function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    // You can adjust voice parameters for a fun and friendly tone
    utterance.rate = 1; // Adjust speaking speed
    utterance.pitch = 1.2; // Slightly higher pitch for a playful tone
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Speech Synthesis not supported.");
  }
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionContainer.textContent = q.question;

  // Speak out the question for accessibility
  speakText("Question: " + q.question);

  // Randomize the order of answers
  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
  
  answerButtons.forEach((btn, index) => {
    btn.textContent = shuffledOptions[index];
    btn.onclick = function () {
      checkAnswer(shuffledOptions[index]);
    };
  });
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestion].correctAnswer;
  if (selectedAnswer === correctAnswer) {
    feedbackContainer.textContent = "Correct! Well done!";
    feedbackContainer.style.color = "#4CAF50"; // Green for correct
    speakText("Correct! Well done!");
  } else {
    feedbackContainer.textContent = "Oops! Try again.";
    feedbackContainer.style.color = "#f44336"; // Red for incorrect
    speakText("Oops! Try again.");
  }
}

nextButton.onclick = function () {
  currentQuestion = (currentQuestion + 1) % questions.length; // Loop back to the first question
  loadQuestion();
  feedbackContainer.textContent = ""; // Clear previous feedback
};

loadQuestion(); // Initial question load
