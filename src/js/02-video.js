// HTML містить <iframe> з відео для Vimeo плеєра. Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і, 
// після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// import { save, load, remove } from './storage';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
//При натисканні на програвання відео, записуємо у сховище секунду
const onPlay = function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
}
//при програванні відео оновлюємо час кожні 1000мс
player.on('timeupdate', throttle(onPlay, 1000));
//якщо з самого початку сховище не містить данних про останню секунду, то встановлюємо час у сховище
if (localStorage.getItem('videoplayer-current-time') !== null) {
      player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}

//Спрацює як тільки почнеться відео
// player.on('play', function () {
//   console.log('played the video!');
// });

//Побачимо титулку відео
// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

//setCurrentTime метод
//setCurrentTime(seconds: number): Promise<number, (RangeError|Error)>

//player.setCurrentTime(30.456).then(function(seconds) {
// seconds = the actual time that the player seeked to
// }).catch(function(error) {
//     switch (error.name) {
//         case 'RangeError':
//             // the time was less than 0 or greater than the video’s duration
//             break;

//         default:
//             // some other error occurred
//             break;
//     }
// });

// Ознайомся з документацією бібліотеки Vimeo плеєра.
// Додай бібліотеку як залежність проекту через npm.
// Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
// Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
// Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
// Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
// Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.