// Task 1

// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне. 
// Превью результата посмотри по ссылке.
// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, 
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Стартовые файлы
// В папке src ты найдешь стартовые файлы проекта с базовой разметкой и готовыми стилями.
// В файле gallery-items.js есть массив объектов содержащих информацию о изображениях: маленькое изображение, оригинальное и описание.

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).

// Дополнительно
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
import images from './gallery-items.js';

const bodyRef = document.querySelector('body')
const imagesListRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalOverlay = document.querySelector('.lightbox__overlay');
const modalImgRef = document.querySelector('.lightbox__image');
const closeModal = document.querySelector('.lightbox__button');

let currentImg = 0;
let currentAlt = 0;

const imgArray = images.reduce((acc, { original }) => {
  acc.push(original);
  return acc;
}, []);

const altArray = images.reduce((acc, { description }) => {
  acc.push(description);
  return acc;
}, []);

const imagesMarkup = images.reduce(
  (acc, {preview, original, description}) => {
    return (
      acc +
      `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    );
  },
  '',
);

imagesListRef.insertAdjacentHTML('afterbegin', imagesMarkup);

imagesListRef.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.localName === 'img') {
    addImgModal();
    currentImg = imgArray.indexOf(modalImgRef.src);
    currentAlt = altArray.indexOf(modalImgRef.alt);
  }
});

closeModal.addEventListener('click', () => {
  removeImgModal();
});

modalOverlay.addEventListener('click', event => {
  if (event.target.localName === 'img') {
    return;
  }
  removeImgModal();
});

window.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    removeImgModal();
  }
});

function removeImgModal() {
  bodyRef.classList.remove('is-open')
  modalRef.classList.remove('is-open');
  modalImgRef.src = '';
  modalImgRef.alt = '';
}

function addImgModal() {
  bodyRef.classList.add('is-open')
  modalRef.classList.add('is-open');
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;
}

window.addEventListener('keyup', event => {
  if (event.key === 'ArrowRight') {
    modalImgRef.src =
      imgArray[
        currentImg === imgArray.length ? (currentImg = 0) : currentImg++
      ];
    modalImgRef.alt =
      altArray[
        currentAlt === altArray.length ? (currentAlt = 0) : currentAlt++
      ];
  }
});

window.addEventListener('keyup', event => {
  if (event.key === 'ArrowLeft') {
    modalImgRef.src =
      imgArray[
        currentImg === -1
          ? (currentImg = currentImg + imgArray.length)
          : currentImg--
      ];
    modalImgRef.alt =
      altArray[
        currentAlt === -1
          ? (currentAlt = currentAlt + altArray.length)
          : currentAlt--
      ];
  }
});