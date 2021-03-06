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

const imagesListRef = document.querySelector('ul.js-gallery');
const modalRef = document.querySelector('div.lightbox');
const modalOverlay = document.querySelector('div.lightbox__overlay');
const modalImgRef = document.querySelector('.lightbox__image');
const closeModal = document.querySelector('button[data-action="close-lightbox"]');

function createImgCard(images) {
  return images
  .reduce((acc, {preview, original, description}) => {
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
  }

const imagesMarkup = createImgCard(images);
imagesListRef.insertAdjacentHTML('beforeend', imagesMarkup);
imagesListRef.addEventListener('click', onImgContainerClick);
closeModal.addEventListener('click', onCloseBtnClick);
modalOverlay.addEventListener('click', onBackdropClick);


function onImgContainerClick(event) { 
  event.preventDefault(); 
//  if (event.target.localName === 'img') {   
//     return;
if (event.target.nodeName !== "IMG") { 
     return;
 }

 addIsOpenImgClass(modalRef);

modalImgRef.src = event.target.dataset.source;
 modalImgRef.alt = event.target.alt;

 window.addEventListener("keydown", onEscKeyPress);
 window.addEventListener("keydown", onRightKeyPress);
 window.addEventListener("keydown", onLeftKeyPress);
}

function onCloseBtnClick(event) { 
  
  modalRef.classList.remove('is-open');
  modalImgRef.src = '';
  modalImgRef.alt = '';
  
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", onRightKeyPress);
  window.removeEventListener("keydown", onLeftKeyPress);
}

function onBackdropClick(event) { 
  if (event.target === event.currentTarget) {
      onCloseBtnClick();
    }
  }
  function addIsOpenImgClass(image) { 
    image.classList.add('is-open');
    
  }
  
  function onEscKeyPress(event) { 
    if (event.code === "Escape") {
   onCloseBtnClick();
  }
  }

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


function onRightKeyPress(event)  {
  currentImg = imgArray.indexOf(modalImgRef.src);
  currentAlt = altArray.indexOf(modalImgRef.alt);

  if (event.code === 'ArrowRight') {
    if (currentImg === imgArray.length - 1) {
    currentImg = 0
  } else { currentImg += 1 }
      modalImgRef.src = imgArray[currentImg];
  
      if (currentAlt === altArray.length - 1) {
    currentAlt = 0
  } else { currentAlt += 1}
        modalImgRef.alt = altArray[currentAlt];
      }
    
};

function onLeftKeyPress(event) {
  if (event.code === 'ArrowLeft') {
    if (currentImg === -1) {
      currentImg = currentImg + imgArray.length
    } else {currentImg -= 1 }
    modalImgRef.src = imgArray[currentImg];

    if (currentAlt === -1) {
      currentAlt = currentAlt + altArray.length
    } else {currentAlt -= 1 }
      modalImgRef.alt = altArray[currentAlt];
  }
};

