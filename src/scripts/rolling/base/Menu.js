import $ from 'jquery';

export default class Menu {

  constructor() {

    this.$menuToggler  = $('.navigation-toggler');
    this.$navigation   = $('.rolling-navigation');
    this.$closeOverlay = $('.close-overlay');

    this.setupEvents();

  }

  setupEvents() {
    this.$menuToggler.on('click', this.handlerMenuToggle.bind(this));
    this.$closeOverlay.on('click', this.handlerMenuClose.bind(this));
  }

  handlerMenuClose() {
    this.$navigation.removeClass('active');
  }

  handlerMenuToggle() {
    this.$navigation.toggleClass('active');
  }

}
