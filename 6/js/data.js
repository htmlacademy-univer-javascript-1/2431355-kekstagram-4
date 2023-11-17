import {getRandomInt} from './util.js';
const DESCRIPTONS = [
  'Сегодня',
  'Пусковая установка',
  'Ладно',
  'Сна не бывает',
  'Ставим танец',
  'Очередной экзамен позади',
  'Ура',
  'Победа',
  'Красиво!',
  'Как ощущения?',
  'В следующий раз повезет!',
  'Ты легенда',
  'Все впереди!',
  'Больно было?',
  'Ну, получилось нормально',
  'Мило',
  'Сойдёт',
];
const NAMES = [
  'Иван',
  'Мария',
  'Михаил',
  'Арина',
  'Алина',
  'Георгий',
  'Денис',
];

const LIKES = {
  MIN: 15,
  MAX: 200,
};

const COMMENTS_COUNT = {
  MIN: 0,
  MAX: 30,
};

const ID = {
  MIN: 1,
  MAX: 1000,
};
const COUNT_PHOTOS = 25;


const TEXT = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const photos = [];

const addComment = () => {
  const comment = {
    id: getRandomInt(ID.MIN, ID.MAX),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    name: NAMES[getRandomInt(0, NAMES.length - 1)],
    message: TEXT[getRandomInt(0, TEXT.length - 1)],
  };
  return comment;
};

const addComments = () => {
  const comments = [];
  for (let i = 0; i <= getRandomInt(COMMENTS_COUNT.MIN, COMMENTS_COUNT.MAX); i++){
    comments.push(addComment());
  }
  return comments;
};

const addPhoto = (index) => {
  const photo = {
    id: index,
    url: `photos/${index}.jpg`,
    description: DESCRIPTONS[getRandomInt(0, DESCRIPTONS.length - 1)],
    likes: getRandomInt(LIKES.MIN, LIKES.MAX),
    comments: addComments(),
  };
  return photo;
};

const addPhotos = () => {
  for (let i = 1; i < COUNT_PHOTOS + 1; i++) {
    photos.push(addPhoto(i));
  }
  return photos;
};
addPhotos();
export {photos};
