<script lang="ts" setup>
const siteStore = useSiteStore()
const { queryChatbox } = siteStore
const { signin } = useAuthStore()
const passwordEyes = ref(false)
const recaptchaCode = ref('')
const recaptchaCheckFunction = ref(null)
const { t } = useI18n()

const fetchSigninApi = ref({
  account: '',
  password: ''
})

const showPassword = (type: boolean) => {
  passwordEyes.value = type
}

const setLogin = async () => {
  if (!fetchSigninApi.value.account) {
    ElMessage({
      message: t('請輸入帳號'),
      type: 'error'
    })
    return
  }
  if (!fetchSigninApi.value.password) {
    ElMessage({
      message: t('請輸入密碼'),
      type: 'error'
    })
    return
  }
  const recaptchaCheck = await recaptchaCheckFunction.value?.validate(
    recaptchaCode.value
  )
  if (!recaptchaCheck) {
    ElMessage({
      message: t('驗證碼錯誤'),
      type: 'error'
    })
  } else {
    const res = await signin(fetchSigninApi.value)
    if (res.success) {
      navigateTo('/user')
    }
  }
}
const checkHepler = async (data) => {
  recaptchaCheckFunction.value = data
}

await useAsyncData(async () => {
  if (!router.currentRoute.value.name.inCludes('model')) {
    if (isLogin()) {
      navigateTo('/user')
    }
  }
})

onMounted(async () => {
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

definePageMeta({
  layout: 'auth'
})
const openChatBox = () => {
  window.open(siteStore.chatbox, '_blank')
}
</script>

<template>
  <div class="layouts-auth">
    <div class="layouts-auth__video">
      <video autoplay muted loop>
        <source src="@/assets/image/login/kjlogin.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="layouts-auth__view">
      <div class="bg-layer">
        <div class="header-main">
          <div class="main-icon">
            <h1>系統登入</h1>
          </div>
          <div class="header-left-bottom">
            <div class="icon1">
              <input v-model="fetchSigninApi.account" v-trim-input type="text" name="acc" :placeholder="t('請輸入帳號')"
                class="inputStyle" />
            </div>
            <div class="icon1">
              <input v-model="fetchSigninApi.password" v-trim-input type="password" name="pass"
                :placeholder="t('請輸入密碼')" class="inputStyle" />
            </div>

            <div class="icon1">
              <recaptcha @check-hepler="checkHepler"></recaptcha>
            </div>
            <div class="captcha-hint">看不清？點圖片更新驗證碼</div>
            <div class="icon1">
              <input v-model="recaptchaCode" v-trim-input type="text" :placeholder="t('請輸入驗證碼')" class="inputStyle"
                @keyup.enter="setLogin" />
            </div>

            <div>
              <div class="btn" @click="setLogin">{{ $lang('登入') }}</div>
              <hr style="margin-top:20px;">
              <div class="end-btn">
                <div class="btn-home" @click="navigateTo('/')">
                  {{ $lang('返回首页') }}
                </div>
                <div class="btn-reg" @click="navigateTo('/register')">
                  {{ $lang('申請註冊') }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.layouts-auth
  position: relative
  width: 100%
  min-height: 100dvh
  &__video

    height: 100vh
    width: auto
    overflow: hidden
    //filter: grayscale(1)
    &>video
      width: 100%
      height: 100%
      object-fit: cover
      object-position: center
  &__view
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow-x: hidden
    overflow-y: auto
    .bg-layer
      background: rgba(0, 0, 0, 50%)
      min-height: 100vh
      display: flex
      justify-content: center
      align-items: center
      .header-main
        background: rgba(255, 255, 255, 0.288)
        padding: 40px 30px
        border-radius: 14px
        max-width: 420px
        width: 100%
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1)
        @media (max-width: 768px)
          margin-inline: 20px
        .main-icon
          text-align: center
          margin: 0 auto 15px
          h1
            font-size: 2rem
            font-weight: bold
            color: #fff
            margin-bottom: 8px
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)
            &::after
              content: ""
              position: absolute
              left: 50%
              bottom: -10px
              transform: translateX(-50%)
              width: 150px
              height: 3px
              background: linear-gradient(to right, #00BCD4, #99f3ff)
              border-radius: 2px
        img
          max-width: 100%

        .icon1
          margin: 0 0 1rem
          display: flex
          align-items: center
          justify-content: center

          input
            padding: 12px
            background: rgba(255, 255, 255, 0.85)
            border: 1px solid rgba(0, 0, 0, 0.3)
            color: black
            width: 100%
            border-radius: 8px
            font-size: 18px
          span
            min-width: 64px !important
            // white-space: nowrap
        .captcha-hint
          text-align: center
          color: #eee
          font-size: 12px
        .bottom
          margin: 1em 0 0

        .header-left-bottom .btn
          text-align: center  
          width: 100%
          padding: 12px
          font-size: 20px
          margin-top: 10px
          border: none
          border-radius: 30px
          background: linear-gradient(90deg, #ff6ec4, #7873f5)
          color: white
          font-weight: bold
          cursor: pointer
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)
          transition: transform 0.3s, box-shadow 0.3s
          overflow: hidden
          &:hover
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3)
            transform: scale(1.05)
            &::before
              left: 100%
          &::before
            content: ''
            position: absolute
            top: 0
            left: -100%
            width: 100%
            height: 100%
            background: rgba(255, 255, 255, 0.2)
            transform: skewX(-20deg)
            transition: left 0.4s ease-out
        .end-btn
          display: flex
          margin-top: 20px
          .btn-reg,.btn-home
            width: 49%
            padding: 8px 14px
            border-radius: 6px
            color: #fff
            box-shadow: 0 4px 12px rgba(0,0,0,0.2)
            text-align: center
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)
            transition: all 0.3s
            cursor: pointer
            &:hover
              transform: scale(1.05)
              box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3)
          .btn-reg
            background: #ff8b2c
          .btn-home
            background: #1b73e8
            margin-right: 10px
        a
          color: #585858
          margin: 0em

        .header-left-bottom p
          font-size: 17px
          color: #000
          display: inline-block
          width: 50%
          margin: 20px 0 0
          letter-spacing: 1px
          float: left

          a
            font-size: 16px
            font-weight: bold
            color: #000000
            text-transform: uppercase
        .links
          height: 57px
          cursor: pointer
          .right
            text-align: right
</style>
