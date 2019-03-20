import $ from 'jquery';
import helloWorld from './helloWorld';
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

$('#click-me').on('click', helloWorld);

helloWorld();
console.log('::: start');
