<script lang="ts" setup>
const { $swiper } = useNuxtApp()
import anime from '~/components/js/anime.es.js'
import swp1 from '@/assets/image/jqindex/home04.jpg'
import swp2 from '@/assets/image/jqindex/home05.jpg'
import swp3 from '@/assets/image/jqindex/home06.jpg'
import swp4 from '@/assets/image/jqindex/home07.jpg'

const swiper = ref()
const realIndex = ref(0)
const activeIndex = ref(0)
onMounted(() => {
  swiper.value = new $swiper('.swiper-pc', {
    allowTouchMove: true,
    slidesPerView: 1,
    loop: true,
    autoplay: true,
    centeredSlides: false
  })

  swiper.value.on('realIndexChange', (swiperInstance) => {
    realIndex.value = swiperInstance.realIndex; // 实际索引（0-based）
    activeIndex.value = swiperInstance.activeIndex; // 活动索引（含克隆幻灯片）
    // console.log('真实索引:', realIndex.value);
    // console.log('活动索引:', activeIndex.value);
    // 自定义操作示例：
    // document.querySelector('.current-index').textContent = realIndex + 1;
  });

  anime({
    targets: botnum,
    value: 6,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum2,
    value: 15,
    duration: 2000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })

})

const rotationX = ref(0);
const rotationY = ref(0);
const rotateGif = (event) => {
  const box = event.currentTarget;
  const rect = box.getBoundingClientRect();

  // 计算鼠标在盒子中的位置（0到1之间）
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  // 计算旋转角度（-20到20度之间）
  rotationX.value = (y - 0.5) * -30; // 反转Y轴方向
  rotationY.value = (x - 0.5) * 30;
}
const resetRotation = () => {
  rotationX.value = 0;
  rotationY.value = 0;
}
const botnum = ref(0)
const botnum2 = ref(0)
const botnum3 = ref(0)
const slides = [{
  src: swp1,
  title: '我們的技術',
  text: '準確運用該層次結構中的人工智慧'
}, {
  src: swp2,
  title: '便捷的操作',
  text: '透過技術可使器人反應更直覺'
}, {
  src: swp3,
  title: '多方位的運用',
  text: '人工智能可導入多項技術指令'
}, {
  src: swp4,
  title: '安全合理與便捷',
  text: '為客戶帶來更多有優勢服務'
}]
</script>
<template>
  <div class="solution-page">
    <section class="join-us">
      <img class="leto" src="@/assets/image/jqindex/shape0111.png" alt="shape">
      <div class="join-cont">
        <div class="cont">
          <h5>技術的發展</h5>
          <h1>科技的進步</h1>
          <h1>是<span style="font-weight: bold;">發展的最快路徑</span></h1>
          <br>
          <hr>
          <br>
          <div class="cont-flex">
            <p><span class="checkmark"><img src="@/assets/image/jqindex/checkmark.png" alt=""></span>
              我們成立的主要目標是:讓人們和公司做得更多貢獻更多，就像工業革命一樣，智能科技大大提高了世界經濟的產出。</p>
            <p><span class="checkmark"><img src="@/assets/image/jqindex/checkmark.png" alt=""></span>
              發揮這潛力的唯一方法是建造能夠提供真實、有形價值的機器人。使公司能夠控制其流程（解決實際問題），有效利用其資源（人機協作），並大幅增加全球產出。</p>
            <p><span class="checkmark"><img src="@/assets/image/jqindex/checkmark.png" alt=""></span>
              這種自動化的巨大提升來自智能解決方案。這意味著不僅僅是一個機器人，而是硬體（機器人、配件、工業設備）、軟體（人工智慧、機器人軟體、自動化平台、整合）和服務（設計、調試、操作、轉換、支援）的組合，旨在有效、可靠地解決特定行業的問題。
            </p>

          </div>

        </div>
        <div class="chart">
          <img src="@/assets/image/jqindex/home25.jpg" alt="">
        </div>
      </div>
    </section>
    <section class="vw-content">
      <div class="title">
        <h2>
          科技的歷程
        </h2>
        <h1>
          人型機器人不是結果<span style="font-weight: 600;">而是目標</span>
        </h1>

      </div>
      <div class="vw">
        <div class="process-step">
          <div class="serial">2016</div>
          <div class="line">
            <div class="circle"></div>
            <div class="line-long"><i class="line-long-arrow"></i></div>
          </div>
          <div class="content">
            <p class="text mb-0">2016-2017研發科技的種子在此發芽，產生了腿部機器人的雛型</p>
          </div>
          <img src="@/assets/image/jqindex/home26.jpg" alt="">
        </div>
        <div class="process-step">
          <div class="serial">2019</div>
          <div class="line">
            <div class="circle"></div>
            <div class="line-long"><i class="line-long-arrow"></i></div>
          </div>
          <div class="content">
            <p class="text mb-0">經過初代改革，完成了身體結構與簡單的頭部記憶窗口</p>
          </div>
          <img src="@/assets/image/jqindex/home27.jpg" alt="">
        </div>
        <div class="process-step">
          <div class="serial">2021</div>
          <div class="line">
            <div class="circle"></div>
            <div class="line-long"><i class="line-long-arrow"></i></div>
          </div>
          <div class="content">
            <p class="text mb-0">維持大致外型外，與上一代做為結合產物延續開發增加智能功能</p>
          </div>
          <img src="@/assets/image/jqindex/home28.jpg" alt="">
        </div>
        <div class="process-step">
          <div class="serial">至今</div>
          <div class="line">
            <div class="circle"></div>
            <div class="line-long"><i class="line-long-arrow"></i></div>
          </div>
          <div class="content">
            <p class="text mb-0">技術科技的發展，智能匯入多項技術已發展成熟</p>
          </div>
          <img src="@/assets/image/jqindex/home29.jpg" alt="">
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped lang="sass">
.solution-page
  background-color: #fff
  position: relative
  .leto
    position: absolute
    top: 0
    left: 0
@keyframes fadeInUp 
  to 
    opacity: 1
    transform: translateY(0)

.solution-bg
  padding: 120px 0
  h1
    font-size: 40px
    color: #605f5f
    text-align: center
    font-weight: 600
    margin-bottom: 20px
  .mains
    width: 1320px
    max-width: 100%
    padding: 0 15px
    margin: 0 auto
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 30px
    justify-content: center
    align-items: center
    .image-wrapper
      max-width: 100%
      width: 400px
      height: auto
      overflow: hidden
      border-radius: 15px
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08)
      transform: translateY(30px)
      animation: fadeInUp .5s forwards
      .model-img
        width: 100%
    .text-group 
      display: flex
      flex-direction: column
      align-items: flex-start
      gap: 65px
      .text-item
        display: flex
        flex-direction: column
        color: #5a7779
        padding: 10px 20px
        font-size: 15px
        line-height: 1
        border-left: 3px solid #858585
        border-radius: 6px
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
        background-color: transparent
        opacity: 0
        transform: translateY(30px)
        animation: fadeInUp 1s forwards
    .text-left
      align-items: flex-end
@keyframes wobble_vertical 
    16.65% 
        transform: translateY(8px)
    33.3% 
        transform: translateY(-6px)
    49.95% 
        transform: translateY(4px)
    66.6% 
        transform: translateY(-2px)
    83.25%
        transform: translateY(1px)
    100% 
        transform: translateY(0)

.join-us
  color: #063232
  background: #ecf8f8
  padding:120px 0
  @media screen and (max-width: 1200px)
    padding: 70px 15px
.join-cont
  max-width: 1320px
  width: 100%
  margin: 0 auto
  display: flex
  justify-content: center
  @media screen and (max-width: 1200px)
    flex-direction: column
    .cont,.chart
      width: 100% !important
    .cont
      padding: 0 0 20px !important

  .cont,.chart
    width: 50%
  .cont
    padding: 0 10px 0 30px
    display: flex
    flex-direction: column
    align-items: flex-start
    
    hr
      width: 100%
    h5
      font-size: 16px
      color: #e4572b
      margin-bottom: 10px
    h1
      font-size: 42px
      // padding: 10px 0
    h6
      font-size: 16px
      margin-top: 20px
    .cont-flex
      display: grid
      grid-template-columns: repeat(1, 1fr)
      gap: 20px
      
    p
      color: #5a7779
      padding: 10px 0 0
      font-size: 16px
      position: relative
      transition: all 0.5s ease-in-out
      display: flex
      align-items: center
      gap: 15px
      .checkmark
        padding: 7px 10px
        width: 44px
        min-width: 44px
        height: 44px
        border-radius: 50%
        border: 1px solid #d9e7e7
        &:hover
          background-color: #063232
          img
            animation: wobble_vertical 1s forwards ease-in-out 0s
            filter: brightness(0) invert(1)
        img
          display: inline-block
          position: relative
          
          filter: brightness(0) saturate(100%) invert(12%) sepia(97%) saturate(556%) hue-rotate(135deg) brightness(92%) contrast(95%)
     
  .chart
    padding: 0 20px
    img
      width: 100%
.menu-btn
  margin-top: 30px
  line-height: 1
  background-color: #063232
  color: #FFF
  font-weight: 600
  padding: 18px 40px
  text-align: center
  text-transform: none
  touch-action: manipulation
  transition: all 0.3s ease 0s
  vertical-align: middle
  white-space: nowrap
  border-radius: 4px
  position: relative
  overflow: hidden
  z-index: 1
  border-radius: 40px
  display: flex
  align-items: center
  &:hover
    background-color: #e3572b
    .effect-1
      div
        top: -20px
  // &::before
  //   content: ""
  //   position: absolute
  //   -webkit-transition-duration: 800ms
  //   transition-duration: 800ms
  //   width: 200%
  //   height: 200%
  //   top: 110%
  //   left: 50%
  //   background: black
  //   -webkit-transform: translateX(-50%)
  //   transform: translateX(-50%)
  //   border-radius: 50%
  //   z-index: -1
  .effect-1
    height: 20px
    overflow: hidden
    div
      position: relative
      margin-bottom: 5px
      top: 0
      transition: .3s

  // &:hover:before
  //   top: -40%
.vw-content
  padding: 120px 0
  background-color: #fff
  .title
    padding-bottom: 40px
    text-align: center
    @media screen and (max-width: 992px)
      h1
        text-align: center
        padding: 0 15px
        font-size: 32px !important

    h1
      font-size: 42px
      color: #063232
    h2
      margin-bottom: 10px
      font-size: 16px
      color: #e4572b
.vw
  background-color: #fff
  margin: 0 auto
  max-width: 1320px
  display: grid
  grid-template-columns: repeat(4, 1fr)
  overflow: hidden
  position: relative
  border-radius: 10px
  @media screen and (max-width: 768px)
    grid-template-columns: repeat(1, 1fr)
  .process-step
    text-align: center
    .serial
      font-size: 16px
      color: #063232
      font-weight: 500
      margin-bottom: 15px
    .line
      position: relative
      border-top: 3px solid rgba(6,50,50,0.10) !important
      text-align: center
      .circle
        position: absolute
        content: ""
        left: 50%
        transform: translateX(-50%)
        transition: all .4s ease 0s
        z-index: 1
        top: -10px
        width: 20px
        height: 20px
        border-radius: 50%
        background-color: #f4f8ec
        border: 3px solid #dce4d9
        transition: all .4s ease 0
    .content
      .title
      margin: 15px 0 13px
      .text
        width: 83%
        margin: auto
    img
      margin: 0 auto 20px
    &:hover .line .circle 
      background-color: #e3572b
</style>
