const gameBoard = document.getElementById("game-board");
const matchedEl = document.getElementById("matched");
const totalPairsEl = document.getElementById("totalPairs");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");

const restartBtn = document.getElementById("restart");
const difficultyEl = document.getElementById("difficulty");

const winOverlay = document.getElementById("win");
const winTimeEl = document.getElementById("winTime");
const winMovesEl = document.getElementById("winMoves");
const playAgainBtn = document.getElementById("playAgain");

const soundToggleEl = document.getElementById("soundToggle");

const SYMBOLS = [
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🍍",
  "🥝",
  "🍉",
  "🍑",
  "🍋",
  "🥥",
  "🍐",
];

const DIFFICULTY = {
  easy: { rows: 3, cols: 4 },
  medium: { rows: 4, cols: 4 },
  hard: { rows: 4, cols: 6 },
};

let cards = [];
let flipped = [];
let lockBoard = false;

let matchedPairs = 0;
let totalPairs = 0;
let moves = 0;

let timer = 0;
let timerId = null;
let gameStarted = false;

let audioCtx = null;
let soundEnabled = true;

function ensureAudio() {
  if (!soundEnabled) return null;
  if (!audioCtx)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function beep(freq, duration = 0.08, gain = 0.05) {
  const ctx = ensureAudio();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const g = ctx.createGain();

  osc.frequency.value = freq;
  g.gain.value = gain;

  osc.connect(g);
  g.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function sFlip() {
  beep(520, 0.05, 0.03);
}
function sMatch() {
  beep(660);
  setTimeout(() => beep(880), 100);
}
function sWin() {
  beep(523, 0.1);
  setTimeout(() => beep(659, 0.1), 120);
  setTimeout(() => beep(784, 0.12), 240);
}

soundToggleEl.addEventListener("change", () => {
  soundEnabled = soundToggleEl.checked;
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  if (gameStarted) return;
  gameStarted = true;
  timerId = setInterval(() => {
    timer++;
    timeEl.textContent = timer;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  gameStarted = false;
}

function createCard(symbol) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.symbol = symbol;

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const back = document.createElement("div");
  back.className = "face back";

  const front = document.createElement("div");
  front.className = "face front";
  front.textContent = symbol;

  inner.append(back, front);
  card.appendChild(inner);

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (
    lockBoard ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  )
    return;

  startTimer();
  sFlip();

  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesEl.textContent = moves;
    lockBoard = true;
    checkMatch();
  }
}

function checkMatch() {
  const [c1, c2] = flipped;

  if (c1.dataset.symbol === c2.dataset.symbol) {
    c1.classList.add("matched");
    c2.classList.add("matched");
    sMatch();

    matchedPairs++;
    matchedEl.textContent = matchedPairs;
    resetTurn();

    if (matchedPairs === totalPairs) {
      stopTimer();
      winTimeEl.textContent = timer;
      winMovesEl.textContent = moves;
      setTimeout(() => {
        sWin();
        winOverlay.classList.remove("hidden");
      }, 300);
    }
  } else {
    setTimeout(() => {
      c1.classList.remove("flipped");
      c2.classList.remove("flipped");
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  flipped = [];
  lockBoard = false;
}

function newGame() {
  winOverlay.classList.add("hidden");
  stopTimer();

  const diff = DIFFICULTY[difficultyEl.value];
  gameBoard.style.gridTemplateColumns = `repeat(${diff.cols}, var(--card-size))`;

  const numCards = diff.rows * diff.cols;
  totalPairs = numCards / 2;
  totalPairsEl.textContent = totalPairs;

  matchedPairs = 0;
  moves = 0;
  timer = 0;
  matchedEl.textContent = 0;
  movesEl.textContent = 0;
  timeEl.textContent = 0;

  cards = SYMBOLS.slice(0, totalPairs);
  cards = [...cards, ...cards];
  shuffle(cards);

  gameBoard.innerHTML = "";
  cards.forEach((sym) => gameBoard.appendChild(createCard(sym)));
}

restartBtn.addEventListener("click", newGame);
playAgainBtn.addEventListener("click", newGame);
difficultyEl.addEventListener("change", newGame);

newGame();
