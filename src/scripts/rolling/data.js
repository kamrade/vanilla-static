//
// массив объектов с параметрами слайдов
//

import slide01 from './animations/out/glitch_01';
import slide02 from './animations/glitch02';
import slide03 from './animations/glitch03';
import slide04 from './animations/gtr_01';

export default {
  slides: [{
    id: 1,
    element: 'slide_01_animation',
    animationData: slide01,
    // animationPath: 'src/scripts/rolling/animations/slide01.json',
  }, {
    id: 2,
    element: 'slide_02_animation',
    animationData: slide02,
    // animationPath: 'src/scripts/rolling/animations/slide02.json',
  }, {
    id: 3,
    element: 'slide_03_animation',
    animationData: slide03,
  }, {
    id: 4,
    element: 'slide_04_animation',
    animationData: slide04,
  }]
}
