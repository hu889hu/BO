<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
const PlayerStore = usePlayerStore()
const siteStore = useSiteStore()
const { signout } = useAuthStore()
const router = useRouter()
const homeRouter = ref('/')
const ticketStore = useTicketStore()
const { queryTicket } = ticketStore
const intervalId = ref(null)
const { queryChatbox, queryNews } = siteStore
const { locale } = useI18n()
const lang = locale.value
const { t } = useI18n()

const documentContent = ref([])
const playerWalletBalance = computed(() => {
  const findWallet = PlayerStore.playerInfo.wallet.find(
    (wallet: any) => wallet.type === 13
  )
  if (findWallet) {
    return Number(findWallet.balance)
  } else {
    return 0
  }
})
const isDashboard = computed(() => {
  return router.currentRoute.value.name === 'user'
})
const dashboardList = ref([
  {
    title: t('職員中心'),
    path: '/user',
    icon: '<i class="fa-brands fa-500px"></i>'
  },
  {
    title: t('技術中心'),
    path: '/game/warrants',
    icon: '<i class="fa-brands fa-500px"></i>'
  },
  {
    title: t('個人資訊'),
    path: '/user/info',
    icon: '<i class="fa-solid fa-gears"></i>'
  },
  {
    title: t('財務申請'),
    path: '/user/bank',
    icon: '<i class="fa-solid fa-handshake-angle"></i>'
  },
  {
    title: t('貨幣轉換'),
    path: '/user/conversion',
    icon: '<i class="fa-solid fa-handshake-angle"></i>'
  },
  {
    title: t('操作記錄'),
    path: '/user/record',
    icon: '<i class="fa-solid fa-file-invoice"></i>',
    childs: [
      {
        title: t('財務記錄'),
        path: '/user/record'
      },
      {
        title: t('工作記錄'),
        path: '/user/workrecord'
      }
    ]
  },
  {
    title: t('質押'),
    path: '/user/pledge',
    icon: '<i class="fas fa-coins"></i>'
  },
  {
    title: t('職員兌換區'),
    path: '/user/gift',
    icon: '<i class="fa-brands fa-facebook-messenger"></i>'
  },
  {
    title: t('登出帳號'),
    path: '/',
    icon: '<i class="fa-solid fa-file-invoice"></i>'
  }
])
await useAsyncData(async () => {
  console.log('user.vue useAsyncData')
  if (siteStore.siteData?.smsVerify === 1) {
    if (!PlayerStore.playerInfo?.smsVerify) {
      await navigateTo('/user/smsVerify')
    }
  }
  const path = 'user'
  await queryNews(lang, path)
})
const checkRouter = () => {
  console.log('router.currentRoute.value.name', router.currentRoute.value.name)
  if (router.currentRoute.value.name === 'user') {
    homeRouter.value = '/'
  } else {
    homeRouter.value = '/user'
  }
}
const displayedActivities = computed(() => {
  return siteStore.news.result
})
await onMounted(async () => {
  // setDocument()
  checkRouter()
  const queryChatboxPromise = queryChatbox()
  queryChatboxPromise
    .then((queryChatboxRes) => {
      // 處理響應結果
      console.log('queryChatboxRes', queryChatboxRes.data)
    })
    .catch((error) => {
      console.error('Error loading queryChatboxRes data:', error)
    })
})
onBeforeUnmount(() => {
  if (intervalId.value) {
    console.log('clearInterval queryTicket', intervalId.value)
    clearInterval(intervalId.value)
    intervalId.value = null
  }
})
const marqueeText = computed(() => {
  let text = ''
  for (let i = 0; i <= 5; i++) {
    if (!displayedActivities.value[i]) {
      break
    }
    text += displayedActivities.value[i].title + ' '
  }
  return text
})
watch(
  () => router.currentRoute.value.name,
  () => {
    checkRouter()
    // setDocument()
    if (siteStore.siteData?.smsVerify === 1) {
      if (!PlayerStore.playerInfo?.smsVerify) {
        return navigateTo('/user/smsVerify')
      }
    }
  }
)
const pledgeSocketStore = usePledgeSocketStore()

await onMounted(async () => {
  // 判斷gameType 是否有 5 pledge type
  if (siteStore.siteData?.gameType?.find((item: any) => item === 5)) {
    await pledgeSocketStore.startConnectWebSocket()
  }
})
onBeforeUnmount(() => {
  // 判斷gameType 是否有 5 pledge type
  if (siteStore.siteData?.gameType?.find((item: any) => item === 5)) {
    pledgeSocketStore.closeWebSocket()
  }
})
const walletName = (type) => {
  switch (type) {
    case 1:
      return siteStore.siteData.mainWalletType === type
        ? t('我的資產(電子錢包)')
        : t('美元資產(電子錢包)')
    case 2:
      return siteStore.siteData.mainWalletType === type
        ? t('我的資產(電子錢包)')
        : t('電力資產(電子錢包)')
    case 3:
      return siteStore.siteData.mainWalletType === type
        ? t('我的資產(電子錢包)')
        : t('商城資產(電子錢包)')
    case 4:
      return siteStore.siteData.mainWalletType === type
        ? t('我的資產(電子錢包)')
        : t('質押資產(電子錢包)')
    default:
      return t('其他資產')
  }
}
const news = ref([])

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
const gameWindowOpen = () => {
  window.open(`${window.location.origin}/game`, '_blank')
}
await useAsyncData(async () => {
  const path = 'user'
  const queryNewsRes = await queryNews(lang, path)
  news.value = queryNewsRes.data.result
  console.log('queryNewsRes.data', queryNewsRes.data)
})
const handleNavigateTo = (path: string) => {
  open.value = false
  if (path === '/') {
    signout()
    navigateTo(path)
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
  console.log('path', path);

  navigateTo(path)
}
const filterPledgeList = computed(() => {
  return dashboardList.value.filter(
    (item) =>
      item.path !== '/user/pledge' ||
      siteStore.siteData?.gameType?.find((item: any) => item === 5)
  )
})
console.log(PlayerStore.playerInfo, 'PlayerStore.playerInfo')

const open = ref(true)
const onOpen = () => {
  open.value = true
}
const onClose = () => {
  open.value = false
}
const openmenu = ref(false)
</script>

<template>
  <div class="content">
    <client-only>
      <nav>
        <div class="menu-flex">
          <div class="logo">
            <div style="margin-right: 20px" @click="open = !open" class="pc-jj" :class="open ? 'active' : ''">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span class="log-user" style="
                color: #147bad;
                display: inline-block;
                margin: 0 5px;
                font-weight: 600;
              ">
              <span style="margin-right: 5px">
                <i class="fa-solid fa-user"></i>
              </span>
              Hello,<span>{{ PlayerStore?.playerInfo?.username }}</span>
              $ {{ new Intl.NumberFormat('zh-TW').format(playerWalletBalance) }}
            </span>
          </div>
          <div class="menu-nav">
            <ul>
              <li v-for="item in filterPledgeList" :key="item.title" class="nav-sty black a-aim"
                :style="item.title == '職員中心' ? 'color: #299b8c' : ''" @click="handleNavigateTo(item.path)">
                <span>{{ item.title }}</span>
                <svg t="1759939619898" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="1542" width="20" height="20" v-if="item.childs?.length > 0">
                  <path
                    d="M116.736 282.624c8.192 0 16.384 3.072 22.528 9.216l372.736 372.73600001L884.736 291.84c6.144-6.144 13.824-9.216 22.528-9.216 8.192 0 16.384 3.072 22.528 9.216 12.288 12.288 12.288 32.256 0 44.544L534.528 732.16c-6.144 6.144-13.824 9.216-22.528 9.216-8.192 0-16.384-3.072-22.528-9.216L94.208 336.896c-12.288-12.288-12.288-32.256 0-44.544 6.144-6.144 14.336-9.728 22.528-9.728z"
                    fill="#2C2C2C" p-id="1543"></path>
                </svg>
                <div v-if="item.childs?.length > 0" class="geola">
                  <div v-for="(ite, index) in item.childs" :key="ite.title" @click.stop="handleNavigateTo(ite.path)">
                    <svg t="1759939340451" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="1542" width="20" height="20">
                      <path
                        d="M282.624 907.264c0-8.192 3.072-16.384 9.216-22.528l372.73600001-372.736L291.84 139.264c-6.144-6.144-9.216-13.824-9.216-22.528 0-8.192 3.072-16.384 9.216-22.528 12.288-12.288 32.256-12.288 44.544 0L732.16 489.472c6.144 6.144 9.216 13.824 9.216 22.528 0 8.192-3.072 16.384-9.216 22.528L336.896 929.792c-12.288 12.288-32.256 12.288-44.544 0-6.144-6.144-9.728-14.336-9.728-22.528z"
                        p-id="1543"></path>
                    </svg>
                    <span>{{ ite.title }}</span>
                  </div>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </nav>
      <router-view></router-view>
      <IndexFooter />
      <div class="sidebar" :class="open ? 'active' : ''" @click.self="onClose">
        <div class="ul-sidebar-header-nav-wrapper" :class="open ? 'active' : ''">
          <ul>
            <li v-for="item in filterPledgeList" :key="item.title" class="nav-sty black a-aim disfle"
              :style="item.title == '職員中心' ? 'background-color: #299b8c;color: #fff' : ''"
              @click="handleNavigateTo(item.path)">
              <div class="downbox">{{ item.title }}
                <span @click.stop="openmenu = true" v-if="item.title == '操作記錄'"><i
                    class="fa-solid fa-angle-down"></i></span>
              </div>
              <div @click.stop="handleNavigateTo(items.path)" v-if="openmenu" class="childsbox"
                v-for="items in item.childs">{{ items.title }}</div>
            </li>
          </ul>
        </div>
      </div>
    </client-only>
  </div>
</template>

<style scoped lang="sass">
// page
//   overflow: auto !important
.uk-slidenav::before 
  display: none !important
.content
  background-color: #fff
  width: 100dvw
  height: 100dvh
  // min-height: 100dvh
  overflow-y: auto
  .white
    color: #FFF

  .black
    color: #111111

  /* user

  // .user-t
  //   background: #0A0E21
  //   padding: 12px 0
  //   font-size: 16px
  //   margin-bottom: 26px
  .log-size
    /* font-size: 16px;

  .login-off, .login-no
    padding: 0 12px

  .login-off
    font-size: 14px

  .a-aim
    transition: all 0.3s ease 0s
    &:hover
      color: #059587

  .downbox
    display: flex
    justify-content: space-between
    span
      width: 40px
      height: 40px
      margin-top: -20px
      padding-left: 20px
      padding-top: 20px
  .childsbox
    padding: 0 12px
    margin-top: 20px
    color: #454554
    font-size: 100
  nav
    background-color: rgba(255, 255, 255, 1)
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
    position: sticky
    top: 0
    z-index: 18
  .menu-flex
    height: 84px
    max-width: 1200px
    margin: 0 auto
    width: 100%
    padding: 0 15px
    gap: clamp(20px, 2.1vw, 40px)
    display: flex
    align-items: center
    // flex-wrap: wrap
    justify-content: center
    @media (max-width: 992px)
      justify-content: space-between
  .logo
    display: flex
    align-items: center
    cursor: pointer
    // img
      // width: clamp(115px, 8.93vw, 100px)
      // min-width: 205px
    .pc-jj
      display: none
      span
        display: block
        width: 20px
        height: 2px
        background: #3a3f39
        margin: 4px 0
        transition: all 0.3s ease 0s
      &.active
        span
          &:nth-child(1)
            transform: rotate(45deg) translateY(8px) translateX(1px)
          &:nth-child(2)
            opacity: 0
          &:nth-child(3)
            transform: rotate(-45deg) translateY(-8px) translateX(-1px)
      @media (max-width: 992px)
        display: block
        

          
            
  .menu-nav
    display: flex
    align-items: center
    ul
      /* margin: 0 0 0 300px;
      display: flex
      flex-direction: row
      // flex-wrap: wrap
      padding: 0 0
      align-items: center
      gap: clamp(30px, 4.1vw, 50px)
      li
        font-weight: 600
        font-size: 17px
        font-weight: 600
        padding: 30px 0 
        display: flex
        align-items: center
        justify-content: center
        line-height: 1
        gap: 5px
        cursor: pointer
        white-space: nowrap
        position: relative
        &>.icon
          width: 10px
          height: 10px
          transition: all 0.3s ease 0s
        &:hover
          &>.icon
            transform: rotate(180deg)
          .geola
            transform: translateY(0)
            z-index: 32
            visibility: visible
        .geola
          transform: translateY(50%)
          position: absolute
          width: 290px
          background: #151515
          border-radius: 6px
          top: calc(100%)
          color: #8d909a
          font-size: 14px
          line-height: 38px
          overflow: hidden
          visibility: hidden
          left: -30px
          z-index: -8
          transition: all 0.3s ease 0s
          div
            padding: 10px 15px
            display: flex
            align-items: center
            font-size: 16px
            .icon
              opacity: 0
              width: 0px
              transition: all 0.3s ease 0s
              margin-right: 10px
            &:hover
              color: #fff
              .icon
                fill: #fff
                opacity: 1
                width: 10px
                height: 10px
        @media screen and (max-width: 991px)
          display: none
  .ul-sidebar-header-nav-wrapper
    display: none
    width: clamp(280px, 40vw, 100%)
    max-width: 100%
    background: #fff
    z-index: 32
    height: calc(100dvh - 84px)
    transform: translateX(-100%)
    transition: 0.4s ease
    &.active
      transform: translateX(0) !important
  @media screen and (max-width: 991px)
    .ul-sidebar-header-nav-wrapper
      display: block
      // margin-top: 15px
      // border-top: 1px solid rgba(0, 0, 0, 0.2)
      // border-left: 1px solid rgba(0, 0, 0, 0.2)
      // border-right: 1px solid rgba(0, 0, 0, 0.2)
      li
        font-weight: 600
        text-shadow: 0 4px 1px 5px rgba(0, 0, 0, 0.1)
        line-height: 1.2
        padding: 12px 15px 10px
        margin-block-end: 5px
        &:hover
          color: #fff
          background: #059587
        // border-bottom: 1px solid rgba(0, 0, 0, 0.2)
  // sidebar
  .sidebar
    position: fixed
    left: 0
    top: 84px
    bottom: 0
    overflow: auto
    transition: 0.4s ease
    // padding: clamp(20px, 1.58vw, 30px) clamp(20px, 1.58vw, 30px)
    width: 100%
    // border-left: 1px solid  #025189
    display: flex
    z-index: -1
    flex-direction: column
    // justify-content: space-between
    &.active
      background: rgba(0, 0, 0, 0.1)
      z-index: 30
    @media screen and (max-width: 991px)
      justify-content: start
 
  .ul-sidebar-header
    display: flex
    align-items: flex-end
    justify-content: space-between
    // border-bottom: 1px solid rgba(0, 0, 0, 0.2)
    padding-bottom: clamp(20px, 1.58vw, 30px)
  // .logo
    // width: clamp(115px, 8.93vw, 170px)

  .ul-sidebar-about .title
    font-weight: 600
    font-size: 24px
    margin-bottom: clamp(7px, 0.53vw, 10px)
  p
    line-height: 1.75
  .ul-sidebar-about p
    margin-bottom: 1rem
</style>
