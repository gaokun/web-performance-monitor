const PerformanceMonitor = {
  previousTime: Date.now(),
  handler: null,
  fps: 0,
  frameDelay: 0, // 两帧之间的时间

  dom: null,
  canvasCtx: null,

  speed: 0,
  MAX_SPEED: 20,

  init() {
    this.dom = document.createElement('div');
    this.dom.style = `position: fixed; left: 0; bottom: 0; z-index: 9999;
      background-color: white; opacity: 0.2; display: none; color: red; font-size: 23px;`;

    this.dom.addEventListener('mouseover', () => {
      this.dom.style.opacity = 1;
    });

    this.dom.addEventListener('mouseout', () => {
      this.dom.style.opacity = 0.2;
    });

    document.body.appendChild(this.dom);
  },

  show() {
    this.dom.style.display = 'block';
    this.run();
  },

  hide() {
    this.dom.style.display = 'none';
    this.cancel();
  },

  run() {
    this.handler = requestAnimationFrame(() => {
      if (this.speed++ >= this.MAX_SPEED) {
        let diff = (Date.now() - this.previousTime) / this.speed;
        this.speed = 0;
        this.frameDelay = Math.round(diff * 1000) / 1000;
        this.fps = Math.round(1000 / this.frameDelay);
        this.previousTime = Date.now();

        this.dom.textContent = `FPS: ${this.fps}`;
      }
      this.run();
    });
  },

  cancel() {
    cancelAnimationFrame(this.handler);
  }
};

PerformanceMonitor.init();

if (module) {
  module.exports = PerformanceMonitor;
}
