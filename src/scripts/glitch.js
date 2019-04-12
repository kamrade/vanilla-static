import $ from 'jquery';

export default function glitch() {
  const $btnAddClass = $('#btn-add-class');
  const $title = $('.content__title');
  const $indicator = $('#indicator');

  $btnAddClass.on('click', () => {
    $title.toggleClass('animated');
    $title.hasClass('animated')
      ? $btnAddClass.text('Animation: ON')
      : $btnAddClass.text('Animation: OFF');
  });
}
