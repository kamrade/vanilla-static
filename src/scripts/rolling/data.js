//
// массив объектов с параметрами слайдов
//

import slide01 from './animations/out/glitch_01';
import slide02 from './animations/out/glitch_02';
import slide03 from './animations/out/slide_03';
// import slide03 from './animations/glitch03';
// import slide04 from './animations/gtr_01';
import slide04 from './animations/out/slide_04';
import slide05 from './animations/out/slide_05';
import slide06 from './animations/out/slide_06';
import slide07 from './animations/out/slide_07';

export default {
  slides: [{
    id: 1,
    element: 'slide_01_animation',
    animationData: slide01,
  }, {
    id: 2,
    element: 'slide_02_animation',
    animationData: slide02,
  }, {
    id: 3,
    element: 'slide_03_animation',
    animationData: slide03,
  }, {
    id: 4,
    element: 'slide_04_animation',
    animationData: slide04,
  }, {
    id: 5,
    element: 'slide_05_animation',
    animationData: slide05
  }, {
    id: 6,
    element: 'slide_06_animation',
    animationData: slide06
  }, {
    id: 7,
    element: 'slide_07_animation',
    animationData: slide07
  }]
}
