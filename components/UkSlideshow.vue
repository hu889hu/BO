<template>
  <div class="uk-scope uk-position-relative uk-visible-toggle uk-light" tabindex="-1"
    :uk-slideshow="'animation: push;ratio:' + ratio" ref="swiper">
    <ul class="uk-slideshow-items">
      <li v-for="(item, index) in slides" :key="index" class="li-slide">
        <img :src="item.img" alt="" uk-cover />
        <div class="slide-cont">
          <div class="cont-box">
            <h5>
              <span v-html="item.toptitle"></span>
            </h5>
            <h1>
              <span v-html="item.title"></span>
            </h1>
            <!-- <h5>
              <span v-html="item.subtitle"></span>
            </h5> -->
            <div class="amin-btn go-game" @click="navigateTo(item.link)">
              <div class="content-original">
                進入系統
              </div>
              <div class="content-dubbed">
                進入系統
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="fix-btn">
      <a class="btn" uk-slideshow-item="previous">
        <svg t="1759912965876" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1512">
          <path
            d="M212.22741333 557.49290667l244.34005334 244.34005333a45.49290667 45.49290667 0 0 1-64.38912 64.38912l-321.78176-321.78176a45.49290667 45.49290667 0 0 1 0-64.38912l321.83637333-321.78176A45.49290667 45.49290667 0 0 1 456.56746667 222.54933333L212.71893333 466.50709333H921.6a45.49290667 45.49290667 0 1 1 0 91.04042667z"
            p-id="1513"></path>
        </svg>
      </a>
      <a class="btn" uk-slideshow-item="next">
        <svg t="1759912990957" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1672">
          <path
            d="M811.77258667 466.50709333l-244.34005334-244.34005333a45.49290667 45.49290667 0 0 1 64.38912-64.38912l321.78176 321.78175999a45.49290667 45.49290667 0 0 1 0 64.38912001l-321.83637333 321.78176A45.49290667 45.49290667 0 0 1 567.43253333 801.45066668L811.28106667 557.49290667 102.4 557.49290667a45.49290667 45.49290667 0 1 1 0-91.04042667z"
            p-id="1673"></path>
        </svg>
      </a>
    </div>
    <!-- <a class="uk-position-center-left uk-position-small uk-hidden-hover" uk-slidenav-previous
      uk-slideshow-item="previous"></a>
    <a class="uk-position-center-right uk-position-small uk-hidden-hover" uk-slidenav-next uk-slideshow-item="next"></a> -->
    <!-- <ul class="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    default: {}
  },
  ratio: {
    type: String,
    default: '16:9' // 預設比例16:9
  },
  slidenav: {
    type: Boolean,
    default: false
  },
  slides: {
    type: Array,
    default: () => []
  }
})

const slideshowRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (process.client) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/assets/uikit/uikit.min.css'
    document.head.appendChild(link)
  }
  await nextTick()
  initSlideshow()
})

const initSlideshow = () => {
  if (!process.client) return

  const UIkit = window.UIkit
  if (!UIkit || !slideshowRef.value) {
    console.error('UIkit not loaded:', !UIkit)
    console.error('DOM not ready:', !slideshowRef.value)
    return
  }

  // 初始化
  UIkit.slideshow(slideshowRef.value, {
    pauseOnHover: false,
    ...props.options
  })
}
// 監聽 ratio 變化
watch(() => props.ratio, initSlideshow)
</script>
<style scoped lang="sass">
.uk-icon
  svg
    &:nth-child(2)  
      display: none !important
.uk-slidenav::before 
  display: none !important
.uk-slideshow
  width: 100%
.uk-slideshow-nav
  position: absolute
  bottom: 5%
  right: 5%
.uk-dotnav>*>*
  border: none
  margin: 0 5px
  width: 15px
  height: 15px
  background-color: #dfdfdf
  border-radius: 0
:deep(.uk-dotnav>.uk-active>*)
  background-color: #7497b5 !important
  border: none
:deep(.uk-slideshow-items)
  .uk-active.uk-transition-active
    .slide-cont
      .cont-box
        &>*
          transform: translateY(0)
          opacity: 1
.uk-slideshow-items
  position: relative
  min-height: 330px
  height: 41.66667vw
  li.li-slide
    height: 100%
    &>img
      height: 100%
      object-fit: cover
    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      z-index: 1
      width: 100%
      height: 100%
      @media (max-width: 992px)
        background: linear-gradient(to right, rgba(41, 41, 58, 0.7), rgba(41, 41, 58, 0.4))
  .slide-cont
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)
    z-index: 2
    width: 100%
    .cont-box
      max-width: 1200px
      width: 100%
      padding: 20px
      margin: 0 auto
      &>*
        transition: all 0.3s ease
    h1
      opacity: 0
      transform: translateY(-20px)
      font-size: 58px
      color: #fff
      overflow: hidden
    h5
      opacity: 0
      transform: translateY(-20px)
      font-size: 20px
      color: #fff
      font-weight: 400
      padding: 0
      max-width: 400px
    .go-game
      opacity: 0
      transform: translateY(20px)
      border: 1px solid #fff
      color: #fff
      background-color: transparent
      font-size: 20px
      margin-top: 65px
      padding: 12px 35px
      &:hover
        background-color: #059587
        border-color: #059587
.fix-btn
  position: absolute
  width: 1200px
  max-width: 100%
  left: 50%
  padding: 0 20px
  transform: translateX(-50%)
  bottom: 10%
  z-index: 9
  display: flex
  align-items: center
  gap:30px
  .btn
    display: flex
    align-items: center
    padding: 10px
    font-size: 22px
    color: black
    font-weight: 400
    transition: all .3s ease
    .icon
      width: 35px
      height: 35px
      fill: #ffffff
      transition: all .3s ease
      &:hover
        fill: rgba(5, 149, 135)

.amin-btn
  color: #151515
  padding: 13px 35px
  font-size: 14px
  line-height: 1.25
  border: 1px solid #151515
  position: relative
  letter-spacing: 0.2em
  overflow: hidden
  white-space: nowrap
  border-radius: 6px
  text-overflow: ellipsis
  display: inline-block
  vertical-align: middle
  text-align: center
  font-weight: 700
  transition: 0.25s 
  &:hover
    color: #fff
    background-color: #151515
    border-color: #151515
    .content-original
      opacity: 0
      transform: translate3d(0, -30%, 0)
    .content-dubbed 
      opacity: 1
      transform: translate3d(0, 0, 0) translateY(-50%)
      
  .content-original,.content-dubbed
    vertical-align: middle
    transition: transform 0.3s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.2, 1, 0.3, 1)
  .content-original
    opacity: 1
    transform: translate3d(0, 0, 0)
  .content-dubbed
    position: absolute
    width: 100%
    top: 50%
    left: 0
    opacity: 0
    transform: translate3d(0, 0, 0)
@media (max-width: 1200px)
  .uk-slideshow-items
    .slide-cont
      height: 100%
      .cont-box
        height: 100%
        h1
          font-size: 40px !important
        h5
          font-size: 16px !important
        .go-game
          margin-top: 20px
          
</style>
