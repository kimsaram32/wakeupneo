const wait = (ms) => new Promise((res) => setTimeout(res, ms));

let targetDate
let lines

const container = document.querySelector('.content');

start();

function start() {
  container.hidden = false;

  const searchParams = new URL(location.href).searchParams;

  const timestamp = Date.parse(searchParams.get('date'));
  if (Number.isNaN(timestamp)) {
    container.replaceChildren('error: invalid date');
    return;
  }
  targetDate = new Date(timestamp);

  const encodedText = searchParams.get('message')
  if (!encodedText) {
    container.replaceChildren('error: no message');
    return;
  }
  lines = atob(encodedText).split('\n');

  requestAnimationFrame(frameCallback);
}

let prevDate = null;

function frameCallback() {
  const currentDate = new Date();

  if (targetDate - currentDate <= 0) {
    displayLines();
    return;
  }

  if (currentDate - prevDate != 0) {
    const ddayData = parseDday(currentDate, targetDate);
    updateText(ddayData);
  }
  requestAnimationFrame(frameCallback);
}

function parseDday(from, to) {
  const diffMs = to - from;

  if (diffMs <= 0) {
    return null;
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

const elements = {
  days: container.querySelector('.days'),
  hours: container.querySelector('.hours'),
  minutes: container.querySelector('.minutes'),
  seconds: container.querySelector('.seconds'),
};

function updateText(ddayData) {
  for (const name in elements) {
    elements[name].textContent = ddayData[name];
  }
}

async function displayLines() {
  container.innerHTML = '';
  container.dataset.typing = true;

  for (const line of lines) {
    await typewrite(line);
    await wait(1000);
  }
}

async function typewrite(text) {
  container.textContent = '';

  for (const char of text.split('')) {
    container.textContent += char;
    if (char != ' ') {
      await wait(130);
    }
  }
}
