const textToType = document.getElementById("text-to-type").innerText;
const inputBox = document.getElementById("input-box");
const startBtn = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer");
const results = document.getElementById("results");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timer = 30;
let interval;
let typedText = "";
let isTestStarted = false;

startBtn.addEventListener("click", startTest);
inputBox.addEventListener("input", handleInput);

function startTest() {
  if (isTestStarted) return;

  isTestStarted = true;
  inputBox.disabled = false;
  inputBox.focus();
  startBtn.disabled = true;
  results.hidden = true;

  timer = 60;
  timerDisplay.innerText = `Time: ${timer}s`;
  interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timer > 0) {
    timer--;
    timerDisplay.innerText = `Time: ${timer}s`;
  } else {
    endTest();
  }
}

function handleInput() {
  typedText = inputBox.value;
}

function endTest() {
  clearInterval(interval);
  inputBox.disabled = true;
  startBtn.disabled = false;
  isTestStarted = false;

  // Calculate Words Per Minute (WPM)
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.floor((wordsTyped / 60) * (60 - timer));

  // Calculate Accuracy
  const originalWords = textToType.split(" ");
  const typedWords = typedText.trim().split(/\s+/);
  let correctWords = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === originalWords[i]) {
      correctWords++;
    }
  }
  const accuracy = ((correctWords / originalWords.length) * 100).toFixed(2);

  // Display Results
  wpmDisplay.innerText = wpm;
  accuracyDisplay.innerText = accuracy;
  results.hidden = false;
}







