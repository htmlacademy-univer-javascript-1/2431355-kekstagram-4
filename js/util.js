const DELAY = 500;

const isEscKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);


export { isEscKey, debounce, shuffleArray};
