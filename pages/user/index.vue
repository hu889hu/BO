<script lang="ts" setup>
const { $swiper } = useNuxtApp()
const router = useRouter()
const siteStore = useSiteStore()
const { locale, t } = useI18n()
const lang = locale.value
const { queryNews } = useSiteStore()
const news = ref([])
const { signout } = useAuthStore()



// methods
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
const filterPledgeList = computed(() => {
  return dashboardList.value.filter(
    (item) =>
      item.path !== '/user/pledge' ||
      siteStore.siteData?.gameType?.find((item: any) => item === 5)
  )
})



import swiper1 from '@/assets/image/index/swiper1.jfif'
import swiper2 from '@/assets/image/index/swiper2.jfif'
import swiper3 from '@/assets/image/index/swiper3.jfif'
const slides = ref([
  {
    id: '1',
    toptitle: '一個孩子可以更早得到診斷的機會',
    title: '讓醫療平權 <br/> 讓生命被守護',
    subtitle: '在全球各地，許多偏鄉與資源不足的地區，醫療院所普遍面臨設備老舊、檢測能力有限、缺乏專業醫療器材的困境。<br/> 國際大型醫院正快速導入智慧醫療、AI 診斷與高端設備時，偏鄉醫院卻仍在努力維持最基本的醫療服務。這種差距，正是需要被彌補的地方。',
    img: swiper1,
    link: '/game/warrants'
  },
  {
    id: '2',
    toptitle: '一個家庭能減少失去親人的痛苦',
    title: '不只是技術投資 <br/> 更是公益行動',
    subtitle: '「醫療設備升級」不只是技術投資，更是一種 公益行動。每一台更新的檢測儀器、每一項智慧晶片的導入，背後代表的都是:<br/>一個孩子可以更早得到診斷的機會<br/>一位長者能夠避免延誤治療的風險<br/>一個家庭能減少失去親人的痛苦<br/>讓醫療平權、讓生命被守護。這份努力，不該只侷限於城市，更要走進偏鄉、跨越國界，把科技的光亮帶到最需要的角落。',
    img: swiper2,
    link: '/game/warrants'
  },
  {
    id: '3',
    toptitle: '提供最有價值的操作系統與決策',
    title: '綜合服務<br/>與堅強實力',
    subtitle: '全球領先的金融服務公司為全球100多個國家和地區的重要公司、政府和機構提供解決方案',
    img: swiper3,
    link: '/game/warrants'
  }
])

const realIndex = ref()
const activeIndex = ref()
onMounted(() => {


})



</script>
<template>
  <div class="dashboard">
    <main>
      <div class="swp-vw">
        <div class="v-margin">
          <div class="left-swp">
            <div class="imgs">
              <client-only>
                <UkSlideshow :options="{ autoplay: false }" :slides="slides" />
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <div class="introduction">
        <div class="introduction-cont">
          <div class="introduction-left">
            <h1 class="title">
              基於基礎融合智能技術的
              <br />
              自動化平台
            </h1>
            <h3>
              透過雲端實現業界領先的安全性
            </h3>
            <p>
              自動化的巨大提升來自智能解決方案。這意味著不僅僅是一個機器人，而是硬體（機器人、配件、工業設備）、軟體（人工智慧、機器人軟體、自動化平台、整合）和服務（設計、調試、操作、轉換、支援）的組合，皆在可靠地解決特定行業的問題。
            </p>
            <div class="btn-group">
              <div class="amin-btn btn-green" @click="navigateTo('/user/record')">
                <div class="content-original">
                  工作記錄
                </div>
                <div class="content-dubbed">
                  工作記錄
                </div>
              </div>
              <div class="amin-btn btn-black" @click="navigateTo('/game/warrants')">
                <div class="content-original">
                  進入系統
                </div>
                <div class="content-dubbed">
                  進入系統
                </div>
              </div>
            </div>
          </div>
          <div class="introduction-right">
            <div class="introduction-right-img">
              <img src="@/assets/image/index/banr-rig.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="lis-cont">
        <ul>
          <li>
            <h3>數位的創新結合商業應用 </h3>
          </li>
          <li>
            <div class="amin-btn btn-black" @click="navigateTo('/user/bank')">
              <div class="content-original">
                財務申請
              </div>
              <div class="content-dubbed">
                財務申請
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="settings">
        <div class="settings-cont">
          <div class="settings-item">
            <div class="settings-smal-img">
              <div class="img-cont">
                <h3>技術中心</h3>
                <p>進入科技系統，數位的創新結合商業應用，創造更便利的時代也引領著科技的進步</p>
                <div class="amin-btn btn-add" @click="navigateTo('/game/warrants')">
                  <div class="content-original">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                  <div class="content-dubbed">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img src="@/assets/image/index/setting1.jfif" alt="">
            </div>
            <div class="settings-big-img">
              <div class="img-cont">
                <h3>財務紀錄</h3>
                <p>您的財務申請紀錄</p>
                <div class="amin-btn btn-add" @click="navigateTo('/user/record')">
                  <div class="content-original">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                  <div class="content-dubbed">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img src="@/assets/image/index/setting2.jfif" alt="">
            </div>
          </div>
          <div class="settings-item">
            <div class="settings-big-img">
              <div class="img-cont">
                <h3>個人資訊</h3>
                <p>查閱您的帳戶資訊，與修改系統密碼</p>
                <div class="amin-btn btn-add" @click="navigateTo('/user/info')">
                  <div class="content-original">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                  <div class="content-dubbed">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img src="@/assets/image/index/setting3.jfif" alt="">
            </div>
            <div class="settings-smal-img">
              <div class="img-cont">
                <h3>登出帳戶</h3>
                <p>登出當前帳號</p>
                <div class="amin-btn btn-add" @click="signout()">
                  <div class="content-original">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                  <div class="content-dubbed">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img src="@/assets/image/index/setting4.jfif" alt="">
            </div>
          </div>
          <div class="settings-item">
            <div class="settings-smal-img">
              <div class="img-cont">
                <h3>財務申請</h3>
                <p>您的財務申請表單</p>
                <div class="amin-btn btn-add" @click="navigateTo('/user/bank')">
                  <div class="content-original">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                  <div class="content-dubbed">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img src="@/assets/image/index/setting5.jfif" alt="">
            </div>
            <div class="settings-big-img">
              <div class="img-cont">
                <h3>工作紀錄</h3>
                <p>您的系統工作紀錄</p>
                <div class="amin-btn btn-add" @click="navigateTo('/user/record')">
                  <div class="content-original">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                  <div class="content-dubbed">
                    <svg t="1759933529502" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="5020" width="20" height="20">
                      <path
                        d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v426.666666h426.666666a42.666667 42.666667 0 0 1 0 85.333334H554.666667v426.666666a42.666667 42.666667 0 0 1-85.333334 0V554.666667H42.666667a42.666667 42.666667 0 0 1 0-85.333334h426.666666V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                        fill="#ffffff" p-id="5021"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img src="@/assets/image/index/setting6.jfif" alt="">
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="sass">
.ul-container
  margin: 0 clamp(15px, 3.15vw, 60px)
.swp-vw
  // overflow: hidden
  // margin: clamp(20px, 1.58vw, 30px) 0
  width: 100%
  // @media ( max-width: 1320px )
  //     max-width: 1320px
  .v-margin
    .imgs
      width:100%
    .left-swp
      position: relative
      z-index: 11
      background-color: white
      position: relative
      .imgs
        width: 100%
        overflow: hidden
        position: relative

      img.carousel-img
          width: 100%
    
.lis-cont
  padding: 40px 0
  background-color: #059587
  ul
    margin:0 clamp(15px, 2.88vw, 150px)
    padding: 0 clamp(30px,5.4vw, 150px)
    display: flex
    align-items: center
    justify-content: center
    flex-wrap: wrap
    gap: clamp(30px, 3.15vw, 60px)
    @keyframes fadeToLef
      0% 
        opacity: 0
        transform: translateX(-30px)
      100%
        opacity: 1
        transform: translateX(0)
    li
      h3
        color: white
        font-size: 30px
        text-shadow: rgba(0, 0, 0, 0.56) 2px 2px 2px
        visibility: visible
        animation-delay: .5s
        animation: fadeToLef .5s ease-in-out
.introduction
  width: 1200px
  max-width: 100%
  margin: 0 auto 50px
  padding: 72px 0
  .introduction-cont
    display: flex
    justify-content: space-between
    .introduction-left
      width: 50%
      padding: 0 15px
      .btn-group
        margin-top: 20px
        display: flex
        gap: 30px
      @keyframes fadeToBtm
        0% 
          opacity: 0
          transform: translateY(-30px)
        100% 
          opacity: 1
          transform: translateY(0)
      @keyframes fadeToTop
        0% 
          opacity: 0
          transform: translateY(30px)
        100% 
          opacity: 1
          transform: translateY(0)
       
      h1
        color: #29293a
        font-size: 40px
        font-weight: 700
        margin-bottom: 30px
        animation: fadeToBtm .5s ease-in-out
      h3
        color: #151515
        font-size:  24px
        margin-bottom: 30px
        animation-delay: 1s
        animation: fadeToTop .5s ease-in-out
      p
        color: #151515
        font-size: 16px
        line-height: 1.5
        animation-delay: 1s
        animation: fadeToTop .5s ease-in-out
    .introduction-right
      width: 40%
      padding: 0 15px
      animation-delay: 1s
      animation: fadeToTop .5s ease-in-out
      .introduction-right-img
        width: 100%
        img
          width: 100%
          object-fit: cover
.settings
  width: 1200px
  max-width: 100%
  margin: 0 auto
  padding: 72px 0
  .settings-cont
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 30px
    justify-content: space-between
    .settings-item
      display: flex
      flex-direction: column
      gap: 30px
      background-color: rgba(255, 255, 255, 0.05)
      .settings-smal-img,.settings-big-img
        position: relative
        overflow: hidden
        animation-delay: 1s
        animation: fadeToTop .5s ease-in-out
        &:hover
          .img-cont
            opacity: 1
        img
          width: 100%
          height: 100%
          object-fit: cover
        .img-cont
          color: #fff
          transition: all 0.3s ease-in-out
          opacity: 0
          position: absolute
          background-color: rgba(41, 41, 58, 0.6)
          top: 0
          left: 0
          width: 100%
          height: 100%
          z-index: 2
          padding: 30px 40px
          h3
            font-size: 24px
          p
            font-size: 16px
            margin-top: 8px
            margin-bottom: 8px

      .settings-smal-img
        height: 33.33333%
      .settings-big-img
        height: 66.66667%
    
@media screen and (max-width: 1140px)

  .left-swp
    width: 100% !important
    .imgs
      max-width: 100% !important
  .lis-cont ul
    margin: 0 0
    padding: 0 0
@media screen and (max-width: 992px)
  .lis-cont ul
    padding: 0 20px
    li
      position: relative
      text-align: center
  .introduction
    padding: 20px 0
  .introduction-cont
    flex-direction: column
    .introduction-left
      width: 100% !important
      h1
        font-size: 30px !important
      h3
        font-size: 20px !important
      .btn-group
        justify-content: center
    .introduction-right
      margin-top: 30px
      padding: 0 20px !important
      width: 100% !important
  .settings
    padding: 20px
    .settings-cont
      grid-template-columns: repeat(1, 1fr)
      .settings-item
        width: 100%
        .settings-smal-img,.settings-big-img
          height: 100%
          .img-cont
            opacity: 1
            background-color: rgba(41, 41, 58, 0.3)

@media screen and (max-width: 768px)
  .lis-cont ul li
    width: 100%
    margin-bottom: 10px
  .ul-ad .ul-ad-content
    display: block !important
  .ul-ad-img img
    width: 100%
  .ul-ad .ul-btn
    width: 100%
  .left-swp
    border-radius: 0
    .imgs
      border-radius: 0 !important
      img
        object-fit: cover
        border-radius: 30px
        object-position: 100%
        aspect-ratio: 400 / 459
  .swiper-cont
    padding: 15px 0 0
    max-width: 100% !important
    width: auto
    position: relative !important
    top: 100% !important
    transform: translateY(0) !important
    left: 0 !important
    height: 250px
  .fix-btn
    bottom: 50px !important
    left: 50%
    width: 50px
    height: 50px

.btn-green
  background-color: #059587 !important
  border-color: #05958700 !important
  &:hover
    background-color: #916638 !important

.btn-add
  background-color: #059587 !important
  border-color: #05958700 !important
  padding: 10px !important
  border-radius: 50% !important
  &:hover
    background-color: #916638 !important

.amin-btn
  color: #151515
  background-color: transparent
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
  transition: 0.25s cubic-bezier(0.2, 1, 0.3, 1)
  animation-delay: 1s
  animation: fadeToTop .5s ease-in-out
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
    top: 50%
    opacity: 0
    transform: translate3d(0, 0, 0)
</style>
