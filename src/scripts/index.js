// import $ from 'jquery';
import glitch from './glitch';
import rolling from './rolling';
import '../styles/style.scss';

if (module.hot) {
  module.hot.accept();
}

if (window.location.href.indexOf('glitch.html') !== -1) {
  glitch();
}

if (window.location.href.indexOf('rolling.html') !== -1) {
  rolling.init();
}

console.log('::: start index.html');
