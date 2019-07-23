import $ from 'jquery';

export default class Console {

  constructor() {
    this.$console = $("#console-output");
  }

  hide() {
    this.$console.hide();
  }

  show() {
    this.$console.show();
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
      <br/>
      Window width: ${output.windowWidth}
      <br/>
      Window height: ${output.windowHeight}
      <br/>
      isMobile: ${output.isMobile}
      <br/>
      isPhone: ${output.isPhone}
      <br/>
      isTablet: ${output.isTablet}
    `);

  }

}
