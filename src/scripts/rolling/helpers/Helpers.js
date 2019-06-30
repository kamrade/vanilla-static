import $ from 'jquery';

export default class Helpers {

  constructor() {
    this.$toggler = $('.help-ticks .toggler');
    this.$toggler.css('top', this.controlOffset + 'px');
  }


}
