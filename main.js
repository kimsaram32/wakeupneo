const TARGET_DATE = new Date(2025, 0, 1);
const LINES = [
  'Wake up, Yiche...',
  'The new year has you...',
  'Follow whatever.',
  'Knock, knock, Yiche.'
];
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const container = document.querySelector('.content');
const elements = {
  days: container.querySelector('.days'),
  hours: container.querySelector('.hours'),
  minutes: container.querySelector('.minutes'),
  seconds: container.querySelector('.seconds'),
};


let prevDate = null;

function callback() {
  const currentDate = new Date();

  if (TARGET_DATE - currentDate <= 0) {
    startLines();
    return;
  }

  if (currentDate - prevDate != 0) {
    const data = parseDday(currentDate, TARGET_DATE);
    updateText(data);
  }
  requestAnimationFrame(callback);
}

async function startLines() {
  container.innerHTML = '';
  container.dataset.typing = true;

  for (const line of LINES) {
    await typewrite(line);
    await wait(1000);
  }
}

requestAnimationFrame(callback);

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

function updateText(data) {
  for (const name in elements) {
    elements[name].textContent = data[name];
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

