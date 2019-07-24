/**
* массив объектов с параметрами слайдов
*/

import slide01  from './animations/out/slide_01';
import slide01T from './animations/out/slide_01T';

import slide02  from './animations/out/slide_02';
import slide02T from './animations/out/slide_01T';

import slide03  from './animations/out/slide_03';
import slide03T from './animations/out/slide_01T';

import slide04  from './animations/out/slide_09';
import slide04T from './animations/out/slide_01T';

export default {
  slides: [{
    id: 1,
    element: 'slide_01_animation',
    animationData: slide01,
    animationDataV: slide01,
    animationDataT: slide01T
  }, {
    id: 2,
    element: 'slide_02_animation',
    animationData: slide02,
    animationDataV: slide02,
    animationDataT: slide02T,
  }, {
    id: 3,
    element: 'slide_03_animation',
    animationData: slide03,
    animationDataV: slide03,
    animationDataT: slide03T,
  }, {
    id: 4,
    element: 'slide_04_animation',
    animationData: slide04,
    animationDataV: slide04,
    animationDataT: slide04T,
  }]
}
