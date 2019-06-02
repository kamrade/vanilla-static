import $ from 'jquery';

export default class Console {

  constructor() {
    this.$console = $("#console-output");
  }

  update(output) {
    this.$console.html(`
      Version: ${output.version}
      <br/>
      Control offset: ${output.controlOffset}
      <br/>
      Window offset y: ${output.windowOffsetY}
      <br/>
      Current slide: ${output.currentSlide}
      <br/>
      Current offset: ${output.currentProgress}%
    `);

  }

}
