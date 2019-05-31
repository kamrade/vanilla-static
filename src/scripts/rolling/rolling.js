import $ from 'jquery';

import calculateSlideBreakpoints from './helpers/calculateSlideBreakpoints';
import data from './data';
import Slide from './slides/slide';

export default {

  // BASIC
  version: '0.01',

  // DOM CACHE
  $window: null,
  $console: null,
  $fixedSlidesContainer: null,
  $slidesProgress: null,

  // SLIDES
  progress: [],
  slides: [],
  _currentSlide: null,
  set currentSlide(value) {
    console.log(value);
    this._currentSlide = value;
  },
  get currentSlide() {
    return this._currentSlide;
  },
  controlOffset: 0,

  // SERVICES
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

  init() {
    this.$window                  = $(window);
    this.$console                 = $("#console-output");
    this.controlOffset            = this.$window.height() / 2;
    this.$fixedSlidesContainer    = $('#fixed-slides-container');
    this.$slidesProgress          = $('#slides-progress');

    data.slides && data.slides.map((slideData, i) => {

      this.$slidesProgress.append(`<div class="slide slide-${i}"></div>`);
      this.$fixedSlidesContainer.append(`<div class="slide-fixed" id="${slideData.element}"></div>`);

      let slide = new Slide({
        el: document.getElementById(slideData.element),
        animationPath: slideData.animationPath,
        index: slideData.id
      });

      slide.animation.setSpeed(2);
      console.log(slide.animation);

      this.slides.push(slide);

    });

    this.slidesElements   = $('.slide');
    this.slidesBreakpoins = calculateSlideBreakpoints(this.slidesElements);

    this.setupHelpers();
    this.setupEvents();
    this.updateConsole();
  },

  setupEvents: function() {
    this.$window.on('scroll', this.handlerWindowScroll.bind(this));
    this.$window.on('keyup', this.handlerKeyup.bind(this));
  },

  // MAIN LOGIC

  checkBreakpoint() {

    this.slidesBreakpoins.map((el, i) => {
      if (this.windowOffsetY + this.controlOffset >= el.y && this.windowOffsetY + this.controlOffset <= el.y + el.h) {
        this.currentSlide = i;
        this.slides[i].play();
        let offset = this.windowOffsetY + this.controlOffset - el.y;
        this.progress[i] = Math.round(offset / el.h * 100);
      } else {
        this.slides[i].reverse();
        this.progress[i] = 0;
      }
    });

  },

  // EVENT HANDLERS

  handlerWindowScroll() {
    this.windowOffsetY = this.$window.scrollTop();
  },

  handlerKeyup: function(event) {

    if (event.keyCode === 38) {

    } else if (event.keyCode === 40) {
      var body = $("html, body");
      console.log(body);
      body.stop().animate({scrollTop: 0}, 500, 'swing', function() {
         console.log("Finished animating");
      });
    }

  },

  // HELPERS

  setupHelpers() {
    let $toggler = $('.help-ticks .toggler');
    $toggler.css('top', this.controlOffset + 'px');
  },

  updateConsole() {
    this.$console.html(`
      version: ${this.version}
      <br/>
      offset: ${this.controlOffset}
      <br/>
      window offset y: ${this.windowOffsetY}
      <br/>
    `);
  }

}
