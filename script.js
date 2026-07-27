// =========================
// SCREEN NAVIGATION
// =========================

const screens = [
  ...document.querySelectorAll('.screen')
];


function show(id) {

  screens.forEach(screen => {

    screen.classList.toggle(
      'active',
      screen.id === id
    );

  });

}



// =========================
// STATE
// =========================

const state = {

  date: '',

  activities: [],

  wheel: ''

};



// =========================
// ELEMENTS
// =========================

const roomInput =
  document.getElementById('roomInput');

const enterBtn =
  document.getElementById('enterBtn');

const gateMessage =
  document.getElementById('gateMessage');

const startBtn =
  document.getElementById('startBtn');

const toActivities =
  document.getElementById('toActivities');

const toActivitiesFromMemories =
  document.getElementById(
    'toActivitiesFromMemories'
  );

const dateBtns = [

  ...document.querySelectorAll(
    '.date-btn'
  )

];

const dateResult =
  document.getElementById('dateResult');

const toWheel =
  document.getElementById('toWheel');

const toSummary =
  document.getElementById('toSummary');

const spinBtn =
  document.getElementById('spinBtn');

const wheel =
  document.getElementById('wheel');

const wheelResult =
  document.getElementById('wheelResult');

const summaryText =
  document.getElementById('summaryText');

const telegramLink =
  document.getElementById('telegramLink');



// =========================
// PASSWORD → INTRO
// =========================

function checkRoom() {

  const answer =
    roomInput.value.trim();


  if (answer === '18-153') {

    gateMessage.textContent = '';

    show('intro');

  } else {

    gateMessage.textContent =
      'Nope try again 🤔';


    gateMessage.classList.remove(
      'flicker'
    );


    void gateMessage.offsetWidth;


    gateMessage.classList.add(
      'flicker'
    );

  }

}


enterBtn.addEventListener(
  'click',
  checkRoom
);


roomInput.addEventListener(
  'keydown',
  event => {

    if (
      event.key === 'Enter'
    ) {

      event.preventDefault();

      checkRoom();

    }

  }
);



// =========================
// INTRO → DATE
// =========================

startBtn.addEventListener(
  'click',
  () => {

    show('dateScreen');

  }
);



// =========================
// DATE SELECTION
// =========================

dateBtns.forEach(
  button => {

    button.addEventListener(
      'click',
      () => {

        state.date =
          button.dataset.date;


        dateBtns.forEach(
          dateButton => {

            dateButton.classList.remove(
              'active'
            );

          }
        );


        button.classList.add(
          'active'
        );


        dateResult.textContent =
          `Chosen date: ${state.date}`;


        toActivities.disabled =
          false;

      }
    );

  }
);



// =========================
// DATE → MEMORIES
// =========================

toActivities.addEventListener(
  'click',
  () => {

    show('memoriesScreen');

  }
);



// =========================
// MEMORIES → ACTIVITIES
// =========================

toActivitiesFromMemories.addEventListener(
  'click',
  () => {

    show('activitiesScreen');

  }
);



// =========================
// SURPRISE CARD OPENING
// =========================

const surpriseCards = [

  ...document.querySelectorAll(
    '.surprise-card'
  )

];


surpriseCards.forEach(
  card => {

    card.addEventListener(
      'click',
      event => {


        // Do not close the card
        // when clicking the checkbox

        if (
          event.target.tagName ===
          'INPUT'
        ) {

          return;

        }


        card.classList.toggle(
          'opened'
        );

      }
    );

  }
);



// =========================
// ACTIVITIES → WHEEL
// =========================

toWheel.addEventListener(
  'click',
  () => {


    state.activities = [

      ...document.querySelectorAll(
        '.activity-reveal input:checked'
      )

    ].map(
      input => input.value
    );


    if (
      state.activities.length === 0
    ) {

      alert(
        'Please choose at least one activity first.'
      );

      return;

    }


    show('wheelScreen');

  }
);



// =========================
// SPIN THE WHEEL
// =========================

spinBtn.addEventListener(
  'click',
  () => {


    if (
      state.activities.length === 0
    ) {

      return;

    }


    wheel.classList.remove(
      'spin'
    );


    void wheel.offsetWidth;


    wheel.classList.add(
      'spin'
    );


    spinBtn.disabled =
      true;


    setTimeout(
      () => {


        const randomIndex =
          Math.floor(

            Math.random() *
            state.activities.length

          );


        state.wheel =
          state.activities[
            randomIndex
          ];


        wheelResult.textContent =
          `Wheel picked: ${state.wheel}`;


        toSummary.disabled =
          false;


        spinBtn.disabled =
          false;


      },
      3000
    );

  }
);



// =========================
// WHEEL → SUMMARY
// =========================

toSummary.addEventListener(
  'click',
  () => {


    const text =
`Birthday plan:
Date: ${state.date || 'Not chosen'}
Shortlist: ${state.activities.join(', ') || 'None'}
Wheel pick: ${state.wheel || 'Not spun yet'}`;


    summaryText.textContent =
      text.replaceAll(
        '\n',
        ' • '
      );


    const telegramText =
      encodeURIComponent(
        text
      );


    const pageUrl =
      encodeURIComponent(
        window.location.href
      );


    telegramLink.href =
      `https://t.me/share/url?url=${pageUrl}&text=${telegramText}`;


    show('summaryScreen');

  }
);
