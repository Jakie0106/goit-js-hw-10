import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const secondsCounter = document.querySelector('span.value[data-seconds]');
const minutesCounter = document.querySelector('span.value[data-minutes]');
const hoursCounter = document.querySelector('span.value[data-hours]');
const daysCounter = document.querySelector('span.value[data-days]');

let selectedUserDate;
startBtn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedUserDate = selectedDates[0];
    if (selectedUserDate.getTime() < Date.now()) {
      startBtn.disabled = true;
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'orange',
        message: 'Please choose a date in the future',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

function updateTimerElements({ days, hours, minutes, seconds }) {
  secondsCounter.textContent = String(seconds).padStart(2, '0');
  minutesCounter.textContent = String(minutes).padStart(2, '0');
  hoursCounter.textContent = String(hours).padStart(2, '0');
  daysCounter.textContent = String(days).padStart(2, '0');
}

function handleButtonClick(event) {
  inputDate.disabled = true;
  startBtn.disabled = true;

  const intervalCount = setInterval(() => {
    let dateDiff = selectedUserDate - Date.now();
    if (dateDiff <= 0) {
      inputDate.disabled = false;
      clearInterval(intervalCount);
      updateTimerElements({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const timeLeft = convertMs(dateDiff);

    updateTimerElements(timeLeft);
  }, 1000);
}

startBtn.addEventListener('click', handleButtonClick);
