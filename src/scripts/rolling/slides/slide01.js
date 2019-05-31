import lottie from 'lottie-web';

export default {
  isPlayed:   false,
  isReversed: true,
  anim: null,

  init: function(el, animationPath) {
    this.anim = lottie.loadAnimation({
      container: el, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: animationPath // the path to the animation json
    });
    this.anim.stop();
  },

  play: function() {
    if (!this.isPlayed) {
      // lottie.setDirection(1);
      this.anim.setDirection(1);
      this.anim.play();
      this.isPlayed   = true;
      this.isReversed = false;
    }
  },

  reverse: function() {
    if (!this.isReversed) {
      // lottie.setDirection(-1);
      this.anim.setDirection(-1);
      this.anim.play();
      this.isPlayed   = false;
      this.isReversed = true;
    }
  }
}
