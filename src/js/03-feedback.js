// HTML містить розмітку форми.Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';
//отримуємо і читаємо значення ключа
let storage = load(storageKey);
//об'єкт значень з форми
let formData = {};

form.addEventListener('input', throttle(onInputClick, 500));
form.addEventListener('submit', onSubmitClick);

function onInputClick(event) {
  //отримуємо данні
  formData[event.target.name] = event.target.value;
  //записуємо данні у сховище
  save(storageKey, formData);
}

function onSubmitClick(event) {
  //відміняємо перезагрузку
  event.preventDefault();
  //присвоюємо елементи події
  const {
    elements: { email, message },
  } = event.currentTarget;
  //перевіряємо заповненість форми
  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля форми');
  }
  //Виводимо в консоль об'єкт
  console.log({ Email: email.value, Message: message.value });
  event.currentTarget.reset();
  remove(storageKey);
}

function localStorage(data) {
  if (data) {
    email.value = data.email;
    message.value = data.message;
  }
}
localStorage();

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
//  у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
