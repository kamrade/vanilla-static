//
// currentSlide - slide index from 0 to length--. If = -1, no active slide.
//

import $ from 'jquery';
import calculateSlideBreakpoints from './rolling/helpers/calculateSlideBreakpoints';

import Console from './rolling/base/Console';
import Ticks from './rolling/base/Ticks';
import Menu from './rolling/base/Menu';

import data from './rolling/data';
import Slide from './rolling/slides/slide';

import animationBg from './rolling/animations/website-background';

export default {

  // STATE ----------------------------------------------

  version: '0.01',

  $window: null,
  $fixedSlidesContainer: null,
  $slidesProgress: null,

  _currentProgress: -1,
  set currentProgress(value) {
    this._currentProgress = value;
    this.updateConsole();
  },
  get currentProgress() {
    return this._currentProgress;
  },
  progress: [],
  slides: [],
  _currentSlide: -1,
  set currentSlide(value) {
    this._currentSlide = value;
    this.updateConsole();
  },
  get currentSlide() {
    return this._currentSlide;
  },

  controlOffset: 0,
  windowHeight: 0,
  windowWidth: 0,

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

  // STATE END ----------------------------------------------

  // FUNCTIONS
  // INITIAL

  init() {
    this.$window                  = $(window);

    this.controlOffset            = this.$window.height() / 2;
    this.$fixedSlidesContainer    = $('#fixed-slides-container');
    this.$slidesProgress          = $('#slides-progress');

    data.slides && data.slides.map((slideData, i) => {

      this.$slidesProgress.append(`<div class="slide slide-${i}"></div>`);
      this.$fixedSlidesContainer.append(`<div class="slide-fixed" id="${slideData.element}"></div>`);

      let slide = new Slide({
        el: document.getElementById(slideData.element),
        animationPath: slideData.animationPath,
        animationData: slideData.animationData,
        index: slideData.id
      });

      slide.animation.setSpeed(2);

      this.slides.push(slide);

    });

    // BACKGROUND ANIMATION
    let bg = new Slide({
      el: document.getElementById('website-backgroud'),
      animationData: animationBg,
      loop: true
    });
    bg.animation.setSpeed(0.2);
    bg.play();

    // SLIDES CONTROL
    this.slidesElements   = $('.slide');
    this.slidesBreakpoins = calculateSlideBreakpoints(this.slidesElements);

    this.console = new Console();
    this.console.hide();
    this.ticks   = new Ticks();
    this.ticks.hide();
    this.menu    = new Menu();

    this.setupEvents();
    this.updateConsole();
  },

  setupEvents: function() {
    this.$window.on('scroll', this.handlerWindowScroll.bind(this));
    this.$window.on('keyup', this.handlerKeyup.bind(this));
  },

  // MAGIC

  checkBreakpoint() {

    let isAtLeastOneBreakpoint = false;

    this.slidesBreakpoins.map((el, i) => {

      const currentOffset = this.windowOffsetY + this.controlOffset;
      let wasCurrentSlide = this.currentSlide;

      if (currentOffset >= el.y && currentOffset <= el.y + el.h) {

        isAtLeastOneBreakpoint = true;
        this.currentSlide = i;
        this.slides[i].animation.setSpeed(1);
        this.slides[i].play();
        let offset = this.windowOffsetY + this.controlOffset - el.y;
        this.progress[i] = Math.round(offset / el.h * 100);
        this.currentProgress = Math.round(offset / el.h * 100);

        // MOVE SLIDE WHEN SCROLL BETWEEN BREAKPOINTS
        $(this.slides[i].el).css('transform', `translateY(${-1*this.currentProgress/10}%)`)

      } else {

        this.slides[i].animation.setSpeed(10);
        this.slides[i].reverse();
        this.progress[i] = 0;

      }

    });

    if (!isAtLeastOneBreakpoint) {
      this.currentSlide = -1;
      this.currentProgress = -1;
    } else {

      //
      // Просто не очень красиво получается :)
      //
      //
      // if (this.currentProgress < 50 ) {
      //   this.$fixedSlidesContainer.find(`#slide_0${this.currentSlide+1}_animation`).css('transform', `translateY(${  Math.round((50 - this.currentProgress)/2)  }px)`);
      // } else {
      //   this.$fixedSlidesContainer.find(`#slide_0${this.currentSlide+1}_animation`).css('transform', `translateY(${  Math.round((-1 * (this.currentProgress - 50))/2)  }px)`);
      // }
    }
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
  updateConsole() {
    if (this.console) {
      this.console.update(this);
    }
  }

}
