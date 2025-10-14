<script lang="ts" setup>
// const { $swiper } = useNuxtApp()
import anime from '~/components/js/anime.es.js'
import swp1 from '@/assets/image/jqindex/home04.jpg'
import swp2 from '@/assets/image/jqindex/home05.jpg'
import swp3 from '@/assets/image/jqindex/home06.jpg'
import swp4 from '@/assets/image/jqindex/home07.jpg'

const swiper = ref()
const realIndex = ref(0)
const activeIndex = ref(0)
onMounted(() => {
  // swiper.value = new $swiper('.swiper-pc', {
  //   allowTouchMove: true,
  //   slidesPerView: 1,
  //   loop: true,
  //   autoplay: true,
  //   centeredSlides: false
  // })

  // swiper.value.on('realIndexChange', (swiperInstance) => {
  //   realIndex.value = swiperInstance.realIndex; // 实际索引（0-based）
  //   activeIndex.value = swiperInstance.activeIndex; // 活动索引（含克隆幻灯片）
  //   // console.log('真实索引:', realIndex.value);
  //   // console.log('活动索引:', activeIndex.value);
  //   // 自定义操作示例：
  //   // document.querySelector('.current-index').textContent = realIndex + 1;
  // });

  anime({
    targets: botnum,
    value: 76,
    duration: 3000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum2,
    value: 100,
    duration: 3000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum3,
    value: 97,
    duration: 3000, // 动画持续时间 2 秒
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
  <div>
    <div class="main-img">
      <img class="leto" src="@/assets/image/jqindex/shape03.png" alt="shape">
      <div class="mains">
        <div class="left">
          <div class="leftf">
            <img src="@/assets/image/jqindex/arrow-up-right.png" alt="">
            數位部屬新時代
          </div>
          <div class="leftt">世界首次商業部屬的專用數位人型機器人</div>
          <div class="line"></div>
          <div class="texts">數位的創新結合商業應用</div>
          <div class="texts">創造更便利的時代也引領著科技的進步</div>
          <div class="btnbox">
            <div class="liaojie  hover-target">
              <div class="effect-1" @click="navigateTo('/user')">
                <div>{{ $lang('了解科技與應用') }}</div>
                <div>{{ $lang('了解科技與應用') }}</div>
              </div>
              <i class="fa-solid fa-arrow-right" style="color: #fff;margin-left: 8px;font-size: 16px;"></i>
            </div>
            <div class="jinru" @click="navigateTo('/game/warrants')">
              <div class="icon">
                <i class="icon-target"></i>
              </div>
              <div class="textjr">進入科技系統</div>
            </div>
          </div>
        </div>
        <div class="right">
          <img @mousemove="rotateGif" @mouseleave="resetRotation"
            :style="{ transform: `perspective(1000px) rotateX(${-rotationX}deg) rotateY(${-rotationY}deg) scale3d(1, 1, 1)`, willChange: 'transform' }"
            class="gif" src="@/assets/image/jqindex/home01.gif" alt="">
          <div class="agency-info">
            <div class="iconbot"><i class="botic fa-solid fa-robot"></i></div>
            <div class="agencytxt">Agility Robotics</div>
          </div>
          <div class="circle-path_shape"></div>
          <div class="inner-box">
            <div class="ellipse-path"></div>
            <img class="bte" src="@/assets/image/jqindex/home02.png" alt="">
            <div class="kejit">科技應用百分比</div>
            <div class="qll">
              {{ botnum }}%
              <div class="rotatearrows">
                <i class="fa-solid fa-arrows-spin fa-rotate-by" style="--fa-rotate-angle: 60deg;"></i>
              </div>
            </div>
          </div>
          <div class="info-box">
            <img class="imgbox" src="@/assets/image/jqindex/home03.jpg">
            <div class="righti">
              <div>便捷與安全共存</div>
              <div>提高效率又能保證完成率</div>
            </div>
          </div>
          <img class="dot-shape" src="@/assets/image/jqindex/home3-dot-shape.png" alt="">
        </div>
      </div>
    </div>
    <section class="team">
      <div class="title">
        <h2>
          Embodied AI
        </h2>
        <h1>
          將人工智慧應用到世界的前線，
        </h1>
        <h1>
          透過機器人<span>處理複雜指令</span>與發展全身控制層次結構。
        </h1>
      </div>
      <div class="team-items" v-if="slides.length > 0">
        <IndexSlider :slides="slides" />
      </div>
    </section>
    <section class="join-us">
      <div class="join-cont">
        <div class="cont">
          <h5>The Challenge</h5>
          <h1>勞動力差距日益擴大</h1>
          <h6>倉儲、物流和製造業有超過100萬個物料搬運職缺，公司根本無法找到足夠的人員來處理保持這些營運盡可能快速且有效率地運作所需的所有任務。</h6>
          <br>
          <p><span><i class="fa-solid fa-check" style="color: #e4572b;"></i></span> 我們的人形機器人使我們的客戶能夠自動執行高度重複的任務</p>
          <p><span><i class="fa-solid fa-check" style="color: #e4572b;"></i></span> 機器人可以消化指定部分，並將最有價值的資源(人員)部署到最需要的地方
          </p>
          <p><span><i class="fa-solid fa-check" style="color: #e4572b;"></i></span> 減緩人員不足的困擾，增加產業與物流的相互輔助</p>
          <p><span><i class="fa-solid fa-check" style="color: #e4572b;"></i></span> 可以安排多種指令提供客製化路線</p>
        </div>
        <div class="chart">
          <HomeChart />
        </div>
      </div>
    </section>
    <section class="vw-content">
      <div class="title">
        <h2>
          Use Cases
        </h2>
        <h1>
          我們從最需要的地方開始。
        </h1>
        <h1>
          在製造、分銷、3PL和零售領域。
        </h1>
      </div>
      <div class="vw">
        <div class="row-item">
          <div class="item-box">
            <div class="logo-sm">
              <img src="@/assets/image/index/vw-1.jpg" alt="">
              <span>Loading and Unloading</span>
            </div>
            <div class="hr"></div>
            <div class="t-cont">
              <h4>裝卸處理</h4>
            </div>
          </div>
        </div>
        <div class="row-item">
          <div class="item-box">
            <div class="logo-sm">
              <img src="@/assets/image/index/vw-2.jpg" alt="">
              <span>Palletizing & Depalletizing</span>
            </div>
            <div class="hr"></div>
            <div class="t-cont">
              <h4>碼垛和卸垛</h4>
            </div>
          </div>
        </div>
        <div class="row-item">
          <div class="item-box">
            <div class="logo-sm">
              <img src="@/assets/image/index/vw-3.jpg" alt="">
              <span>Tote Recycling</span>
            </div>
            <div class="hr"></div>
            <div class="t-cont">
              <h4>回收處理</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="vw2-content">
      <div class="vw2-cont">
        <div class="title">
          <h1>雲端的自動化平台 <br />
            整合各種自動化工作流程，</h1>
          <h1 style="font-weight: bold;">
            讓客戶便利管理機器數據
          </h1>
        </div>
        <div class="num-con">
          <div class="num-item">
            <h2>{{ botnum2 }}k+</h2>
            <h4>系統運用件數</h4>
          </div>
          <div class="num-item">
            <h2>{{ botnum3 }}%</h2>
            <h4>系統直覺使用</h4>
          </div>
          <div class="num-item">
            <h2>{{ botnum2 }}</h2>
            <h4>獲得客戶信賴</h4>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<style scoped lang="sass">
@import '@/assets/sass/index/index.sass'
.main-img
  background-color: #ecf8f8
  border-radius: 30px
  padding: 100px 0
  position: relative
  margin: 0 60px
  overflow: hidden
  @media (max-width: 850px)
    margin: 40px 20px
    padding: 60px 0
  .gif
    border-radius: 10px
    position: absolute
    left: 0px
    top: 0px
    z-index: 2
  .leto
    position: absolute
    left: 0
    top: 0
  .circle-path_shape
    position: absolute
    left: 230px
    width: 258px
    bottom: 90px
    height: 258px
    border-radius: 50%
    background-color: #e3572b
    @media (max-width: 850px)
      right: -129px
      top: 120px
  .agency-info
    width: 140px
    height: 150px
    border-radius: 10px
    background-color: #c2df93
    position: absolute
    z-index: 4
    display: flex
    align-items: center
    justify-content: center
    top: 120px
    left: 620px
    flex-direction: column
    &:hover
      .iconbot
        .botic
          animation: mirrorEffect .5s forwards ease-in-out 0s
    .iconbot
      display: flex
      justify-content: center
      align-items: center
      width: 48px
      height: 48px
      font-size: 25px
      color: #c2df93
      background-color: #063232
      border-radius: 50%
    .agencytxt
      color: #063232
      text-align: center
      width: 100px
      margin-top: 10px

  .inner-box
    width: 300px
    height: 350px
    border-radius: 10px
    overflow: hidden
    background-color: #114f4f
    position: absolute
    left: 360px
    bottom: 0px
    text-align: center
    z-index: 3
    @media (max-width: 850px)
      left: 0px
      top: 270px
      width: 100%
    .ellipse-path
      position: absolute
      content: ""
      width: 453px
      height: 453px
      background: rgba(255, 255, 255, .07)
      transition: all .4s ease-in-out
      border-radius: 50%
      bottom: -285px
      left: 50%
      transform: translateX(-50%)
    .bte
      z-index: 2
      position: absolute
      left: 50%
      transform: translateX(-50%)
      bottom: 0
    .kejit
      font-size: 14px
      color: #fff
      margin-top: 45px
    .qll
      font-size: 50px
      font-weight: 600
      color: #c2df93
      display: flex
      align-items: center
      justify-content: center
      .rotatearrows
        margin-left: 15px
        font-size: 24px
        color: #063232
        width: 42px
        height: 42px
        background-color: #c2df93
        border-radius: 50%
        display: flex
        align-items: center
        justify-content: center
  .info-box
    display: flex
    width: 310px
    height: 120px
    border-radius: 10px
    filter: drop-shadow(0px 20px 25px rgba(204, 219, 219, 0.3))
    background-color: #e5f5cc
    position: absolute
    bottom: 40px
    animation: jumpAni 4s linear infinite
    display: flex
    align-items: center
    justify-content: center
    .imgbox
      width: 70px
      height: 70px
      border-radius: 50%
    .righti
      margin-left: 12px
      color: #5a7779
      div
        &:first-child
          color: #063232
          font-size: 20px
          font-weight: 600
  .dot-shape
    position: absolute
    top: 119px
    left: 530px
    animation: jumpAni 4s linear infinite
  .mains
    height: 570px
    display: flex
    padding: 0 100px
    align-items: center
    @media (max-width: 850px)
      padding: 0 15px
      display: block
      height: 1070px
    .right
      width: 50%
      height: 100%
      @media (max-width: 850px)
        width: 100%
        margin-top: 50px

    .left
      width: 50%
      @media (max-width: 850px)
        width: 100%
      .leftf
        display: flex
        align-items: center
        font-size: 18px
        color: #063232
        img
          margin-right: 10px
      .leftt
        width: 520px
        font-weight: 600
        color: #063232
        font-size: 56px
        line-height: 64px
        margin: 20px 0
        @media (max-width: 850px)
          font-size: 32px
          width: 100%
          line-height: 40px
      .line
        width: 100%
        height: 1px
        background-color: rgba(6, 50, 50, 0.1)
        margin: 30px 0
        &::before
          position: absolute
          content: ""
          width: 60px
          height: 2px
          background: #e3572b
          transition: all .4s ease-in-out
          animation: moveBorder 10s linear infinite
      .texts
        color: #5a7779
      .btnbox
        display: flex
        align-items: center
        margin-top: 40px
        @media (max-width: 850px)
            display: block
        .liaojie
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
          cursor: pointer
          @media (max-width: 850px)
            width: 60%
            padding: 12px 35px
            margin-bottom: 12px
          &:hover
            background-color: #e3572b
            .effect-1
              div
                top: -20px
          .effect-1
            height: 20px
            overflow: hidden
            div
              position: relative
              margin-bottom: 5px
              top: 0
              transition: .3s
        .jinru
          display: flex
          align-items: center
          margin-left: 15px
          cursor: pointer

          .icon
            display: -webkit-box
            display: -ms-flexbox
            display: flex
            -webkit-box-pack: center
            -ms-flex-pack: center
            justify-content: center
            -webkit-box-align: center
            -ms-flex-align: center
            align-items: center
            width: 56px
            height: 56px
            border-radius: 50%
            background-color: #e3572b
            font-size: 24px
            color: #fff
            .icon-target
              display: inline-block
              width: 70px !important
              height: 70px !important
              position: relative
              filter: brightness(0) invert(1)
              &::before
                display: inline-block
                position: absolute
                content: ""
                left: 50%
                top: 50%
                width: 100%
                height: 100%
                transform: translate(-50%, -50%)
                background: url("@/assets/image/jqindex/icon-target.png") no-repeat center / cover
          .textjr
            color: #063232
            margin-left: 10px
            font-weight: 600
@keyframes moveBorder
  0%
    left: 0
  50%
    left: calc( 100% - 60px )
  100%
    left: 0
@keyframes mirrorEffect
  0%
    transform: scaleX(1)
    opacity: 1
  25%
    transform: scaleX(1.2)
    opacity: .9
  50%
    transform: scaleX(1)
    opacity: .7
  75%
    transform: scaleX(1)
    opacity: .85
  100%
    transform: scaleX(1)
    opacity: 1
@keyframes jumpAni
  0%
    transform: translateY(0)
  40%
    transform: translateY(-30px)
  100%
    transform: translateY(0)
</style>
