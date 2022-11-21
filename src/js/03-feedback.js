// HTML містить розмітку форми.Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
//key can be as const
// const storageKey = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onInputForm, 500));
refs.form.addEventListener('submit', onSubmitForm);
fromLocalStorage();


let formData = {};

function onInputForm(event) {
  //отримуємо данні
  formData[event.target.name] = event.target.value;
  //записуємо данні у сховище
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitForm(event) {
  //відміняємо перезагрузку
  event.preventDefault();
 
  //перевіряємо заповненість форми
  if (refs.input.value === '' || refs.textarea.value === '') {
    return alert('Заповніть всі поля форми');
  }
  //Виводимо в консоль об'єкт
  console.log({ Email: refs.input.value, Message: refs.textarea.value });
  //очищуємо поля форми
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function fromLocalStorage() {
  //дістаємо зі сховища попередні данні форми
  const savedFormData = localStorage.getItem('feedback-form-state');
  //якщо у сховищі є збережені данні, то розпаковуємо їх і виводимо у форму
  if (savedFormData) {
    const data = JSON.parse(savedFormData);
    if (data.email) {
      refs.input.value = data.email;
    }
    if (data.message) {
      refs.textarea.value = data.message;
    }
  }
}

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
//  у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
