<template>
  <div @wheel="handleWheel" style="width: 100dvw;">
    <swiper v-if="isMounted && slides.length" :modules="modules" class="mySwiper" :speed="1000"
      :slides-per-view="'auto'" :space-between="25" :pagination="{ clickable: true }" :loop="true" @swiper="onSwiper">
      <swiper-slide v-for="(item, index) in slides" :key="index" :class="`slide${index + 1}`">
        <!-- <div class="cardItem"> -->
        <!-- <div class="infotitle">
            <p class="comment">
              <span style="font-size: 22px;">{{ item.title }}</span>
              <br>
            <p v-for="value in item.text">{{ value }}</p>
            </p>
          </div> -->
        <div class="infoItem">
          <img class="swiperimg" :src="item.src" alt="">
          <div class="info-content">
            <div class="icon-box">
              <img class="icon-target-goal" src="@/assets/image/jqindex/target-goal.png" alt="">
              <div class="borders"></div>
              <div class="info">
                <div class="category">{{ item.title }}</div>
                <h5 class="titles">{{ item.text }}</h5>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </swiper-slide>
    </swiper>
    <div class="swiper-navigation">
      <span class="line"></span>
      <div class="nav-container">
        <button class="nav-button prev-button hover-target" @click="slidePrev">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="transform: rotate(180deg);" class="nav-icon">
            <g clip-path="url(#clip0_89_590)">
              <path
                d="M12.3375 3.8374L11.5803 4.59467L14.95 7.96438H0V9.03533H14.95L11.5803 12.405L12.3375 13.1623L17 8.49982L12.3375 3.8374Z" />
            </g>
            <defs>
              <clipPath id="clip0_89_590">
                <rect width="17" height="17" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button class="nav-button next-button hover-target" @click="slideNext">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="nav-icon">
            <g clip-path="url(#clip0_89_590)">
              <path
                d="M12.3375 3.8374L11.5803 4.59467L14.95 7.96438H0V9.03533H14.95L11.5803 12.405L12.3375 13.1623L17 8.49982L12.3375 3.8374Z" />
            </g>
            <defs>
              <clipPath id="clip0_89_590">
                <rect width="17" height="17" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <span class="line"></span>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import { Scrollbar, Autoplay, Mousewheel } from 'swiper/modules'

export default {
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiper: null,
      isMounted: false,
      mousewheeldata: {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: true,
        eventsTarget: 'container'
      }
    }
  },
  mounted() {
    this.isMounted = true;
  },
  beforeUnmount() {
    this.isMounted = false;
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  },
  setup() {
    return {
      modules: [Autoplay, Mousewheel]
    }
  },
  methods: {
    handleWheel(event) {
      // console.log(event.deltaY, 'event.deltaY');
      if (event.deltaY > 0) {
        this.slideNext()
      } else {
        this.slidePrev()
      }
    },
    onSwiper(swiper) {
      this.swiper = swiper
    },
    slideNext() {
      if (this.swiper) {
        this.swiper.slideNext()
      }
    },
    slidePrev() {
      if (this.swiper) {
        this.swiper.slidePrev()
      }
    }
  }
}

</script>

<style scoped lang="sass">

.swiper
  width: 100%
  // height: 100%

.swiper-slide 
  width: 648px
  text-align: center
  font-size: 18px
  // background: #fff
  display: flex
  justify-content: center
  align-items: center
  @media (max-width: 768px)
    width: 100%
    padding: 0 2%
  &.slide1
    .cardItem
      .infotitle
        background: #43a4df !important
  &.slide2
    .cardItem
      background: rgb(218, 250, 253) !important
      .infotitle
        background: #33355c !important
        &::after
          border-right-color: #33355c
          border-top-color: #33355c
  &.slide3
    .cardItem
      background: rgb(255, 230, 239) !important
      .infotitle
        background: #f9608c !important
        &::after
          border-right-color: #f9608c
          border-top-color: #f9608c
  &.slide4
    .cardItem
      .infotitle
        background: #33355c !important
        &::after
          border-right-color: #33355c
          border-top-color: #33355c
  .cardItem
    background: beige
    display: block
    color: #121214
    border: 1px solid #f5f7fa
    transition: all .17s cubic-bezier(.52,.07,.45,2.35)
    cursor: pointer
    margin: 0 0 24px 0
    padding: 20px
    .infotitle
      border-radius: 0px
      position: relative
      background-color: #43a4df
      padding: 15px
      padding-top: 5px
      margin-bottom: 30px
      text-align: left
      &::after
        content: ''
        width: 0
        height: 0
        border-width: 20px
        border-style: solid
        border-top-color: #43a4df
        border-left-color: transparent
        border-right-color: #43a4df
        border-bottom-color: transparent
        position: absolute
        bottom: 0
        top: calc(100% - 15px)
        left: 30px
      .comment
        margin-bottom: 0
        color: white
        font-size: 15px
        line-height: 1.5
        margin-top: 10px
  .infoItem
    // width: 300px
    border-radius: 10px
    overflow: hidden
    @media (max-width: 768px)
      width: 100%
    
    &:hover
      .swiperimg
        transform: scale(1.1) rotate(-2deg)
      &::after
        height: 100%
        opacity: 0
        transition: all 400ms linear
    &::after
      background-color: rgba(255, 255, 255, .3)
      content: ""
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 0
      opacity: 1
      z-index: 9
      pointer-events: none
    img
      width: 100%      
      border-radius: 10px
      transition: all .4s ease 0s
    .info-content
      width: 540px
      padding: 30px 42px
      background-color: #114f4f
      border-radius: 10px
      border-top-right-radius: 0
      margin-left: auto
      margin-top: -62px
      position: relative
      display: flex
      align-items: center
      @media (max-width: 768px)
        width: 100%
        padding: 20px
      .icon-box
        display: inline-flex
        gap: 10px
        align-items: center
        .icon-target-goal
          width: 46px !important
          height: 46px !important
        .borders
          width: 2px
          height: 68px
          background-color: #296161
          margin: 0 30px 0 40px
          @media (max-width: 768px)
            display: none
        .info
          text-align: left
          .category
            font-size: 14px
            color: #fff
            position: relative
            padding-left: 46px
            margin-bottom: 8px
            &::before
              position: absolute
              content: ""
              width: 36px
              height: 1px
              background: #c2df93
              transition: all .4s ease-in-out
              left: 0
              top: 50%
          .titles
            font-size: 22px
            color: #fff
            white-space: nowrap
            @media (max-width: 768px)
              white-space: normal
.swiper-navigation
  position: relative
  max-width: 1320px
  margin: 40px auto 0
  height: 50px
  display: flex
  align-items: center
  .line
    width: 100%
    width: 100%
    height: 1px
    background: rgba(255, 255, 255, 0.10)
  .nav-container
    min-width: 140px
    .nav-icon
      fill: white
      transition: all .4s ease 0s
  .title
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    text-align: center
    margin-bottom: 20px
    p
      font-size: 22px
      padding: 0 40px
      position: relative
      color: #f9608c
      &::before,&::after
        content: ''
        width: 20px
        height: 2px
        background-color: #f9608c
        display: block
        z-index: 1
        position: absolute
        top: calc( 50% - 1px )
        left: 0
      &::after
        left: auto
        right: 0
        
    h2
      font-size: 30px
      color: #33355c

.nav-button
  position: absolute
  top: 50%
  transform: translateY(-50%)
  width: 50px
  height: 50px
  border-radius: 50%
  background: #72c0f0
  border: none
  cursor: pointer
  z-index: 10
  display: flex
  align-items: center
  justify-content: center
  border:1px solid rgba(255, 255, 255, 0.10)
  background-color: rgba(255, 255, 255, 0.10)
  color: white
  transition: all .4s ease 0s
  &:hover
    .nav-icon
      fill: #dd552e !important

.prev-button
  left: 10px

.next-button
  right: 10px

.arrow-left,
.arrow-right
  border: solid white
  border-width: 0 2px 2px 0
  display: inline-block
  padding: 5px

.arrow-left
  transform: rotate(135deg)
  -webkit-transform: rotate(135deg)

.arrow-right
  transform: rotate(-45deg)
  -webkit-transform: rotate(-45deg)
</style>
