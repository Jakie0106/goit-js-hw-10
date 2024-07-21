import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputField = document.querySelector('input[name=delay]');

function handleSubmit(event) {
  event.preventDefault();

  const inputState = document.querySelector(
    "input[name='state']:checked"
  ).value;
  const delay = Number(inputField.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputState === 'fulfilled') {
        resolve(delay);
      } else if (inputState === 'rejected') {
        reject(delay);
      }
    }, delay);
  })
    .then(value =>
      iziToast.success({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'green',
        message: `✅ Fulfilled promise in ${value}ms`,
      })
    )
    .catch(value =>
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: `❌ Rejected promise in ${value}ms`,
      })
    );
}

form.addEventListener('submit', handleSubmit);
