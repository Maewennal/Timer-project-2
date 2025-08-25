const chat = document.querySelector('.chat-anim');
const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const dureeInput = document.getElementById('duree');
const messageFinal = document.getElementById('message-final');

let time = parseInt(dureeInput.value) * 60;
let interval = null;
let isRunning = false;

const emojis = ["🐱", "🦊", "🐸", "🐧", "🐰", "🐼"];
let currentEmoji = 0;

const couleurs = {
  "🐱": "#E1C8E1", 
  "🦊": "#FFD8B1",
  "🐸": "#C8E6C9",
  "🐧": "#BBDEFB",
  "🐰": "#F8BBD0",
  "🐼": "#E0E0E0"
};

document.body.style.transition = "background-color 1s ease";

function deplacerChat() {
  const largeur = window.innerWidth;
  const hauteur = window.innerHeight;

  const posX = Math.random() * (largeur - 50);
  const posY = Math.random() * (hauteur - 50);

  chat.style.left = posX + 'px';
  chat.style.top = posY + 'px';
  chat.style.position = "fixed";
  chat.style.zIndex = "9999";
  chat.style.fontSize = "2rem";
  chat.style.cursor = "pointer";
}
deplacerChat();
setInterval(deplacerChat, 2000);

chat.addEventListener("click", () => {
  currentEmoji = (currentEmoji + 1) % emojis.length;
  chat.textContent = emojis[currentEmoji];
  deplacerChat(); 
  document.body.style.backgroundColor = couleurs[emojis[currentEmoji]];
});

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function startTimer() {
  if (!isRunning) {
    interval = setInterval(() => {
      if (time > 0) {
    time--;
    updateDisplay();
} else {
    clearInterval(interval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    messageFinal.style.display = 'block';
    messageFinal.textContent = "Time's up! 🎉";
    launchConfetti(); 
    alert('Time is up! ');
}

    }, 1000);
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    messageFinal.style.display = 'none';
  } else {
    clearInterval(interval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
  }
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  time = parseInt(dureeInput.value) * 60;
  updateDisplay();
  startPauseBtn.textContent = 'Start';
  messageFinal.style.display = 'none';
}

dureeInput.addEventListener('input', () => {
  if (!isRunning) {
    time = parseInt(dureeInput.value) * 60;
    updateDisplay();
  }
});

startPauseBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();