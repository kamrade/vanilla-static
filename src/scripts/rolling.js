//
// currentSlide - slide index from 0 to length--. If = -1, no active slide.
//

import $ from 'jquery';
import calculateSlideBreakpoints from './rolling/helpers/calculateSlideBreakpoints';
import correctHeight from './rolling/base/correctHeight';

import Console from './rolling/base/Console';
import Ticks from './rolling/base/Ticks';
import Menu from './rolling/base/Menu';
import Slide from './rolling/slides/slide';

import data from './rolling/data';
import animationBg from './rolling/animations/out/dynamic_bg_01';

export default {

  // STATE ----------------------------------------------

  version: '0.01',
  progress: [],
  slides: [],
  controlOffset: 0,
  slidesElements: null,


  _currentProgress: -1,
  set currentProgress(value) {
    this._currentProgress = value;
    this.updateConsole();
  },
  get currentProgress() {
    return this._currentProgress;
  },

  _currentSlide: -1,
  set currentSlide(value) {
    this._currentSlide = value;
    this.updateConsole();
  },
  get currentSlide() {
    return this._currentSlide;
  },

  _windowHeight: 0,
  get windowHeight() {
    return this._windowHeight;
  },
  set windowHeight(value) {
    this._windowHeight = value;
    this.updateConsole();
  },

  _windowWidth: 0,
  get windowWidth() {
    return this._windowWidth;
  },
  set windowWidth(value) {
    this._windowWidth = value;
    this.updateConsole();
  },

  _windowOffsetY: 0,
  set windowOffsetY(value) {
    this._windowOffsetY = value;
    this.updateConsole();
    this.checkBreakpoint();
  },
  get windowOffsetY() {
    return this._windowOffsetY;
  },

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
    const self = this;

    this.$window                  = $(window);
    this.controlOffset            = this.$window.height() / 2;
    this.$fixedSlidesContainer    = $('#fixed-slides-container');
    this.$slidesProgress          = $('#slides-progress');

    data.slides && data.slides.map((slideData, i) => {

      // this.$slidesProgress.append(`<div class="slide slide-${i}"></div>`);
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

    let bg = new Slide({
      el: document.getElementById('website-background'),
      animationData: animationBg,
      loop: true
    });
    bg.animation.setSpeed(0.1);
    bg.play();

    // SLIDES CONTROL
    this.slidesElements   = $('.slide');
    this.slidesBreakpoins = calculateSlideBreakpoints(this.slidesElements);

    this.console = new Console();
    this.console.hide();
    this.ticks   = new Ticks();
    this.ticks.hide();
    this.menu    = new Menu();


    this.handlerWindowResize();

    setTimeout(() => {
      self.checkBreakpoint();
    }, 200);


    this.setupEvents();
    this.updateConsole();
  },

  setupEvents: function() {
    this.$window.on( 'scroll', this.handlerWindowScroll.bind(this));
    this.$window.on( 'keyup',  this.handlerKeyup.bind(this));
    this.$window.on( 'resize', this.handlerWindowResize.bind(this));
  },

  // MAGIC

  checkBreakpoint() {

    let isAtLeastOneBreakpoint = false;

    let slideBeforeCheck = this.currentSlide;

    this.slidesBreakpoins.map((el, i) => {

      const currentOffset = this.windowOffsetY + this.controlOffset;

      if (currentOffset >= el.y && currentOffset <= el.y + el.h) {

        isAtLeastOneBreakpoint = true;
        this.currentSlide = i;

        if (this.currentSlide < slideBeforeCheck && this.slides[slideBeforeCheck]) {
          $(this.slides[slideBeforeCheck].el)
            .css('transform', `translateY(100%)`);
        }
        if (this.currentSlide > slideBeforeCheck && this.slides[slideBeforeCheck]) {
          $(this.slides[slideBeforeCheck].el)
            .css('transform', `translateY(-100%)`);
        }
        if (this.currentSlide !== slideBeforeCheck) {
          this.slides[i].animation.setSpeed(1);
          this.slides[i].play();
        }

        let offset = this.windowOffsetY + this.controlOffset - el.y;
        this.progress[i] = Math.round(offset / el.h * 100);
        this.currentProgress = Math.round(offset / el.h * 100);

        // MOVE SLIDE WHEN SCROLL BETWEEN BREAKPOINTS
        // $(this.slides[i].el).css('transform', `translateY(${-1*this.currentProgress/10}%)`);
        $(this.slides[i].el).css('transform', `translateY(${-1*this.currentProgress/10}%)`);

      } else {

        this.slides[i].animation.setSpeed(8);
        this.slides[i].reverse();
        this.progress[i] = 0;

      }

    });

    if (!isAtLeastOneBreakpoint) {
      this.currentSlide = -1;
      this.currentProgress = -1;
    } else {

    }
  },

  // EVENT HANDLERS
  handlerWindowScroll() {
    this.windowOffsetY = this.$window.scrollTop();
  },

  handlerWindowResize(event) {
    correctHeight();
    this.windowHeight = this.$window.height();
    this.windowWidth  = this.$window.width();
  },

  handlerKeyup(event) {

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
