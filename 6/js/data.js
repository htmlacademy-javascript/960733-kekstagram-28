import {getRandomInteger} from './util.js';

const NAMES = [
  'Роман',
  'Елизавета',
  'Олег',
  'Петр',
  'Иван',
  'Семен',
  'Елена'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Новая фотография',
  'Я отдыхаю',
  'Такое вот селфи',
  'На рыбалке',
  'Просто сплю'
];

const TOTAL_POST_COMMENTS = 6;
const TOTAL_POSTS = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const getId = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

const postsId = getId();
const commentId = getId();

const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(1, TOTAL_POST_COMMENTS)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPost = () => {
  const recordId = postsId();
  return {
    id: recordId,
    url: `photos/${recordId}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: Array.from({length: TOTAL_POST_COMMENTS}, createComment)
  };
};

const createPosts = () => Array.from({length: TOTAL_POSTS}, createPost);

export {createPosts};
