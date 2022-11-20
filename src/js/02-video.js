import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

// {/* <iframe
//   id="vimeo-player"
//   src="https://player.vimeo.com/video/236203659"
//   width="640"
//   height="360"
//   frameborder="0"
//   allowfullscreen
//   allow="autoplay; encrypted-media"
// ></iframe>; */}

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const storageKey = 'videoplayer-current-time';
//
let currentTime = load(storageKey);

//Спрацює як тільки почнеться відео
player.on('play', function () {
  console.log('played the video!');
});

//Спрацює у визначений час (Current time за допомогою події timeupdate)
//Зберігаємо у сховище
const onPlay = function (data) {
    save(storageKey, data.seconds);
    return;
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(currentTime).catch(function (error) {
    save(storageKey, '0');
    return;
})

//Побачимо титулку відео
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

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
