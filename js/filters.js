const MAX_RANDOM_IMAGES = 10;
const ACTIVE_BUTTON_STYLE = 'img-filters__button--active';
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');

let currentFiler = Filters.DEFAULT;
filtersContainer.classList.remove('img-filters--inactive');

const setFilterClick = (cb) => {
  filtersFormElement.addEventListener('click', (evt) => {
    const newFilter = evt.target.id;
    if (!newFilter || newFilter === currentFiler) {
      return;
    }
    const activeButtonElement = document.querySelector(`.${ACTIVE_BUTTON_STYLE}`);
    activeButtonElement.classList.remove(ACTIVE_BUTTON_STYLE);
    evt.target.classList.add(ACTIVE_BUTTON_STYLE);
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
