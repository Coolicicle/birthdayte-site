const screens = [...document.querySelectorAll('.screen')];

function show(id) {
  screens.forEach(s => s.classList.toggle('active', s.id === id));
}

const state = {
  date: '',
  activities: [],
  wheel: ''
};

const roomInput = document.getElementById('roomInput');
const enterBtn = document.getElementById('enterBtn');
const gateMessage = document.getElementById('gateMessage');

const startBtn = document.getElementById('startBtn');
const dateBtns = [...document.querySelectorAll('.date-btn')];
const dateResult = document.getElementById('dateResult');
const toActivities = document.getElementById('toActivities');
const toWheel = document.getElementById('toWheel');
const toSummary = document.getElementById('toSummary');
const spinBtn = document.getElementById('spinBtn');
const wheel = document.getElementById('wheel');
const wheelResult = document.getElementById('wheelResult');
const summaryText = document.getElementById('summaryText');
const telegramLink = document.getElementById('telegramLink');

function checkRoom() {
  const answer = roomInput.value.trim();

  if (answer === '18-153') {
    gateMessage.textContent = '';
    show('intro');
  } else {
    gateMessage.textContent = 'Nope try again 🤔';

    gateMessage.classList.remove('flicker');
    void gateMessage.offsetWidth;
    gateMessage.classList.add('flicker');
  }
}

enterBtn.addEventListener('click', checkRoom);

roomInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    checkRoom();
  }
});

startBtn.addEventListener('click', () => show('dateScreen'));

dateBtns.forEach(btn => btn.addEventListener('click', () => {
  state.date = btn.dataset.date;
  dateBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  dateResult.textContent = `Chosen date: ${state.date}`;
  toActivities.disabled = false;
}));

toActivities.addEventListener('click', () => show('activitiesScreen'));

toWheel.addEventListener('click', () => {
  state.activities = [...document.querySelectorAll('.checks input:checked')].map(i => i.value);

  if (!state.activities.length) {
    alert('Please choose at least one activity first.');
    return;
  }

  show('wheelScreen');
});

spinBtn.addEventListener('click', () => {
  if (!state.activities.length) return;

  wheel.classList.remove('spin');
  void wheel.offsetWidth;
  wheel.classList.add('spin');

  spinBtn.disabled = true;

  setTimeout(() => {
    state.wheel = state.activities[Math.floor(Math.random() * state.activities.length)];
    wheelResult.textContent = `Wheel picked: ${state.wheel}`;
    toSummary.disabled = false;
    spinBtn.disabled = false;
  }, 3000);
});

toSummary.addEventListener('click', () => {
  const text = `Birthday plan:
Date: ${state.date || 'Not chosen'}
Shortlist: ${state.activities.join(', ') || 'None'}
Wheel pick: ${state.wheel || 'Not spun yet'}`;

  summaryText.textContent = text.replaceAll('\n', ' • ');

  const telegramText = encodeURIComponent(text);
  const telegramUrl = encodeURIComponent(window.location.href);
  telegramLink.href = `https://t.me/share/url?url=${telegramUrl}&text=${telegramText}`;

  show('summaryScreen');
});

document.querySelectorAll(".surprise-card").forEach(card => {
  card.addEventListener("click", (event) => {
    // Don't open/close the card when clicking the checkbox
    if (event.target.tagName === "INPUT") return;

    card.classList.toggle("opened");
  });
});
