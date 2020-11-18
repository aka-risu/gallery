import "./gallery-items.js"
import galleryItems from "./gallery-items.js";
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img,
// и указываться в href ссылки(это необходимо для доступности).


const ref = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  galleryImage: document.querySelector('.gallery__image'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxButton: document.querySelector('.lightbox__button'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxLeftArrow: document.querySelector('.lightbox__left'),
  lightboxRightArrow: document.querySelector('.lightbox__right')
}
// let imgIndex = 0
const listLi = galleryItems.map(({preview, original, description}, index) => {
const img = document.createElement("img")
 
img.setAttribute('class', 'gallery__image');
img.setAttribute('src', preview);
img.setAttribute('data-source', original);
img.setAttribute('alt', description);
img.setAttribute('data-index', index);
const link = document.createElement("a");
link.setAttribute('class', 'gallery__link');
link.setAttribute('href', original);
const li = document.createElement("li")
li.setAttribute('class', 'gallery__item');

link.appendChild(img)
  li.appendChild(link)
    return li
})  

ref.gallery.append(...listLi)
ref.gallery.addEventListener('click', openBigImage)
function openBigImage (event) {
  event.preventDefault()
  if (event.target.nodeName !== 'IMG') {
    return
  } 
  const bigImgLink = event.target.dataset.source
  ref.lightboxImage.src = bigImgLink
  ref.lightboxImage.setAttribute('data-index', event.target.dataset.index);
  ref.lightbox.classList.add('is-open')

}
ref.lightboxButton.addEventListener('click', closeModal)
ref.lightboxOverlay.addEventListener('click', closeModal)
function closeModal() {
    ref.lightbox.classList.remove('is-open')
ref.lightboxImage.src = ""
}
ref.lightboxOverlay.addEventListener('click', closeModal)
ref.lightboxLeftArrow.addEventListener('click', showPreviousImg)
ref.lightboxRightArrow.addEventListener('click', showNextImg)

function showPreviousImg() {
  if (parseInt(ref.lightboxImage.dataset.index) === 0) {
    closeModal();
    return
  }
  const index = parseInt(ref.lightboxImage.dataset.index) - 1
  replaceImg(index)
}
function showNextImg() {
  if (parseInt(ref.lightboxImage.dataset.index) === ref.gallery.children.length-1) {
    closeModal();
    return
  }
  const index = 1 + parseInt(ref.lightboxImage.dataset.index)
 replaceImg(index)
}
function replaceImg(index) {
  const attribute = `img[data-index="${index}"]`
  const nextImg = ref.gallery.querySelector(attribute)
  ref.lightboxImage.src = nextImg.dataset.source
  ref.lightboxImage.dataset.index = index
}
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    showPreviousImg()
  }
})
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    showNextImg()
  }
})
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal()
  }
})