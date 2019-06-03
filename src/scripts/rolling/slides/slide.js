/*
// SLIDE
//
// Класс, который отвечает за создание слайда через constructor
// и за его базовые функции (play, reverse)
*/

import lottie from 'lottie-web';

export default class Slide {

  constructor(options) {

    this.el            = options.el;
    this.animationPath = options.animationPath;
    this.index         = options.index;
    this.animationData = options.animationData;

    this.isPlayed      = false;
    this.isReversed    = true;

    this.animation = lottie.loadAnimation({
      container: this.el,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      // path: this.animationPath,
      animationData: this.animationData
    });

    this.animation.stop();
  }

  play() {
    if (!this.isPlayed) {
      this.animation.setDirection(1);
      this.animation.play();
      this.isPlayed   = true;
      this.isReversed = false;
    }
  }

  reverse() {
    if (!this.isReversed) {
      this.animation.setDirection(-1);
      this.animation.play();
      this.isPlayed   = false;
      this.isReversed = true;
    }
  }

}
