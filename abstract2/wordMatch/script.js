// Uppercase and lowercase letter arrays
const upperLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
const lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f'];

const upperContainer = document.getElementById('upper');
const lowerContainer = document.getElementById('lower');

// Function to generate letters dynamically
function createLetters() {
    upperLetters.forEach(letter => {
        const div = document.createElement('div');
        div.classList.add('letter');
        div.textContent = letter;
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-letter', letter);
        div.addEventListener('dragstart', dragStart);
        upperContainer.appendChild(div);
    });

    lowerLetters.forEach(letter => {
        const div = document.createElement('div');
        div.classList.add('drop-target');
        div.textContent = letter;
        div.addEventListener('dragover', dragOver);
        div.addEventListener('drop', drop);
        lowerContainer.appendChild(div);
    });
}

// Voice assistance function
function speakMessage(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1.5; // Makes it more playful
    window.speechSynthesis.speak(speech);
}

// Drag events
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.dataset.letter);
    e.target.classList.add('letter-dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedLetter = e.dataTransfer.getData('text');
    const targetLetter = e.target.textContent;

    // Check if uppercase matches lowercase
    if (draggedLetter.toLowerCase() === targetLetter) {
        e.target.classList.add('matched');
        const draggedElement = document.querySelector(`[data-letter='${draggedLetter}']`);
        draggedElement.classList.add('matched');
        draggedElement.setAttribute('draggable', 'false');

        // Play success sound
        speakMessage(`Great job! You matched ${draggedLetter} with ${targetLetter}! 🎉`);
    } else {
        speakMessage("Oops! Try again.");
    }
}

// Initialize the game
createLetters();
