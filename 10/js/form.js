import { isEscKey } from './util.js';

const body = document.querySelector('body');
const formUpload = body.querySelector('.img-upload__form');
const fileUpload = formUpload.querySelector('.img-upload__input');
const uploadOverlay = body.querySelector('.img-upload__overlay');
const closeButton = body.querySelector('#upload-cancel');
const effects = document.querySelectorAll('.effects__preview');
const mainPicture = document.querySelector('.img-upload__preview img');

fileUpload.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  changeImages();

  closeButton.addEventListener('click', onCloseFormClick);
  document.addEventListener('keydown', onCloseFormEscDown);

});

const closeForm =  () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  closeButton.removeEventListener('click', onCloseFormClick);
  document.removeEventListener('keydown', onCloseFormEscDown);

  formUpload.reset();
};

function onCloseFormClick (evt) {
  evt.preventDefault();
  closeForm();
}

function onCloseFormEscDown (evt) {
  if(isEscKey(evt) &&
  !evt.target.classList.contains('text__hashtag') &&
  !evt.target.classList.contains('text__description'))
  {
    evt.preventDefault();
    closeForm();
  }
}
const changeImages = () => {
  const file = fileUpload.files[0];
  const fileUrl = URL.createObjectURL(file);

  mainPicture.src = fileUrl;

  effects.forEach((effect) => {
    effect.style.backgroundImage = `url('${fileUrl}')`;
  });
};



