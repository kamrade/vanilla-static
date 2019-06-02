/*
// CALCULATE SLIDES BREAKPOINTS
// 
// На вход получает jquery массив элементов со слайдами
// возвращает массив объектов с параметрами top и height каждого элемента
// из массива
*/

import $ from 'jquery';

export default function calculateSlideBreakpoints($elements) {

  let breakpoints = [];

  $elements.each((i, el) => {
    let y = $(el).offset().top;
    let h = $(el).outerHeight();
    breakpoints.push({y, h});
  });

  return breakpoints;

}
