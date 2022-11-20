// Додай бібліотеку SimpleLightbox як залежність проекту, використовуючи npm (посилання на CDN з твоєї минулої роботи більше не потрібне).
// Використовуй свій JavaScript код з попередньої домашньої роботи, але виконай рефакторинг з урахуванням того, що бібліотека була встановлена через npm (синтаксис import/export).

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryList = document.querySelector(".gallery");

//add markup________________________________________
const galleryItem = galleryItems
  .map(
    ({
      preview,
      original,
      description,
    }) => `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`
  )
  .join("");

galleryList.insertAdjacentHTML("afterbegin", `${galleryItem}`);

// simpleLightbox

const lightboxGallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
console.log(galleryItems);