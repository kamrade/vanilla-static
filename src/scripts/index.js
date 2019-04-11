import $ from 'jquery';
import helloWorld from './helloWorld';
import glitch from './glitch';
import '../styles/style.scss';

// if (module.hot) {
//   module.hot.accept('./helloWorld', function() {
//     console.log('Accepting the updated helloWorld module');
//     helloWorld();
//   });
// }

if (module.hot) {
  module.hot.accept();
}

if (window.location.href.includes('glitch.html')) {
  glitch();
}

$('#click-me').on('click', helloWorld);

helloWorld();
console.log('::: start');
