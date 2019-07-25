//
// currentSlide - slide index from 0 to length--. If = -1, no active slide.
//

import $ from 'jquery';
import MobileDetect from 'mobile-detect';

import calculateSlideBreakpoints from './rolling/helpers/calculateSlideBreakpoints';
import correctHeight from './rolling/base/correctHeight';

import Console from './rolling/base/Console';
import Ticks from './rolling/base/Ticks';
import Menu from './rolling/base/Menu';
import Slide from './rolling/slides/slide';

import data from './rolling/data';
import animationBg from './rolling/animations/out/dynamic_bg_01';

export default {

  version: '0.01',
  progress: [],
  slides: [],
  mobileSlides: [],
  controlOffset: 0,
  slidesElements: null,
  ratio: 2,
  ratioV: false,
  isMobile: null,


  /**
  * Текущий прогресс в текущем слайде
  */
  _currentProgress: -1,
  set currentProgress(value) {
    this._currentProgress = value;
    this.updateConsole();

    // let currentTableSlide = $(`.slide-0${this.currentSlide+1}`);
    // currentTableSlide.css({'transform': `translateY(${100 - 5 * (value - 50)}px)`});



  },
  get currentProgress() {
    return this._currentProgress;
  },

  /**
  * Собственно текущий слайд. Нумерация начинается с 0
  */
  _currentSlide: -1,
  set currentSlide(value) {
    this._currentSlide = value;
    this.updateConsole();
  },
  get currentSlide() {
    return this._currentSlide;
  },

  /**
  * Запоминаем параметры окна. Высоту и ширину.
  */
  _windowHeight: 0,
  get windowHeight() {
    return this._windowHeight;
  },
  set windowHeight(value) {
    this._windowHeight = value;
    this.updateConsole();
    this.slidesBreakpoins = calculateSlideBreakpoints(this.slidesElements);
    this.checkBreakpoint();
  },
  _windowWidth: 0,
  get windowWidth() {
    return this._windowWidth;
  },
  set windowWidth(value) {
    this._windowWidth = value;
    this.updateConsole();
    this.slidesBreakpoins = calculateSlideBreakpoints(this.slidesElements);
    this.checkBreakpoint();
  },

  /**
  * На сколько проскроллили окно
  */
  _windowOffsetY: 0,
  set windowOffsetY(value) {
    this._windowOffsetY = value;
    this.updateConsole();
    this.checkBreakpoint();
  },
  get windowOffsetY() {
    return this._windowOffsetY;
  },

  /**
  * Массив значений, пересекая которые скролл запускает анимацию следующего слайда
  */
  _slidesBreakpoins: [],
  set slidesBreakpoins(value) {
    this._slidesBreakpoins = value;
  },
  get slidesBreakpoins() {
    return this._slidesBreakpoins;
  },

  /**
  * Ф-ция инициализации всей страницы.
  */
  init() {

    const self = this;

    /**
    * Кешируем DOM
    */
    this.$window                  = $(window);
    this.$fixedSlidesContainer    = $('#fixed-slides-container');
    this.$slidesProgress          = $('#slides-progress');
    this.$body                    = $('body');

    let md = new MobileDetect(window.navigator.userAgent);

    this.isMobile = md.mobile() || md.phone() || md.tablet();

    if (this.isMobile) {
      this.$body.addClass('is-mobile-device');
    }

    /**
    * Находим точку, переходя которую слайд запускает анимацию
    * Середина окна
    */
    this.setControlOffset();

    /**
    * Инициализируем слайды
    */
    this.setupSlides();

    /**
    * Инициализируем анимацию фона
    */
    let bg = new Slide({
      el: document.getElementById('website-background'),
      animationData: animationBg,
      loop: true
    });
    bg.animation.setSpeed(0.1);
    bg.play();


    this.slidesElements   = $('.slide');
    this.slidesBreakpoins = calculateSlideBreakpoints(this.slidesElements);

    this.console = new Console();
    this.console.hide();
    this.ticks   = new Ticks();
    this.ticks.hide();
    this.menu    = new Menu();

    this.handlerWindowResize();
    this.setupWindowRatio();
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

  setupSlides() {

    // does not support in IE
    this.$fixedSlidesContainer.empty();
    this.slides       = [];
    this.mobileSlides = [];

    data.slides && data.slides.map((slideData, i) => {

      if (this.isMobile) {

        // Добавляем мобильные слайды
        let currentMobileSlideContainer = document.getElementById(`progress-slide-0${i+1}`);
        // find better solution
        currentMobileSlideContainer.innerHTML = '';

        let mobileSlide = new Slide({
          el: currentMobileSlideContainer,
          animationData: slideData.animationDataT,
          index: slideData.id
        });
        mobileSlide.animation.setSpeed(2);
        this.mobileSlides.push(mobileSlide);

      } else {

        // Добавляем фиксированные слайды
        this.$fixedSlidesContainer.append(`<div class="slide-fixed" id="${slideData.element}"></div>`);
        let slide = new Slide({
          el: document.getElementById(slideData.element),
          animationPath: slideData.animationPath,
          animationData: this.ratioV ? slideData.animationDataV : slideData.animationData,
          index: slideData.id
        });
        slide.animation.setSpeed(2);
        this.slides.push(slide);

      }

    });
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
          if (this.slides.length) {
            $(this.slides[slideBeforeCheck].el).css('transform', `translateY(100%)`);
          }
        }
        if (this.currentSlide > slideBeforeCheck && this.slides[slideBeforeCheck]) {
          if (this.slides.length) {
            $(this.slides[slideBeforeCheck].el).css('transform', `translateY(-100%)`);
          }
        }
        if (this.currentSlide !== slideBeforeCheck) {
          if (this.slides.length) {
            this.slides[i].animation.setSpeed(1);
            this.slides[i].play();
          } else {
            this.mobileSlides[i].animation.setSpeed(1);
            this.mobileSlides[i].play();
          }
        }

        let offset = this.windowOffsetY + this.controlOffset - el.y;
        this.progress[i] = Math.round(offset / el.h * 100);
        this.currentProgress = Math.round(offset / el.h * 100);

        if (this.slides.length) {
          $(this.slides[i].el).css('transform', `translateY(${-1*this.currentProgress/10}%)`);
        }

      } else {

        /**
        * Уходим со слайда
        */
        if (this.slides.length) {
          this.slides[i].animation.setSpeed(8);
          this.slides[i].reverse();
        } else {
          this.mobileSlides[i].animation.setSpeed(8);
          this.mobileSlides[i].reverse();
        }
        this.progress[i] = 0;

      }

    });

    /**
    * Такого быть не должно, но если все таки ни один слайд не подходит под текущие breakpoints
    */
    if (!isAtLeastOneBreakpoint) {
      this.currentSlide = -1;
      this.currentProgress = -1;
    } else {

    }
  },


  /**
  * Setup
  */
  setControlOffset() {
    this.controlOffset = this.$window.height() / 2;
  },

  setupWindowRatio() {
    this.ratio  = this.windowWidth / this.windowHeight;
    this.ratioV = (this.windowWidth / this.windowHeight) < 1;
  },



  /**
  * EVENT HANDLERS
  */
  handlerWindowScroll() {
    this.windowOffsetY = this.$window.scrollTop();
  },

  handlerWindowResize(event) {

    let previousRatio = this.ratioV;
    this.setControlOffset();

    correctHeight();
    // All other params calculated in the setter
    this.windowHeight = this.$window.height();
    this.windowWidth  = this.$window.width();

    this.setupWindowRatio();

    let newRatio = this.ratioV;

    if (previousRatio !== newRatio) {

      let previousCurrentSlide = this.currentSlide;

      this.setupSlides();
      this.checkBreakpoint();

      // Если текущий слайд не изменился, система не будет его автоматически проигрывать
      // Поэтому форсим проигрывание текущего слайда
      if (previousCurrentSlide === this.currentSlide) {
        if (this.slides.length) {
          this.slides[this.currentSlide].animation.setSpeed(1);
          this.slides[this.currentSlide].play();
        } else {
          this.mobileSlides[this.currentSlide].animation.setSpeed(1);
          this.mobileSlides[this.currentSlide].play();
        }

      }

    }

  },

  // Пока никак особо не задействовано
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



  /**
  * HELPERS
  */
  updateConsole() {
    if (this.console) {
      this.console.update(this);
    }
  }

}
