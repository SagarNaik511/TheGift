// Motivational Quotes
const quotes = [
  "Believe in yourself, you are unstoppable! 💪",
  "Small steps every day = Big results. 🌟",
  "Keep going, you’re closer than you think! 🚀",
  "Your hard work will pay off. ❤️",
  "Stay positive, work hard, and make it happen. 🌈",
  "One chapter at a time, you’ll finish the whole book. 📖✨",
  "You’re stronger than you feel. 💜",
  "Every effort you make brings you closer. 🏆",
  "Don’t stop until you’re proud. 🌟",
  "Dream it. Do it. 💭➡️✅",
  "Progress, not perfection. 🌱",
  "Your future self will thank you. 🙌",
  "Mistakes are proof you’re trying. ✏️",
  "You got this, genius! 🧠💡",
  "One question at a time, superstar. ⭐",
  "Discipline beats motivation. ⚡",
  "Push yourself, because no one else will. 🔥",
  "Trust the process, trust yourself. 💫",
  "Turn pressure into power. 💎",
  "Your consistency is your superpower. 🦸‍♀️",
  "Winners were once beginners. 🏁",
  "Nothing can dim your inner light. 🔆",
  "Hard work always beats talent (when talent doesn’t work hard). 🥇",
  "Study now, shine later. 🌞",
  "Focus on your goals, not distractions. 🎯",
  "You’re capable of amazing things. 🌸",
  "Don’t limit your challenges, challenge your limits. 🚀",
  "Slow progress is still progress. 🐢➡️🏆",
  "Success is built one page at a time. 📚",
  "The comeback is always stronger than the setback. 💥",
  "Courage over comfort, always. 🦁",
  "Don’t be afraid of mistakes, be afraid of not trying. 💡",
  "Consistency creates confidence. 🔑",
  "Wake up with determination, sleep with satisfaction. 😴✨",
  "Big journeys begin with small steps. 👣",
  "Doubt kills more dreams than failure ever will. ❌➡️🌟"
];


document.getElementById("quote").innerText =
  quotes[Math.floor(Math.random() * quotes.length)];

const taskList = document.getElementById("task-list");

// Compliments
const compliments = [
  "Best sister in the world 🌍",
  "You shine brighter than the stars ✨",
  "Smartest cookie in the jar 🍪",
  "Future doctor loading... 🩺",
  "Queen of multitasking 👑",
  "My partner-in-crime forever 🕵️‍♀️",
  "Brains + beauty = You 💖",
  "Walking sunshine ☀️",
  "Champion of comebacks 🏆",
  "Energy level: Unlimited ⚡",
  "You make everything more fun 🎉",
  "Boss lady in the making 💼",
  "Master of acing challenges 🎯",
  "The heartbeat of our family ❤️",
  "Legend in progress 🌟"
];


document.getElementById("complimentBtn").addEventListener("click", () => {
  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
  document.getElementById("compliment").innerText = randomCompliment;
});

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    createTaskElement(task.text, task.category, task.dueDate);
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      category: li.dataset.category,
      dueDate: li.dataset.due
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create task element
function createTaskElement(taskValue, category = "General", dueDate = "") {
  const li = document.createElement("li");
  li.dataset.category = category;
  li.dataset.due = dueDate;

  li.innerHTML = `
    <div>
      <input type="checkbox">
      <span>${taskValue}</span>
      <span class="tag ${category}">${category}</span>
      ${dueDate ? `<small>📅 ${dueDate}</small>` : ""}
    </div>
  `;

  const checkbox = li.querySelector("input");
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      startConfetti();
      showEmojiReaction(li);

      setTimeout(() => {
        li.remove();
        saveTasks();
      }, 600);
    }
  });

  taskList.appendChild(li);
  saveTasks();
}

// Add new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const category = document.getElementById("category").value;
  const dueDate = document.getElementById("dueDate").value;

  const taskValue = taskInput.value.trim();
  if (taskValue === "") return;

  createTaskElement(taskValue, category, dueDate);
  taskInput.value = "";
  document.getElementById("dueDate").value = "";
}

// Daily Reset
function resetTasks() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

// Emoji Reactions 🎉
const emojis = ["🎉", "🌟", "👏", "💖", "🔥", "🌈"];
function showEmojiReaction(li) {
  const emoji = document.createElement("span");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.fontSize = "20px";
  emoji.style.marginLeft = "10px";
  li.appendChild(emoji);
}

// Confetti Effect
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
function startConfetti() {
  confetti = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 10
  }));
  requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "pink";
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    c.y += c.d * 0.2;
    if (c.y > canvas.height) c.y = 0;
  });
  if (confetti.length > 0) requestAnimationFrame(drawConfetti);
}

function stopConfetti() {
  confetti = [];
}

// Load tasks when page opens
window.onload = loadTasks;
