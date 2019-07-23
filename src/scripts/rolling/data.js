//
// массив объектов с параметрами слайдов
//

import slide01  from './animations/out/slide_01';
// import slide01V from './animations/out/slide_01V';
import slide02  from './animations/out/slide_02';
// import slide02V from './animations/out/slide_02V';
import slide03  from './animations/out/slide_03';
// import slide03V from './animations/out/slide_03V';
import slide04  from './animations/out/slide_09';

export default {
  slides: [{
    id: 1,
    element: 'slide_01_animation',
    animationData: slide01,
    animationDataV: slide01
  }, {
    id: 2,
    element: 'slide_02_animation',
    animationData: slide02,
    animationDataV: slide02
  }, {
    id: 3,
    element: 'slide_03_animation',
    animationData: slide03,
    animationDataV: slide03
  }, {
    id: 4,
    element: 'slide_04_animation',
    animationData: slide04,
    animationDataV: slide04
  }]
}
