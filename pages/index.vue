<script lang="ts" setup>
// import documentContent from '@/assets/document/index.js'
// const documentContentData = computed(() => {
//   return documentContent()
// })
const router = useRouter()
const { isLogin } = useAuthStore()

const siteStore = useSiteStore()
const { queryChatbox } = siteStore
const referrerCodeCookiee = useCookie('referrerCode', {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
}) as any
const accessTokenCookie = useCookie('accessToken', {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
}) as any
const mobileNavOpen = ref(false)
const { t } = useI18n()
const headerNavList = ref([
  {
    title: `${t('數位機器人首頁')}`,
    router: '/'
  },
  {
    title: `${t('產業分配與製造業')}`,
    router: '/industry'
  },
  {
    title: `${t('數位機器人技能庫')}`,
    router: '/skill'
  },
  {
    title: `${t('我們的解決方案')}`,
    router: '/solution'
  },
  {
    title: `${t('關於我們的技術')}`,
    router: '/about'
  },
  {
    title: `${t('福利兌換區')}`,
    router: 'welfare'
  },
  // {
  //   title: `${t('聯係客服')}`,
  //   router: 'customer'
  // }
])
const handleNavigateTo = (path: string) => {
  open.value = false
  if (path === 'welfare') {
    window.open("https://24h.pchome.com.tw/region/DSAM?utm_source=google&utm_medium=cpc&utm_campaign=awo_mkt_conversion_3c_nb_all_gg_sem_mix_dsa&gad_source=1&gad_campaignid=21877910807&gbraid=0AAAAADMP-EIvsNacysTBpiBWjtkfAla8A&gclid=EAIaIQobChMI5PCsjveMkAMVUTWDAx0Q7iuPEAAYASAAEgKWLfD_BwE")
    return
  }
  if (path === 'customer') {
    openChatBox()
    return
  }
  if (path === 'game') {
    gameWindowOpen()
    return
  }
  navigateTo(path)
}
const openChatBox = () => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  if (urlPattern.test(siteStore.chatbox)) {
    window.open(siteStore.chatbox, '_blank')
  }
}
const mousePos = ref({ x: 0, y: 0 }) // 鼠标实时坐标
const isHovering = ref(false)       // 是否悬停在目标元素上
const elementSize = ref(10); // 主元素默认大小
// action
await onMounted(async () => {
  if (router.currentRoute.value.query.referrer) {
    referrerCodeCookiee.value = router.currentRoute.value.query.referrer
  }
  await queryChatbox()
  window.addEventListener('mousemove', (e) => {
    mousePos.value = { x: e.clientX, y: e.clientY }
  })
  // 事件委托到document（覆盖所有动态元素，包括router-view内）
  document.addEventListener('mouseover', handleMouseOver)
  document.addEventListener('mouseout', handleMouseOut)
})
const handleMouseOver = (e) => {
  // 检查目标或其祖先是否是悬停对象（.hover-target）
  if (e.target.closest('.hover-target')) {
    isHovering.value = true
  }
}
const followerStyle = computed<StyleValue>(() => ({
  // 主元素基础样式
  width: `${elementSize.value}px`,
  height: `${elementSize.value}px`,
  position: 'fixed',
  top: `${mousePos.value.y - elementSize.value / 2}px`,
  left: `${mousePos.value.x - elementSize.value / 2}px`,
  zIndex: 9999

}));
const handleMouseOut = (e) => {
  const target = e.target.closest('.hover-target')
  if (target) {
    // 确保鼠标**真正离开**目标元素（而非进入其子元素）
    if (!target.contains(e.relatedTarget)) {
      isHovering.value = false
    }
  }
}
onUnmounted(() => {
  // 清理事件（避免内存泄漏）
  window.removeEventListener('mousemove', () => { })
  document.removeEventListener('mouseover', handleMouseOver)
  document.removeEventListener('mouseout', handleMouseOut)
  if (window) {
    window.removeEventListener('scroll', handleScroll)
  }
})
const gameWindowOpen = () => {
  if (accessTokenCookie) {
    window.open(`${window.location.origin}/game`, '_blank')
  } else {
    navigateTo('/login')
  }
}
const { locale } = useI18n()
const changeLang = () => {
  locale.value = 'en_US'
}

const open = ref(false)
const onOpen = () => {
  open.value = true
}
const onClose = () => {
  open.value = false
}

const pageRef = ref()
const isWhite = ref()
const isTop = ref()
const handleScroll = () => {
  isTop.value = pageRef.value.scrollTop > 500
  isWhite.value = pageRef.value.scrollTop
}
onMounted(() => {
  pageRef.value.addEventListener('scroll', handleScroll)
})
const upTo = () => {
  pageRef.value.scrollTop = 0
}
const videobox = ref(true)
</script>

<template>
  <div ref="pageRef" class="page">
    <client-only>
      <div class="cursor-follower" :style="followerStyle" :class="isHovering ? 'hover-round' : ''"></div>
      <div class="pagevideo" v-if="videobox">
        <video autoplay muted loop>
          <source src="@/assets/image/home1/homevideo.mp4" type="video/mp4" />
        </video>
        <div class="btntb">
          <div class="videotitle">
            探索智能領域
          </div>
          <div class="cta-btn" @click="videobox = false">
            進入網站
          </div>
        </div>
      </div>
      <!-- <document :content="documentContentData"></document> -->
      <!-- <index-header /> -->
      <!-- <index-mobile-header /> -->
      <!-- <div v-if="!isLogin()" class="user-t white">
        <a class="login-off a-aim white" @click="navigateTo('/login')">
          <span style="margin-right: 5px">
            <i class="fa-solid fa-award" style="color: #0e63ff"></i>
          </span>
          職員登入
        </a>
      </div> -->
      <div :class="{ sticky: isWhite > 200 }">
        <div class="menu-flex">
          <div class="logo">
            <img :src="siteStore?.siteData.logo" alt="" />
          </div>
          <div class="menu-nav">
            <ul>
              <li v-for="item in headerNavList" :key="item.title" class="hover-target">
                <a class="nav-sty black a-aim" @click="handleNavigateTo(item.router)">{{ $lang(item.title) }}</a>
              </li>
            </ul>
            <div class="sid" @click="onOpen">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <a class="white hover-target" @click="navigateTo('/user')">
            <div class="menu-btn">
              <div class="effect-1">
                <div>{{ $lang('進入科技系統') }}</div>
                <div>{{ $lang('進入科技系統') }}</div>
              </div>
              <i class="fa-solid fa-arrow-right" style="color: #fff;margin-left: 8px;font-size: 16px;"></i>
            </div>
          </a>
        </div>
      </div>

      <div class="page-body">
        <router-view></router-view>
      </div>
      <!-- <index-footer /> -->
      <footer>
        <section class="vw3-content">
          <div class="slider__marquee">
            <div class="marquee-wrapper">
              <div class="marquee" style="margin-right: 0px; float: left;">
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> AMR Loading</li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> AMR Unloading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Flow Rack
                  Loading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Flow Rack
                  Unloading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Stacking
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Destacking
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Palletizing
                </li>
              </div>
              <div class="marquee" style="margin-right: 0px; float: left;">
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> AMR Loading</li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> AMR Unloading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Flow Rack
                  Loading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Flow Rack
                  Unloading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Stacking
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Destacking
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Palletizing
                </li>
              </div>
              <div class="marquee" style="margin-right: 0px; float: left;">
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> AMR Loading</li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> AMR Unloading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Flow Rack
                  Loading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Flow Rack
                  Unloading
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Stacking
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Destacking
                </li>
                <li class="item m-item"><img class="icon" src="@/assets/image/index/home11.png" alt=""> Tote Palletizing
                </li>
              </div>
            </div>
          </div>
        </section>
        <div class="footer-bottom">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <p class="mb-0">© 2025 Agility Robotics</p>
              </div>
              <div class="col-md-6 text-md-end">
                <div class="footer-policy">
                  <a href="skill.html">機器人技能庫</a>
                  <a href="us.html">我們的科技技術</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!-- top -->
      <button v-if="isTop" class="scroll-top scroll-to-target open hover-target" data-target="html" @click="upTo">
        <svg t="1760111967705" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1542" width="20" height="20">
          <path
            d="M469.3504 230.9632l-229.0688 229.0688a42.6496 42.6496 0 0 1-60.3648-60.3648l301.6704-301.6704a42.6496 42.6496 0 0 1 60.3648 0l301.6704 301.7216A42.6496 42.6496 0 0 1 783.36 460.032L554.6496 231.424 554.6496 896a42.6496 42.6496 0 1 1-85.3504 0z"
            fill="#063232" p-id="1543"></path>
        </svg>
      </button>
      <!-- 彈出 -->
      <div class="wrapper" :class="open ? 'active' : ''" @click.self="onClose"></div>
      <div class="sidebar" :class="open ? 'active' : ''">
        <div class="ul-sidebar-header">
          <div class="ul-sidebar-header-logo"></div>
          <button class="ul-sidebar-closer" @click="onClose">
            <i class="fa-solid fa-xmark fa-xl" style="color: #fff"></i>
          </button>
        </div>
        <div class="ul-sidebar-header-nav-wrapper">
          <ul>
            <li v-for="item in headerNavList" :key="item.title">
              <a class="nav-sty black a-aim" @click="handleNavigateTo(item.router)">{{ $lang(item.title) }}</a>
            </li>
            <hr>
            <li style="display: flex;justify-content: flex-start;border: none;">
              <a class="white hover-target" @click="navigateTo('/user')">
                <div class="menu-btn">
                  <div class="effect-1">
                    <div>{{ $lang('進入科技系統') }}</div>
                    <div>{{ $lang('進入科技系統') }}</div>
                  </div>
                  <i class="fa-solid fa-arrow-right" style="color: #fff;margin-left: 8px;font-size: 16px;"></i>
                </div>
              </a>
            </li>
            <!-- <li>
              <a class="nav-sty black a-aim" @click="handleNavigateTo('/user')"><span style="
                    border: 1px solid;
                    padding: 6px;
                    background-color: rgb(208, 233, 255);
                    border-radius: 5px;
                  ">{{ $lang('職員系統') }}</span></a>
            </li> -->
          </ul>
        </div>
      </div>
    </client-only>
  </div>
</template>
<style scoped lang="sass">
.vw3-content
  overflow: hidden
  width: 100%
  @keyframes marqueeAnimat
    100%
      transform: translateX(-100%)
  .slider__marquee
    .marquee-wrapper
      // width: 100%
      transform: translateX(0px)
      display: flex
      align-items: center
      flex-wrap: nowrap
      padding: 40px 0
      gap: 30px
      animation: 46.0375s linear 0s infinite normal none running marqueeAnimat
      &:hover
        animation-play-state: paused
      .marquee
        display: flex
        align-items: center
        flex-wrap: nowrap
        gap: 30px
        .m-item
          margin-right: 35px
          font-size: 24px
          color: #f4f8ec
          font-weight: 600
          text-transform: uppercase
          display: inline-flex
          white-space: nowrap
          align-items: center
          img.icon
            margin-right: 30px
.footer-bottom
  border-top: 1px solid rgba(255, 255, 255, 0.10)
  padding: 23px 0
  background-color: #063232
  position: relative
  overflow: hidden
  .container
    max-width: 1320px
    margin: 0 auto
    display: flex
    align-items: center
    width: 100%
    padding: 0 15px
    color: #90b4b6
    font-size: 15px
    .row
      width: 100%
      display: flex
      align-items: center
      justify-content: space-between
      @media screen and (max-width: 768px)
        flex-direction: column !important
      .footer-policy
        a
          line-height: 16px
          padding: 0 10px
          &:nth-child(1)
            border-inline-end: 2px solid #90b4b6
            
</style>
<style>
.cursor-follower {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 20px;
  height: 20px;
  background-color: #e3572b;
  background-repeat: no-repeat;
  background-size: 25px 25px;
  background-position: center center;
  display: block;
  user-select: none;
  pointer-events: none;
  border-radius: 100px;
  opacity: 1;
  transition: all .05s ease-in, opacity .5s ease-in, transform .5s ease-in;
  /* border: 1px solid #FBAB04; */
  transform: scale(1)
}

.hover-round {
  transform: scale(5.5);
  opacity: 0;
}
</style>
<style lang="sass">

body
  // background-color: #08001a

  a,
  button
    cursor: pointer
</style>

<style lang="sass">
.only-pc
  display: none

@media screen and (min-width: 768px)
  .only-mobile
    display: none !important

  .only-pc
    display: flex
</style>

<style scoped lang="sass">
@import '@/assets/sass/index/index.sass'
.sticky
  position: sticky
  top:0
  z-index: 99
  background-color: #063232
  box-shadow: 0 0 20px #fff
  animation: 1000ms ease-in-out 0s normal none 1 running fadeInDown
  .menu-flex
    padding: 0
@keyframes fadeInDown
  0%
    opacity: 0
    -webkit-transform: translate3d(0,-100%,0)
    transform: translate3d(0,-100%,0)
  to
    opacity: 1
    -webkit-transform: translateZ(0)
    transform: translateZ(0)
// sidebar
.sidebar
  position: fixed
  left: 0
  top: 0
  bottom: 0
  height: 100%
  overflow: auto
  background: #063232
  z-index: 999
  transform: translateX(-100%)
  transition: 0.4s ease
  padding: clamp(20px, 1.58vw, 30px) 0
  max-width: 100%
  display: flex
  flex-direction: column
  justify-content: space-between
  width: clamp(320px, 40vw, 100%)
  @media screen and (max-width: 991px)
    justify-content: start
.ul-sidebar-closer
  transition: all 1.4s ease
  padding: 8px 12px
  border: 2px solid #fff
  border-radius: 50%
.active
  transform: translateX(0) !important
  .ul-sidebar-closer
    transform: rotateZ(360deg)
.ul-sidebar-header
  display: flex
  align-items: flex-end
  justify-content: space-between
  border-bottom: 1px solid rgb(0 0 0 / 10%)
  padding-bottom: clamp(20px, 1.58vw, 30px)
  padding-right: 20px
.ul-sidebar-header-nav-wrapper
  ul li
    font-weight: bold
    padding: 10px clamp(20px, 1.58vw, 30px)
    position: relative
    display: block
    border-bottom: 1px solid rgb(0 0 0 / 10%)

.wrapper
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  height: 0%
  background-color: rgba(0, 0, 0, .3)
  &.active
    opacity: 1
    height: 100%
.page
  scroll-behavior: smooth
  // background: url('@/assets/image/index/body.jpg') top no-repeat #fff
  position: relative
  width: 100dvw
  height: 100dvh
  overflow-y: auto
  display: flex
  flex-direction: column
  background-color: #063232

.scroll-top
  width: 50px
  height: 50px
  line-height: 50px
  position: fixed
  bottom: 0%
  right: 50px
  font-size: 16px
  border-radius: 6px
  z-index: 99
  color: #063232
  text-align: center
  cursor: pointer
  background: #fff
  border-radius: 50%
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)
  border: 2px solid #e3572b
  transition: 1s ease
  animation: 1000ms ease-in-out forwards fadeInDown2
  display: flex
  align-items: center
  justify-content: center
  .icon
    width: 24px
    height: 24px
    fill: #063232
    font-weight: bold
@keyframes fadeInDown2
  0%
    opacity: 0
    transform: translateZ(0)
  to
    opacity: 1
    transform: translate3d(0,-100%,0)

.pagevideo
  position: fixed
  z-index: 999
  width: 100dvw
  height: 100dvh
  overflow: hidden
  video
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
  .btntb
    top: 50%
    left: 50%
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)
    .videotitle
      font-size: 5.8rem
      font-weight: 600
      background: linear-gradient(90deg,#fff,#ccc)
      animation: bounceIn 5.5s ease-out forwards, shine 2s 1.6s ease-out forwards
      overflow: hidden
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
      &::before
        content: ''
        position: absolute
        top: 0
        left: -75%
        width: 50%
        height: 100%
        background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%)
        transform: skewX(-20deg)
        animation: sweep 1.2s 2s ease-out forwards
    .cta-btn
      margin: 0 auto
      margin-top: 30px
      width: 176px
      padding: 12px 28px
      font-size: 30px
      color: #fff
      background: linear-gradient(90deg, #08c757, #017c3f)
      border-radius: 30px
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2)
      text-decoration: none
      opacity: 0
      transform: translateY(20px)
      animation: fadeInUp 1.2s 2.4s forwards
      transition: transform .3s, box-shadow .3s
      cursor: pointer
@keyframes bounceIn
  0%
    opacity: 0
    transform: scale(0.6) translateY(-40px)
  60%
    opacity: 1
    transform: scale(1.1) translateY(10px)
  80%
    transform: scale(0.95) translateY(-5px)
  100%
    transform: scale(1) translateY(0)
    opacity: 0
@keyframes shine
  0%
    background-position: -200%
  100%
    background-position: 200%
@keyframes sweep
  100%
    left: 130%
@keyframes fadeInUp
  100%
    opacity: 1
    transform: translateY(0)
</style>
