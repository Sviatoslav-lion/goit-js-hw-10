// Вибираємо форму та поля вводу
const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stateRadios = form.querySelectorAll('[name="state"]');

// Обробка події submit форми
form.addEventListener('submit', (event) => {
  event.preventDefault();  // Запобігаємо перезавантаженню сторінки

  // Отримуємо значення затримки та стану з форми
  const delay = parseInt(delayInput.value, 10);
  const state = [...stateRadios].find(radio => radio.checked)?.value;

  // Якщо стан і затримка коректні, створюємо проміс
  if (state && delay > 0) {
    createPromise(state, delay);
  } else {
    // Виводимо помилку, якщо форма заповнена некоректно
    iziToast.error({
        title: 'Error',
        message: 'Please fill in all fields correctly.',
      });
  }
});

// Функція для створення та обробки промісу
function createPromise(state, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);  // Виконуємо проміс успішно
      } else {
        reject(delay);   // Відхиляємо проміс
      }
    }, delay);
  });

  // Обробка виконаного промісу
  promise
  .then((fulfilledDelay) => {
    iziToast.success({
      title: '✅ Fulfilled',
      message: `Fulfilled promise in ${fulfilledDelay}ms`,
    });
  })
  .catch((rejectedDelay) => {
    iziToast.error({
      title: '❌ Rejected',
      message: `Rejected promise in ${rejectedDelay}ms`,
    });
  });
}
