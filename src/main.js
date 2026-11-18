// ГОЛОВНА СТОРІНКА
if (document.querySelector('.search__list') && !document.querySelector('#favorites-list')) {
  import('./js/header.js');
  import('./js/hero.js');
  import('./js/menu.js');
  import('./js/search.js');
  import('./js/notfound.js');
}

// СТОРІНКА ОБРАНОГО
if (document.querySelector('#favorites-list')) {
  import('./js/header.js');
  import('./js/fav.js');
}

// СТОРІНКА ДЕТАЛЕЙ
if (document.querySelector('.details__box')) {
  import('./js/header.js');
  import('./js/details.js');
}
