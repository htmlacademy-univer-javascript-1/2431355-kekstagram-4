const DELAY = 500;
const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);


export {getRandomInt, isEscKey, debounce, shuffleArray};
