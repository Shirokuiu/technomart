var mainNavToggle = document.querySelector('.main-nav__toggle');
var mainNavList = document.querySelector('.main-nav__list');

mainNavToggle.addEventListener('click', function() {
  mainNavToggle.classList.toggle('main-nav__toggle--open');
  mainNavList.classList.toggle('main-nav__list--vissible');
});