// import $ from 'jquery';
import glitch from './glitch';
import rolling from './rolling/rolling';
import '../styles/style.scss';

if (module.hot) {
  module.hot.accept();
}

if (window.location.href.includes('glitch.html')) {
  glitch();
}

if (window.location.href.includes('rolling.html')) {
  rolling.init();
}

console.log('::: start index.html');
