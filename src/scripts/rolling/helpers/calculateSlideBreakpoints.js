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
