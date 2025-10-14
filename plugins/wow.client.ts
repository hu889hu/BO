import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  if (process.client) {
    import('wowjs').then(({ WOW }) => {
      new WOW({
        animateClass: 'animate__animated', // 与 animate.css 的类名匹配
        offset: 10, // 距离视口多远触发
        mobile: true, // 在移动设备上是否执行
      }).init();
    });
  }
});
