const focusHours = document.getElementById("focusHours");
const focusMinutes = document.getElementById("focusMinutes");
const breakHours = document.getElementById("breakHours");
const breakMinutes = document.getElementById("breakMinutes");
const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

let isFocus = true;
let timeLeft = getTotalSeconds(true);
let timerInterval = null;

function getTotalSeconds(focus) {
  const h = focus ? focusHours.value : breakHours.value;
  const m = focus ? focusMinutes.value : breakMinutes.value;
  return h * 3600 + m * 60;
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  statusDisplay.textContent = isFocus ? "Focus Time" : "Break Time";
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      isFocus = !isFocus;
      timeLeft = getTotalSeconds(isFocus);
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  timeLeft = getTotalSeconds(isFocus);
  updateDisplay();
}

focusHours.addEventListener("change", resetTimer);
focusMinutes.addEventListener("change", resetTimer);
breakHours.addEventListener("change", resetTimer);
breakMinutes.addEventListener("change", resetTimer);

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);

updateDisplay();