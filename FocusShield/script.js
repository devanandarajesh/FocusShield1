
let user = {};
let timerRunning = false;
let distractions = 0;

// PAGE SWITCH
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// CREATE PROFILE
function createProfile() {
  user.name = document.getElementById('name').value;
  user.password = document.getElementById('password').value;

  if (!user.name || !user.password) {
    alert("Please enter your name and password");
    return;
  }

  showPage('survey');
}

// SURVEY COMPLETE
function goHome() {
  // RADIO VALUES
  user.studyHours = document.querySelector('input[name="hours"]:checked')?.value;
  user.productiveTime = document.querySelector('input[name="productive"]:checked')?.value;
  user.schedule = document.querySelector('input[name="schedule"]:checked')?.value;
  user.phoneUsage = document.querySelector('input[name="phone"]:checked')?.value;

  // CHECKBOX VALUES
  let selected = document.querySelectorAll('.distraction:checked');
  user.distractionsList = [];
  selected.forEach(el => user.distractionsList.push(el.value));

  document.getElementById('greet').innerText = "Hi, " + user.name + " 👋";

  showPage('home');
}

// TARGETS
function addTarget() {
  let t = prompt("Enter target");
  if (!t) return;

  let div = document.createElement('div');
  div.className = "target";
  div.innerHTML = t + " <button onclick='this.parentElement.remove()'>-</button>";

  document.getElementById('targets').appendChild(div);
}

// SUBJECTS
function addSubject() {
  let input = document.getElementById('newSubject');
  let s = input.value;
  if (!s) return;

  let div = document.createElement('div');
  div.className = "target";
  div.innerHTML = s + " <button onclick='this.parentElement.remove()'>-</button>";

  document.getElementById('subjectList').appendChild(div);
  input.value = "";
}

// TODO
function addTask() {
  let input = document.getElementById('taskInput');
  let t = input.value;
  if (!t) return;

  let div = document.createElement('div');
  div.className = "task";
  div.innerHTML = `<input type='checkbox'> ${t}`;

  document.getElementById('tasks').appendChild(div);
  input.value = "";
}

// TIMER
function startTimer() {
  let minutes = document.getElementById('timeInput').value;
  let time = minutes * 60;

  timerRunning = true;
  distractions = 0;

  let interval = setInterval(() => {
    if (time <= 0) {
      clearInterval(interval);
      alert("Session Complete! Distractions: " + distractions);
      timerRunning = false;
      document.body.classList.remove("blur");
    }

    let min = Math.floor(time / 60);
    let sec = time % 60;
    sec = sec < 10 ? "0" + sec : sec;

    document.getElementById('countdown').innerText = min + ":" + sec;

    time--;
  }, 1000);
}

// DISTRACTION DETECTION
document.addEventListener("visibilitychange", () => {
  if (document.hidden && timerRunning) {
    distractions++;
    alert("⚠ Stay Focused!");
    document.body.classList.add("blur");
  } else {
    document.body.classList.remove("blur");
  }
});