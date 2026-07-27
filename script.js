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

  vibe: ''

};



// =========================
// ELEMENTS
// =========================


// PASSWORD

const roomInput =
  document.getElementById('roomInput');

const enterBtn =
  document.getElementById('enterBtn');

const gateMessage =
  document.getElementById('gateMessage');


// NAVIGATION

const startBtn =
  document.getElementById('startBtn');

const toMemories =
  document.getElementById('toMemories');

const toVibe =
  document.getElementById('toVibe');


// DATE

const dateBtns = [

  ...document.querySelectorAll(
    '.date-btn'
  )

];

const dateResult =
  document.getElementById('dateResult');


// VIBE OPTIONS

const homeOption =
  document.getElementById('homeOption');

const dayOutOption =
  document.getElementById('dayOutOption');


// ACTIVITIES

const homeToSummary =
  document.getElementById('homeToSummary');

const dayOutToSummary =
  document.getElementById('dayOutToSummary');


// SUMMARY

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


  if (
    answer === '18-153'
  ) {

    gateMessage.textContent = '';

    show('intro');

  }

  else {

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


        toMemories.disabled =
          false;

      }
    );

  }
);



// =========================
// DATE → MEMORIES
// =========================

toMemories.addEventListener(
  'click',
  () => {

    show('memoriesScreen');

  }
);



// =========================
// MEMORIES → VIBE CHOICE
// =========================

toVibe.addEventListener(
  'click',
  () => {

    show('vibeScreen');

  }
);



// =========================
// VIBE → HOME ACTIVITIES
// =========================

homeOption.addEventListener(
  'click',
  () => {

    state.vibe =
      'Pookies chill at home';


    show(
      'homeActivitiesScreen'
    );

  }
);



// =========================
// VIBE → DAY OUT ACTIVITIES
// =========================

dayOutOption.addEventListener(
  'click',
  () => {

    state.vibe =
      'Pookies day out';


    show(
      'dayOutActivitiesScreen'
    );

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


        // Clicking the checkbox itself
        // should not close the card

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
// COLLECT ACTIVITIES
// =========================

function getSelectedActivities() {


  state.activities = [

    ...document.querySelectorAll(
      '.activity-reveal input:checked'
    )

  ].map(
    input => input.value
  );


}



// =========================
// ACTIVITIES → SUMMARY
// =========================

function goToSummary() {


  getSelectedActivities();


  if (
    state.activities.length === 0
  ) {

    alert(
      'Please choose at least one activity first.'
    );


    return;

  }


  const text =
`Birthday plan:

Date: ${state.date || 'Not chosen'}

Birthday-te vibe: ${state.vibe || 'Not chosen'}

Activities:
${state.activities.join(', ')}`;


  summaryText.innerHTML =
    text.replace(
      /\n/g,
      '<br>'
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


  show(
    'summaryScreen'
  );

}



// HOME ACTIVITIES → SUMMARY

homeToSummary.addEventListener(
  'click',
  goToSummary
);



// DAY OUT ACTIVITIES → SUMMARY

dayOutToSummary.addEventListener(
  'click',
  goToSummary
);
