import $ from 'jquery';

import calculateSlideBreakpoints from './helpers/calculateSlideBreakpoints';
import slide01 from './slides/slide01';
import slide02 from './slides/slide02';

export default {

  // DOM CACHE
  $window: null,
  $console: null,

  version: '0.01',

  controlOffset: 400,

  _windowOffsetY: 0,
  set windowOffsetY(value) {
    this._windowOffsetY = value;
    this.updateConsole();
    this.checkBreakpoint();
  },
  get windowOffsetY() {
    return this._windowOffsetY;
  },

  slidesElements: null,

  _slidesBreakpoins: [],
  set slidesBreakpoins(value) {
    this._slidesBreakpoins = value;
  },
  get slidesBreakpoins() {
    return this._slidesBreakpoins;
  },






  // FUNCTIONS
  // INITIAL

  init: function() {
    console.log(`Rolling version: ${this.version}`);
    this.$window = $(window);
    this.$console = $("#console-output");
    this.setupEvents();
    this.updateConsole();
    this.slidesElements = $('.slide');
    this.slidesBreakpoins = calculateSlideBreakpoints(this.slidesElements);
    this.offset = this.$window.height() / 2;

    // SLIDES
    let el1 = document.getElementById('slide_01_animation');
    const an1 = 'src/scripts/rolling/slides/slide01.json';
    slide01.init(el1, an1);

    let el2 = document.getElementById('slide_02_animation');
    const an2 = 'src/scripts/rolling/slides/slide02.json';
    slide02.init(el2, an2);
  },

  setupEvents: function() {
    this.$window.on('scroll', this.handlerWindowScroll.bind(this));
  },

  // MAIN LOGIC

  checkBreakpoint() {
    this.slidesBreakpoins.map((el, i) => {



      if (i === 0) {
        if (this.windowOffsetY + this.controlOffset >= el.y && this.windowOffsetY + this.controlOffset <= el.y + el.h) {
          slide01.play();
        } else {
          slide01.reverse();
        }
      }

      if (i === 1) {
        if (this.windowOffsetY + this.controlOffset >= el.y && this.windowOffsetY + this.controlOffset <= el.y + el.h) {
          slide02.play();
        } else {
          slide02.reverse();
        }
      }



    });
  },

  // EVENT HANDLERS

  handlerWindowScroll: function() {
    this.windowOffsetY = this.$window.scrollTop();
  },

  // HELPERS

  updateConsole() {
    this.$console.html(`
      version: ${this.version}
      <br/>
      offset: ${this.controlOffset}
      <br/>
      window offset y: ${this.windowOffsetY}
      <br/>
      demo: ${slide01.demo && slide01.demo.score}
    `);
  }

}
