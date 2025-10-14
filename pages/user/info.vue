<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()

const { updatePassword, updateTrasactionPassword } = playerStore
const pwd = ref({
  oPwd: '',
  nPwd: '',
  nPwdConfirm: '',
  showoPwd: false,
  shownPwd: false,
  shownPwdConfirm: false
})
const transactionPwd = ref({
  oPwd: '',
  nPwd: '',
  nPwdConfirm: '',
  showoPwd: false,
  shownPwd: false,
  shownPwdConfirm: false
})
const changePwd = ref(false)
const changenTPwd = ref(false)
// updatePassword()  更新密碼
// updateTrasactionPassword()  更新交易密碼
watch(
  () => pwd.value.nPwdConfirm,
  (val) => {
    if (val) {
      changePwd.value = true
    } else {
      changePwd.value = false
    }
  }
)
watch(
  () => transactionPwd.value.nPwdConfirm,
  (val) => {
    if (val) {
      changenTPwd.value = true
    } else {
      changenTPwd.value = false
    }
  }
)
const sendPasswordChange = async () => {
  console.log('changePwd.value', changePwd.value)
  console.log('changenTPwd.value', changenTPwd.value)
  if (changePwd.value) {
    if (pwd.value.nPwd !== pwd.value.nPwdConfirm) {
      ElNotification({
        title: `${t('密碼不一致')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
    const res = await updatePassword({
      password: pwd.value.oPwd,
      newPassword: pwd.value.nPwd
    })
    if (res.success) {
      pwd.value.oPwd = ''
      pwd.value.nPwd = ''
      pwd.value.nPwdConfirm = ''
    }
  }
  if (changenTPwd.value) {
    if (transactionPwd.value.nPwd !== transactionPwd.value.nPwdConfirm) {
      ElNotification({
        title: `${t('交易密碼不一致')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
    const res = await updateTrasactionPassword({
      password: transactionPwd.value.oPwd,
      newPassword: transactionPwd.value.nPwd
    })
    if (res.success) {
      transactionPwd.value.oPwd = ''
      transactionPwd.value.nPwd = ''
      transactionPwd.value.nPwdConfirm = ''
    }
  }
}
</script>

<template>
  <div class="pages">
    <div class="tag">
      <div class="tag-title">
        <div class="tag-subtitle">查閱與修改個人資訊</div>
        <h1>個人資訊</h1>
        <p class="link">
          <router-link to="/user">{{ $lang('職員中心') }}</router-link>
          <svg t="1759997221376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1542" width="32" height="32">
            <path
              d="M323 837.6875c0-6.75 2.53125-13.5 7.59375-18.5625l307.12500001-307.125L330.59375 204.875c-5.0625-5.0625-7.59375-11.390625-7.59375-18.5625 0-6.75 2.53125-13.5 7.59375-18.5625 10.125-10.125 26.578125-10.125 36.703125 0L693.40625 493.4375c5.0625 5.0625 7.59375 11.390625 7.59375 18.5625 0 6.75-2.53125 13.5-7.59375 18.5625L367.71875 856.25c-10.125 10.125-26.578125 10.125-36.703125 0-5.0625-5.0625-8.015625-11.8125-8.015625-18.5625z"
              fill="#ffffff" p-id="1543"></path>
          </svg>
          <span>個人資訊</span>
        </p>
      </div>
    </div>
    <div class="inf-bg">
      <div class="ul-contact-form-container">
        <h3 class="ul-contact-form-container__title">{{ $lang('職員基本資料') }}
        </h3>
        <div class="ul-contact-form">
          <div class="grid">

            <!-- 職員編號 (只讀) -->
            <div class="form-group">
              <div class="position-relative">
                <label>{{ $lang('職員編號') }}</label>
                <input type="text" name="acc" :value="playerStore?.playerInfo?.account || ''" readonly
                  class="form-control">

              </div>
            </div>

            <!-- 職員名稱 (只讀) -->
            <div class="form-group">
              <div class="position-relative">
                <label>{{ $lang('職員名稱') }}</label>
                <input type="text" name="name" :value="playerStore?.playerInfo?.username" readonly class="form-control">

              </div>
            </div>

            <!-- 職員電話 (只讀) -->
            <div class="form-group">
              <div class="position-relative">
                <label>{{ $lang('職員電話') }}</label>
                <input type="text" name="tel"
                  :value="playerStore?.playerInfo?.countryCode + ' ' + playerStore?.playerInfo?.mobile" readonly
                  class="form-control">
              </div>
            </div>
          </div>
        </div>


      </div>
      <div class="ul-contact-form-container">
        <!-- 更新密碼表單 -->
        <h3 class="ul-contact-form-container__title">{{ $lang('修改登入密碼') }}</h3>
        <div class="ul-contact-form">
          <div class="form-group" style="padding-top: 10px;">
            <div class="position-relative">
              <label>{{ $lang('舊密碼') }}</label>
              <input v-model="pwd.oPwd" v-trim-input :type="pwd.showoPwd ? 'text' : 'password'" class="form-control"
                @copy.prevent @paste.prevent @contextmenu.prevent />
              <div v-if="!pwd.showoPwd" class="eyes" @click="pwd.showoPwd = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="pwd.showoPwd = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <div class="form-group" style="padding-top: 10px;">
            <div class="position-relative">
              <label>{{ $lang('新密碼') }}</label>
              <input v-model="pwd.nPwd" v-trim-input :type="pwd.shownPwd ? 'text' : 'password'" class="form-control"
                @copy.prevent @paste.prevent @contextmenu.prevent />
              <div v-if="!pwd.shownPwd" class="eyes" @click="pwd.shownPwd = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="pwd.shownPwd = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('確認新密碼') }}</label>
              <input v-model="pwd.nPwdConfirm" v-trim-input :type="pwd.shownPwdConfirm ? 'text' : 'password'"
                class="form-control" @copy.prevent @paste.prevent @contextmenu.prevent />
              <div v-if="!pwd.shownPwdConfirm" class="eyes" @click="pwd.shownPwdConfirm = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="pwd.shownPwdConfirm = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <!-- submit btn -->
          <div class="btn btn-primary update_password" @click="sendPasswordChange"><span
              style="font-size: 20px;font-weight: bold;">{{ $lang('確認更新密碼') }}</span></div>
        </div>
      </div>
      <div class="ul-contact-form-container" style="border: 0;padding: 0; margin: 0;"></div>
      <div class="ul-contact-form-container">
        <!-- 更新金鑰密碼表單 -->
        <h3 class="ul-contact-form-container__title">{{ $lang('修改金鑰密碼') }}
        </h3>
        <div action="" class="ul-contact-form">
          <div class="form-group" style="padding-top: 10px;">
            <div class="position-relative">
              <label>{{ $lang('舊金鑰密碼') }}</label>
              <input v-model="transactionPwd.oPwd" v-trim-input :type="transactionPwd.showoPwd ? 'text' : 'password'"
                class="form-control" @copy.prevent @paste.prevent @contextmenu.prevent />
              <div v-if="!transactionPwd.showoPwd" class="eyes" @click="transactionPwd.showoPwd = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="transactionPwd.showoPwd = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <div class="form-group" style="padding-top: 10px;">
            <div class="position-relative">
              <label>{{ $lang('新金鑰密碼') }}</label>
              <input v-model="transactionPwd.nPwd" v-trim-input :type="transactionPwd.shownPwd ? 'text' : 'password'"
                class="form-control" @copy.prevent @paste.prevent @contextmenu.prevent />
              <div v-if="!transactionPwd.shownPwd" class="eyes" @click="transactionPwd.shownPwd = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="transactionPwd.shownPwd = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('確認新金鑰密碼') }}</label>
              <input v-model="transactionPwd.nPwdConfirm" v-trim-input
                :type="transactionPwd.shownPwdConfirm ? 'text' : 'password'" class="form-control" @copy.prevent
                @paste.prevent @contextmenu.prevent />
              <div v-if="!transactionPwd.shownPwdConfirm" class="eyes" @click="transactionPwd.shownPwdConfirm = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="transactionPwd.shownPwdConfirm = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <!-- submit btn -->
          <div class="btn btn-primary update_password" @click="sendPasswordChange"><span
              style="font-size: 20px;font-weight: bold;">{{
                $lang('更新金鑰密碼') }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.pages
  box-sizing: border-box
</style>

<style scoped lang="sass">
.tag
  position: relative
  background: url(@/assets/image/index/info.jpg)  no-repeat center / cover
  padding: 120px 0 40px
  // font-weight: 600
  line-height: 1.3
  color: #ffffff9a
  &::before
    position: absolute
    content: ''
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: linear-gradient(to right, rgba(57, 76, 95, 0.75), transparent)
    pointer-events: none
    z-index: 0
    display: block
  .tag-title
    width: 1200px
    margin: 0 auto
    max-width: 100%
    padding: 0 15px
    display: flex
    justify-content: space-between
    flex-direction: column
  h1
    color: white
    font-size: 58px
    margin-top: 10px
  .tag-subtitle
    position: relative
    padding-left: 40px
    font-size: 16px
    &::before
      content: ''
      position: absolute
      left: 0
      top: 50%
      transform: translateY(-50%)
      width: 30px
      height: 2px
      background-color: #fff
  .link
    display: flex
    align-items: center
    margin-top: 5.125rem
    gap: 30px
    font-weight: 400
    .icon
      width: 15px
      height: 15px
    a
      &:hover
        color: #aaceff
@keyframes fadeInUp 
  0% 
    opacity: 0
    transform: translateY(12px)
  100% 
    opacity: 1
    transform: translateY(0)
@keyframes fadeIn 
  0% 
    opacity: 0
  100% 
    opacity: 1


.inf-bg
  display: flex
  flex-wrap: wrap
  gap: 40px
  max-width: 1000px
  margin: auto
  justify-content: center
  align-items: flex-start
  margin-bottom: 50px
  margin-top: 20px
  padding: 20px
  .ul-contact-form-container 
    width: 50%
    background-color: #fff
    padding: 40px 32px
    border-radius: 14px
    border: 1px solid #92acd9
    flex: 1 1 46%
    min-width: 320px
    animation: fadeInUp 0.7s ease forwards
    opacity: 0
    &:nth-child(2)
      animation-delay: 0.2s
      
  .ul-contact-form input, .ul-contact-form textarea 
    width: 100%
    padding: 14px 16px
    font-size: 1rem
    font-weight: 600
    border: 1px solid #ccc
    border-radius: 10px
    background-color: #fff
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease
  .form-control:focus 
    color: #212529
    background-color: #fff
    border-color: #86b7fe
    transform: scale(1.02)
    outline: 0
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
    box-shadow: 0 0  .25rem 2px rgba(13, 110, 253, .25)
  .form-group
    margin-bottom: clamp(15px, 1.58vw, 30px)
    .position-relative
      position: relative
      label
        display: block
        letter-spacing: 0.5px
        margin-bottom: 8px
      .eyes
        position: absolute
        right: 10px
        bottom: 15px
        cursor: pointer
  .ul-contact-form-container__title
    font-size: 1.6rem
    font-weight: 700
    margin-bottom: 28px
    border-left: 4px solid #007BFF
    padding-left: 14px
    color: #222
    animation: fadeIn 1s ease forwards
    opacity: 0
  .ul-contact-form .update_password 
    margin-top: 30px
    width: 100%
    padding: 14px 0
    font-size: 18px
    font-weight: 500
    color: #fff
    background-color: #28a745
    border: none
    border-radius: 10px
    cursor: pointer
    text-align: center
    box-shadow: none
    transition: background-color 0.3s ease, transform 0.15s ease
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.562)
    &:hover 
      background-color: #218838
</style>
