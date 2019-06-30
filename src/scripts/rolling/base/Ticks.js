import $ from 'jquery';

export default class Ticks {

  constructor() {
    this.$toggler = $('.help-ticks .toggler');
    this.$toggler.css('top', this.controlOffset + 'px');
  }

  hide() {
    this.$toggler.hide();
  }

  show() {
    this.$toggler.show();
  }

}
