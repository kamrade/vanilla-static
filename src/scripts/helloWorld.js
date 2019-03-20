import $ from 'jquery';

export default function helloWorld() {
  console.log('::: hello');
  $('body').css('color', 'red');
};
