//
// массив объектов с параметрами слайдов
//

import slide01 from './animations/integra/slide_01';
import slide02 from './animations/integra/slide_02';
import slide03 from './animations/out/slide_03';

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
  }]
}
