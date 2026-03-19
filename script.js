let playerHP = 100;
let enemyHP = 100;
let xp = 0;
let level = 1;

const questions = [
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "Capital of Japan?",
    answers: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    correct: 1
  },
  {
    question: "5 x 3 = ?",
    answers: ["15", "10", "20", "25"],
    correct: 0
  }
];

// 💾 SAVE
function saveGame() {
  localStorage.setItem("studyGameSave", JSON.stringify({
    playerHP,
    enemyHP,
    xp,
    level
  }));
}

// 📥 LOAD
function loadGame() {
  const save = localStorage.getItem("studyGameSave");

  if (save) {
    const data = JSON.parse(save);
    playerHP = data.playerHP;
    enemyHP = data.enemyHP;
    xp = data.xp;
    level = data.level;
  }
}

// 🔁 LOAD QUESTION
function loadQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.innerText = ans;

    btn.onclick = () => answerQuestion(index === q.correct);

    answersDiv.appendChild(btn);
  });
}

// ⚔️ ANSWER
function answerQuestion(correct) {
  if (correct) {
    enemyHP -= 20;
    xp += 10;
  } else {
    playerHP -= 15;
  }

  checkLevelUp();
  checkGameState();
  updateUI();
  saveGame();
  loadQuestion();
}

// 📈 LEVEL SYSTEM
function checkLevelUp() {
  if (xp >= level * 50) {
    level++;
    alert("LEVEL UP!");
  }
}

// 🧾 UPDATE UI
function updateUI() {
  document.getElementById("playerHP").innerText = playerHP;
  document.getElementById("enemyHP").innerText = enemyHP;
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
}

// 🎯 GAME STATE
function checkGameState() {
  if (enemyHP <= 0) {
    alert("Enemy defeated!");
    enemyHP = 100 + level * 20;
  }

  if (playerHP <= 0) {
    alert("You lost!");
    playerHP = 100;
    xp = 0;
    level = 1;
  }
}

// 🧹 RESET
function resetGame() {
  localStorage.removeItem("studyGameSave");
  location.reload();
}

// 🚀 START
loadGame();
updateUI();
loadQuestion();
