const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
const MAX_RANDOM_IMAGES = 10;
const activeButtonStyle = 'img-filters__button--active';

const filtersContainer = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');

let currentFiler = Filters.DEFAULT;

// Отобразим блок с фильтрами
filtersContainer.classList.remove('img-filters--inactive');

const setFilterClick = (cb) => {
  filtersFormElement.addEventListener('click', (evt) => {
    const newFilter = evt.target.id;
    if (!newFilter || newFilter === currentFiler) {
      return;
    }
    const activeButtonElement = document.querySelector(`.${activeButtonStyle}`);
    activeButtonElement.classList.remove(activeButtonStyle);
    evt.target.classList.add(activeButtonStyle);
    currentFiler = newFilter;
    cb();
  });
};

const sortByDiscussed = (postA, postB) => postB.comments.length - postA.comments.length;

const filterPosts = (posts) => {
  switch(currentFiler) {
    case Filters.DEFAULT:
      return posts;
    case Filters.RANDOM:
      return posts.slice(0).sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_IMAGES);
    case Filters.DISCUSSED:
      return posts.slice(0).sort(sortByDiscussed);
  }
};

export {setFilterClick};
export {filterPosts};
