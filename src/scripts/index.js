import $ from 'jquery';
import {helloWorld} from './helloWorld';
import '../styles/style.scss';

if (module.hot) {
  module.hot.accept('./helloWorld', function() {
    helloWorld();
  });
}

console.log('::: start');

$('body').css('color', 'red');
