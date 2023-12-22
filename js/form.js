import { isEscKey } from './util.js';
import { pristine } from './validate-form.js';
import { initRadios, resetFilters } from './effects.js';
import { sendData } from './api.js';
import { onSuccess, onError } from './form-submit.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const formUpload = document.querySelector('.img-upload__form');
const fileUpload = formUpload.querySelector('#upload-file');
const mainPicture = formUpload.querySelector('.img-upload__preview img');
const uploadOverlay = formUpload.querySelector('.img-upload__overlay');
const closeButton = formUpload.querySelector('#upload-cancel');
const imagePreview = formUpload.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__preview');
const plusButton = document.querySelector('.scale__control--bigger');
const minusButton = document.querySelector('.scale__control--smaller');
const scaleControl = document.querySelector('.scale__control--value');

const Zoom = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const onFormUploadSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(onSuccess, onError, 'POST', formData);
};

const openForm = () => {
  closeButton.addEventListener('click', onCloseFormClick);
  document.addEventListener('keydown', onCloseFormEscDown);
  fileUpload.addEventListener('change', onFileUploadChange);
  scaleControl.value = '100%';
  formUpload.addEventListener('submit', onFormUploadSubmit);
};

const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControl.value, 10) + (Zoom.STEP * factor);
  if (size < Zoom.MIN){
    size = Zoom.MIN;
    return;
  }
  if (size > Zoom.MAX){
    size = Zoom.MAX;
    return;
  }
  scaleControl.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
};

const onMinusButtonClick = () => {
  changeZoom(-1);
};

const onPlusButtonClick = () => {
  changeZoom(1);
};

const initButtons = () => {

  minusButton.addEventListener('click', onMinusButtonClick);
  plusButton.addEventListener('click', onPlusButtonClick);
};

const removeEvents = () => {
  closeButton.removeEventListener('click', onCloseFormClick);
  document.removeEventListener('keydown', onCloseFormEscDown);
  formUpload.removeEventListener('submit', onFormUploadSubmit);

  minusButton.removeEventListener('click', onMinusButtonClick);
  plusButton.removeEventListener('click', onPlusButtonClick);

};

const closeForm =  () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  removeEvents();

  formUpload.reset();
  pristine.reset();
  scaleControl.value = '100%';
  imagePreview.style.transform = 'scale(100%)';

  resetFilters();
};

function onCloseFormClick (evt) {
  evt.preventDefault();
  closeForm();
}

function onCloseFormEscDown (evt) {
  if(isEscKey(evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description') &&
  !body.querySelector('.error'))
  {
    evt.preventDefault();
    closeForm();
  }
}

const changeImages = () => {
  const file = fileUpload.files[0];
  const fileName = file.name.toLowerCase();

  if(FILE_TYPES.some((it) => fileName.endsWith(it))){
    mainPicture.src = URL.createObjectURL(file);

    effects.forEach((effect) => {
      effect.style.backgroundImage = `url('${mainPicture.src}')`;
    });
  }
};

function onFileUploadChange () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  openForm();
  changeImages();
  initButtons();
  initRadios();
}

export {openForm, closeForm};
