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
    <div class="solution-bg">
      <img class="leto" src="@/assets/image/index/leto.png" alt="shape">
      <h1>智能機器人</h1>
      <div class="mains">
        <div class="text-group text-left">
          <div class="text-item"><span style="font-weight: 800;">有效載荷</span><br>35磅</div>
          <div class="text-item"><span style="font-weight: 800;">可訂製</span><br>末端執行器</div>
          <div class="text-item"><span style="font-weight: 800;">操控範圍</span><br>5.5英尺</div>
        </div>
        <div class="image-wrapper">
          <img class="model-img" src="@/assets/image/jqindex/home21.jpg">
        </div>
        <div class="text-group ">
          <div class="text-item"><span style="font-weight: 800;">站立高度</span><br>5' 9"</div>
          <div class="text-item"><span style="font-weight: 800;">操控版</span><br>維護端口</div>
          <div class="text-item"><span style="font-weight: 800;">自主對接</span><br>智能充電</div>
        </div>
      </div>
    </div>

    <section class="join-us">
      <div class="join-cont">
        <div class="chart">
          <img src="@/assets/image/jqindex/home23.png" alt="">
        </div>
        <div class="cont">
          <h5>智能自動控制面板</h5>
          <h1>基於基礎融合智能技術的</h1>
          <h1 style="font-weight: bold;">自動化平台</h1>
          <h6>技術不斷創新，除了機器人的技能匯入之外，我們也為使用者增加了更直覺的設計，整合與統一方便快速。</h6>
          <br>
          <div class="cont-flex">
            <p><img src="@/assets/image/jqindex/solution-icon.png" alt=""> 簡單集成:與WMS、WES或MES解決方案快速無縫整合</p>
            <p><img src="@/assets/image/jqindex/solution-icon.png" alt=""> 快速自動化:在數小時或數天內計算，而不是數週或數月</p>
            <p><img src="@/assets/image/jqindex/solution-icon.png" alt=""> 安全可靠:透過雲端實現業界領先的安全性</p>
            <p><img src="@/assets/image/jqindex/solution-icon.png" alt=""> 立即適應:根據需求和要求的變化快速調整工作流程</p>
          </div>
          <hr>
          <div class="menu-btn hover-target" @click="navigateTo('/user')">
            <div class="effect-1">
              <div>{{ $lang('進入科技系統') }}</div>
              <div>{{ $lang('進入科技系統') }}</div>
            </div>
            <i class="fa-solid fa-arrow-right" style="color: #fff;margin-left: 8px;font-size: 16px;"></i>
          </div>
        </div>

      </div>
    </section>
    <section class="vw-content">
      <div class="title">
        <h2>
          智能配件
        </h2>
        <h1>
          系統與<span style="font-weight: 600;">配件</span>應用
        </h1>
        <h1>
          在製造、分銷、3PL和零售領域。
        </h1>
      </div>
      <div class="vw">
        <img src="@/assets/image/jqindex/home24.jpg" alt="">
        <div class="stats-container">
          <div class="stat-box">
            <div class="count-box">{{ botnum }}k+</div>
            <p class="text">智能運算數據庫</p>
          </div>
          <div class="stat-box box2">
            <div class="count-box counted">{{ botnum2 }}M+</div>
            <p class="text">智能流量產生</p>
          </div>
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
    right: 0
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
    @media (max-width: 768px)
      grid-template-columns: repeat(1, 1fr)
      .text-group 
        align-items: center !important
        .text-item
          width: 80%
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
.join-us
  color: #063232
  background: #fff none repeat scroll 0 0
  padding:0 0 120px
  @media screen and (max-width: 1200px)
    padding: 70px 0
.join-cont
  max-width: 1320px
  width: 100%
  margin: 0 auto
  display: flex
  justify-content: center
  @media screen and (max-width: 1200px)
    flex-direction: column
    padding: 0 15px
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
      isplay: grid
      grid-template-columns: repeat(2, 1fr)
      gap: 20px
    p
      padding: 10px 0 0
      font-size: 16px
      position: relative
      transition: all 0.5s ease-in-out
      display: flex
      align-items: center
      gap: 5px
      img
        width: 20px
        min-width: 20px
        height: 18px
      // &:hover
      //   padding-left: 30px
      //   color: #e4572b
      span
        position: absolute
        left: 5px
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
  padding: 120px 15px
  background-color: #ecf8f8
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
  margin: 0 auto
  max-width: 1320px
  display: flex
  flex-wrap: wrap
  overflow: hidden
  position: relative
  border-radius: 10px
  img
    width: 100%
  .stats-container
    position: absolute
    bottom: 0
    right: 0
    border-top-left-radius: 10px
    overflow: hidden
    display: flex
    flex-wrap: wrap
    @media (max-width: 992px)
      position: relative
    .stat-box
      padding: 45px 140px 45px 45px
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      background-color: #c2df93
      .count-box
        font-size: 50px
        line-height: 1.4
        font-weight: 600
        margin-bottom: 10px
        display: flex
        align-items: center
      .text
        color: #063232
    .box2
      background-color: #063232
      .count-box,.text
        color: #fff
</style>
