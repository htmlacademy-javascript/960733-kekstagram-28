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

const TOTAL_POSTS = 25;

const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const getId = () => {
  let id = 0;

  return () => {
    id += 1;
    return id;
  };
};

const postsId = getId();
const commentId = getId();

const createComments = () => {
  const comments = [];
  for (let i = 1; i < 6; i++) {
    const comment = {
      id: commentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
      name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    };
    comments.push(comment);
  }
  return comments;
};

const createPost = () => {
  const recordId = postsId();
  return {
    id: recordId,
    url: `photos/${recordId}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: createComments()
  };
};

const keksogramPosts = Array.from({length: TOTAL_POSTS}, createPost);
export {keksogramPosts};