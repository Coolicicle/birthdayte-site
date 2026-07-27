const screens = [...document.querySelectorAll(".screen")];
const show = id => screens.forEach(s => s.classList.toggle("active", s.id === id));

const state = { date: "", activities: [], wheel: "" };

const roomInput = document.getElementById("roomInput");
const enterBtn = document.getElementById("enterBtn");
const gateMessage = document.getElementById("gateMessage");

const startBtn = document.getElementById("startBtn");
const dateBtns = [...document.querySelectorAll(".date-btn")];
const dateResult = document.getElementById("dateResult");
const toMemories = document.getElementById("toMemories");
const toVibe = document.getElementById("toVibe");
const homeOption = document.getElementById("homeOption");
const dayOutOption = document.getElementById("dayOutOption");
const homeToSummary = document.getElementById("homeToSummary");
const dayOutToSummary = document.getElementById("dayOutToSummary");
const summaryText = document.getElementById("summaryText");
const telegramLink = document.getElementById("telegramLink");
const cards = [...document.querySelectorAll(".surprise-card")];

const ROOM_ANSWER = "18-153";

function checkRoom() {
  if (roomInput.value.trim() === ROOM_ANSWER) {
    gateMessage.textContent = "";
    show("intro");
  } else {
    gateMessage.textContent = "Wrong answer. Try again.";
    roomInput.classList.remove("flicker");
    void roomInput.offsetWidth;
    roomInput.classList.add("flicker");
  }
}

function updateSummary() {
  const text = `Date: ${state.date || "Not chosen"}
Activities: ${state.activities.join(", ") || "None"}`;

  summaryText.textContent = text;
}

  const telegramText = encodeURIComponent(text);
  const telegramUrl = encodeURIComponent(window.location.href);
  telegramLink.href = `https://t.me/share/url?url=${telegramUrl}&text=${telegramText}`;

  show("summaryScreen");
}

enterBtn.addEventListener("click", checkRoom);

roomInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkRoom();
  }
});

startBtn.addEventListener("click", () => show("dateScreen"));

dateBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    state.date = btn.dataset.date;
    dateBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    dateResult.textContent = `Chosen date: ${state.date}`;
    toMemories.disabled = false;
  });
});

toMemories.addEventListener("click", () => show("memoriesScreen"));
toVibe.addEventListener("click", () => show("vibeScreen"));

homeOption.addEventListener("click", () => show("homeActivitiesScreen"));
dayOutOption.addEventListener("click", () => show("dayOutActivitiesScreen"));

cards.forEach(card => {
  card.addEventListener("click", e => {
    if (e.target.type === "checkbox") return;
    card.classList.toggle("opened");
  });
});

homeToSummary.addEventListener("click", () => {
  state.activities = [...document.querySelectorAll("#homeActivitiesScreen input:checked")].map(
    i => i.value
  );
  updateSummary();
});

dayOutToSummary.addEventListener("click", () => {
  state.activities = [...document.querySelectorAll("#dayOutActivitiesScreen input:checked")].map(
    i => i.value
  );
  updateSummary();
});

function goBackToVibe() {
  show("vibeScreen");
}

window.goBackToVibe = goBackToVibe;
