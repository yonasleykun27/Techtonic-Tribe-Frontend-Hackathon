const words = document.querySelectorAll('.word-box');
const images = document.querySelectorAll('.match-image');
const feedback = document.getElementById('feedback');
const restartBtn = document.getElementById('restart-btn');

let correctMatches = 0;

// Azure Speech Service Configuration
const azureKey = "YOUR_AZURE_SPEECH_KEY"; // Replace with your Azure Key
const azureRegion = "YOUR_AZURE_REGION"; // Example: "eastus"

// Function to play Amharic voice using Azure TTS
async function playVoice(text) {
    const speechUrl = `https://${azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`;
    
    const headers = {
        "Ocp-Apim-Subscription-Key": azureKey,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono"
    };

    const ssml = `
    <speak version='1.0' xml:lang='am-ET'>
        <voice xml:lang='am-ET' xml:gender='Female' name='am-ET-MekdesNeural'>
            ${text}
        </voice>
    </speak>`;

    try {
        const response = await fetch(speechUrl, {
            method: "POST",
            headers: headers,
            body: ssml
        });

        if (!response.ok) {
            console.error("Error fetching speech:", response.statusText);
            return;
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
    } catch (error) {
        console.error("Error playing speech:", error);
    }
}

// Drag and Drop Matching Logic
function handleDragStart(e) {
    const word = e.target.dataset.word;
    e.dataTransfer.setData('word', word);
    playVoice(word);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const word = e.dataTransfer.getData('word');
    const image = e.target;

    if (image.dataset.word === word) {
        image.style.border = "5px solid #4CAF50"; 
        feedback.textContent = "ትክክል! እናመሰግናለን!";
        feedback.style.color = "#4CAF50";
        playVoice("ትክክል! እናመሰግናለን!");
        correctMatches++;
    } else {
        feedback.textContent = "ይቅርታ! እንደገና ይሞክሩ";
        feedback.style.color = "#ff0000";
        playVoice("ይቅርታ! እንደገና ይሞክሩ");
    }

    if (correctMatches === words.length) {
        feedback.textContent = "እናመሰግናለን! ሁሉንም ቃላት ተመሳሳይ አደረጉ!";
        feedback.style.color = "#4CAF50";
        playVoice("እናመሰግናለን! ሁሉንም ቃላት ተመሳሳይ አደረጉ!");
    }
}

// Attach Events
words.forEach(word => {
    word.setAttribute('draggable', true);
    word.addEventListener('dragstart', handleDragStart);
});

images.forEach(image => {
    image.addEventListener('dragover', handleDragOver);
    image.addEventListener('drop', handleDrop);
});

// Restart Game
restartBtn.addEventListener('click', () => {
    correctMatches = 0;
    feedback.textContent = '';
    images.forEach(image => { image.style.border = ''; });
    words.forEach(word => { word.style.backgroundColor = '#ffcc00'; });
    playVoice("ጨዋታ እንደገና ተጀመረ");
});
