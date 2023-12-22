const RADIX = 10;
const DEFAULT_EFFECT_LEVEL = 100;
const EFFECTS_STEP = 0.01;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;
const SLIDER = {
  MIN: 10,
  MAX: 100,
  STEP: 10,
};

const formUpload = document.querySelector('.img-upload__form');
const sliderElement = formUpload.querySelector('.effect-level__slider');
const sliderUpload = formUpload.querySelector('.img-upload__effect-level');
const currentSlider = formUpload.querySelector('.effect-level__slider');
const filterRadios = formUpload.querySelectorAll('.effects__item');
const picture = formUpload.querySelector('.img-upload__preview img');

let currentRadio = formUpload.querySelector('.effects__radio').value;
currentSlider.value = DEFAULT_EFFECT_LEVEL;

const FILTERS = {
  none: () => {
    sliderUpload.classList.add('visually-hidden');
    return 'none';
  },

  sepia: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `sepia(${parseInt(currentSlider.value, RADIX) * EFFECTS_STEP})`;
  },

  chrome: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `grayscale(${parseInt(currentSlider.value, RADIX) * EFFECTS_STEP})`;
  },
  marvin: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `invert(${Math.floor(currentSlider.value)}%)`;
  },
  phobos: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `blur(${parseInt(currentSlider.value, RADIX) * EFFECTS_STEP * MAX_BLUR_VALUE}px)`;
  },
  heat: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `brightness(${(parseInt(currentSlider.value, RADIX) * EFFECTS_STEP) * MAX_BRIGHTNESS})`;
  },
};

const onNoUiSliderChange = () => {
  currentSlider.value = sliderElement.noUiSlider.get();
  picture.style.filter = FILTERS[currentRadio]();
};

const onRadioChange = (evt) =>{
  currentRadio = evt.currentTarget.querySelector('.effects__radio').value;
  picture.style.filter = FILTERS[currentRadio]();
  sliderElement.noUiSlider.set(SLIDER.MAX);
  currentSlider.value = SLIDER.MAX;
};

const resetFilters = () =>{
  filterRadios.forEach((filter) => {
    filter.removeEventListener('change', onRadioChange);
  });

  picture.style.filter = 'none';
  sliderElement.noUiSlider.off('change', onNoUiSliderChange);
};

const initRadios = () =>{
  sliderElement.noUiSlider.on('change', onNoUiSliderChange);
  sliderUpload.classList.add('visually-hidden');
  filterRadios.forEach((filter) => {
    filter.addEventListener('change', onRadioChange);
  });
  picture.style.filter = 'none';
};

noUiSlider.create(sliderElement, {
  range: {
    min: SLIDER.MIN,
    max: SLIDER.MAX
  },
  start: SLIDER.MAX,
  step: SLIDER.STEP,
  connect: 'lower',
});

export {initRadios,  resetFilters};
