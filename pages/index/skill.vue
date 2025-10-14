<script setup>
const siteStore = useSiteStore()

const openChatBox = () => {
  window.open(siteStore.chatbox, '_blank')
}
</script>
<template>
  <div class="industry-page">
    <div class="industry-bnr">
      <img src="@/assets/image/index/industry-bnr.jpg" alt="" />
      <div class="industry-txt">
        <div class="bnr-tit">
          <h1>
            數位機器人技能庫
          </h1>
          <div class="nav">
            <div class="nav-item">
              <a @click="navigateTo('/')">返回首頁</a>
            </div>
            <img src="@/assets/image/index/nav-right.png" alt="">
            <div class="nav-item">
              <a>數位機器人技能庫</a>
            </div>
          </div>
        </div>
        <div class="bnr-txt">
          <img src="@/assets/image/jqindex/arrow-up-right.png" alt="">
          <p>人形機器人擁有多種技能實用且提高安全係數。</p>
        </div>
      </div>
    </div>
    <div class="flex-cont">
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics.mp4" type="video/mp4">
            </source>
          </video>
          <span>AMR載入</span>
        </div>
        <h1 class="hover-target">AMR載入</h1>
      </div>
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics_2.mp4" type="video/mp4">
            </source>
          </video>
          <span>AMR卸載</span>
        </div>
        <h1 class="hover-target">AMR卸載</h1>
      </div>
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics_3.mp4" type="video/mp4">
            </source>
          </video>
          <span>流動架裝載</span>
        </div>
        <h1 class="hover-target">流動架裝載</h1>
      </div>
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics_4.mp4" type="video/mp4">
            </source>
          </video>
          <span>流動架卸料</span>
        </div>
        <h1 class="hover-target">流動架卸料</h1>
      </div>
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics_5.mp4" type="video/mp4">
            </source>
          </video>
          <span>手提袋堆疊</span>
        </div>
        <h1 class="hover-target">手提袋堆疊</h1>
      </div>
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics_6.mp4" type="video/mp4">
            </source>
          </video>
          <span>週轉箱卸垛</span>
        </div>
        <h1 class="hover-target">週轉箱卸垛</h1>
      </div>
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics_7.mp4" type="video/mp4">
            </source>
          </video>
          <span>手提袋碼垛</span>
        </div>
        <h1 class="hover-target">手提袋碼垛</h1>
      </div>
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics_8.mp4" type="video/mp4">
            </source>
          </video>
          <span>週轉箱卸垛</span>
        </div>
        <h1 class="hover-target">週轉箱卸垛</h1>
      </div>
      <div class="cont-item">
        <div class="item-img">
          <video autoplay muted loop playsinline>
            <source src="@/assets/image/video/Agility Robotics_9.mp4" type="video/mp4">
            </source>
          </video>
          <span>貨箱嵌套</span>
        </div>
        <h1 class="hover-target">貨箱嵌套</h1>
      </div>

    </div>
  </div>
</template>
<style scoped lang="sass">

.container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl
  margin: 30px auto !important
  @media (min-width: 1400px)
    max-width: 1320px
.margin-30
  margin-block: 30px

.industry-page
  background-color: #ecf8f8
  display: block !important
.industry-bnr
  height: 60dvh
  position: relative
  &>img
    position: absolute
    top: 0
    left: 0
    width: 100%
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
    background-color: rgba(2, 27, 27, 0.7)
  .industry-txt
    position: absolute
    bottom: 30%
    left: 50%
    z-index: 2
    transform: translate(-50%, 0)
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 16px
    width: 1320px
    max-width: 100%
    padding: 0 15px
    @media (max-width:768px)
      display: block
      text-align: center
      .bnr-tit
        .nav
          justify-content: center
    .bnr-tit
      color: #ffffff
      h1
        font-size: 56px
        font-weight: bold
        text-align: center
        margin-bottom: 20px
      .nav
        display: flex
        align-items: center
        gap: 10px
        img
          width: 40px
          height: 10px
    .bnr-txt
      color: #90b4b6
.flex-cont
  max-width: 100%
  padding: 120px 15px
  width: 1320px
  margin: 0 auto
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 20px
  justify-content: space-between
  @media (max-width:768px)
    grid-template-columns: repeat(1, 1fr)
  .cont-item
    background-color: #fff
    border-radius: 10px
    overflow: hidden
    padding: 20px
    position: relative
    &:hover
      span
        background-color: #e3572b
    .item-img
      border-radius: 10px
      overflow: hidden
      video
        max-width: 100%
        height: auto
        aspect-ratio: 360 / 360
        object-fit: cover
    span
      position: absolute
      bottom: 10px
      left: 10px
      padding: 5px 15px
      transition: all .3s 
      background-color: #063232
      color: #fff
      font-size: 14px
      border-radius: 18px
  h1
    margin: 25px 15px 25px
    color: #063232
    font-weight: 600
    display: inline-block
    font-size: 24px
    &:hover
      &::before
        width: 100%
    &::before
      transition: all .4s ease
      content: ""
      position: absolute
      height: 2px
      width: 0
      left: 0
      bottom: -2px
      background-color: #063232
</style>
