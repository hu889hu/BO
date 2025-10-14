<script lang="ts" setup>
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const { bankApply } = usePlayerStore()
const pageType = ref('bank')
const bankInfo = ref({
  bankName: siteStore.siteData?.depositOptions.bank[0],
  branch: '',
  account: '',
  accountNo: '',
  image: ['', '', '']
})
await useAsyncData(async () => {
  // 如果綁定銀行卡跳轉錢包
  if (playerStore?.playerInfo?.bankInfo !== null) {
    if (playerStore?.playerInfo?.bankInfo.status === 1) {
      navigateTo('/user/withdraw')
    }
  }
})
// methods
const submitBankApply = async () => {
  console.log(bankInfo)
  if (bankInfo.value.branch === '') {
    return ElMessage.error('請填寫分行')
  }
  if (bankInfo.value.account === '') {
    return ElMessage.error('請填寫戶名')
  }
  if (bankInfo.value.accountNo === '') {
    return ElMessage.error('請填寫帳號')
  }
  // if (bankInfo.value.image[0] === '') {
  //   return ElMessage.error('請上傳身分證正面')
  // }
  // if (bankInfo.value.image[1] === '') {
  //   return ElMessage.error('請上傳身分證反面')
  // }
  if (bankInfo.value.image[2] === '') {
    return ElMessage.error('請上傳檔案')
  }
  const bankApplyRes = await bankApply(bankInfo.value)
  if (bankApplyRes) {
    setTimeout(async () => {
      const res = await playerStore.fetchInfo()
      if (res.success) {
        if (playerStore.playerInfo.bankInfo.status === 1) {
          navigateTo('/user/withdraw')
        }
      }
    }, 1000)
  }
}
const changeType = (type: any) => {
  pageType.value = type
  switch (type) {
    case 'bank':
      bankInfo.value = {
        bankName: siteStore.siteData?.depositOptions.bank[0],
        branch: '',
        account: '',
        accountNo: '',
        image: ['', '', '']
      }
      break
    case 'address':
      bankInfo.value = {
        bankName: siteStore.siteData?.depositOptions.crypto[0],
        branch: '',
        account: '',
        accountNo: '',
        image: []
      }
      break
  }
}
const updateImage = (data: any) => {
  // console.log(data)
  if (data.url[0]) {
    bankInfo.value.image[data.index] = data.url[0].url
  } else {
    bankInfo.value.image[data.index] = ''
    console.log(bankInfo.value.image)
  }
}
</script>

<template>
  <div class="pages">
    <div class="tag">
      <div class="tag-title">
        <div class="tag-subtitle">{{ Object.keys(playerStore.playerInfo.bankInfo || {}).length === 0 ? '財務相關表單與申請' :
          '已收到您的申請'
        }}</div>
        <h1>{{ Object.keys(playerStore.playerInfo.bankInfo || {}).length === 0 ? '財務申請' :
          '收到申請'
        }}</h1>
        <p class="link">
          <router-link to="/user">{{ $lang('職員中心') }}</router-link>
          <svg t="1759997221376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1542" width="32" height="32">
            <path
              d="M323 837.6875c0-6.75 2.53125-13.5 7.59375-18.5625l307.12500001-307.125L330.59375 204.875c-5.0625-5.0625-7.59375-11.390625-7.59375-18.5625 0-6.75 2.53125-13.5 7.59375-18.5625 10.125-10.125 26.578125-10.125 36.703125 0L693.40625 493.4375c5.0625 5.0625 7.59375 11.390625 7.59375 18.5625 0 6.75-2.53125 13.5-7.59375 18.5625L367.71875 856.25c-10.125 10.125-26.578125 10.125-36.703125 0-5.0625-5.0625-8.015625-11.8125-8.015625-18.5625z"
              fill="#ffffff" p-id="1543"></path>
          </svg>
          <span>{{ Object.keys(playerStore.playerInfo.bankInfo || {}).length === 0 ? '財務申請' : '收到申請' }}</span>
        </p>
      </div>
    </div>
    <div v-if="Object.keys(playerStore.playerInfo.bankInfo || {}).length === 0" class="inf-bg">
      <h3 class="ul-contact-form-container__title">
        {{ $lang('請新增一筆銀行資訊') }}
      </h3>
      <div class="ul-contact-form">
        <div class="">
          <!--  銀行  -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請選擇您的銀行') }}</label>
              <select v-model="bankInfo.bankName" name="phoneCode" class="form-control">
                <option v-for="item in siteStore.siteData?.depositOptions.bank" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>

          <!-- 分行 -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請輸入分行名稱') }}</label>
              <input v-model="bankInfo.branch" v-trim-input type="text" name="name" class="form-control" />
            </div>
          </div>

          <!-- 帳戶號碼  -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請輸入帳戶號碼') }}</label>
              <input v-model="bankInfo.accountNo" v-trim-input type="text" name="tel" class="form-control" />
            </div>
          </div>
          <!-- 帳戶戶名 -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請輸入帳戶戶名') }}</label>
              <input v-model="bankInfo.account" v-trim-input type="text" name="name" class="form-control" />
            </div>
          </div>
          <!--  上傳照片 -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請上傳相關圖片') }}</label>
              <div class="form-control" style="display: flex; flex-wrap: wrap">
                <pureImgUploader :limit="1" :index="2" @update-image="updateImage">
                </pureImgUploader>
              </div>
              <!-- <input type="file" name="name" v-model="playerStore.playerInfo.username" class="form-control"> -->
              <span style="font-size: 14px; color: #e26f23">請上傳上方表格相同的存簿銀行照片，請勿修圖後製，請耐心等待審核並開通
              </span>
            </div>
          </div>
          <button class="update_password" @click="submitBankApply">
            <span style="font-size: 20px; font-weight: bold">{{
              $lang('確認送出')
            }}</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="inf-bg" style="margin-bottom: 100px;margin-top: 50px;">
        <div class="input-text text-center">
          <h1 style="font-size: 24px;font-weight: 600;margin-bottom: 28px;">已收到申請，<br>
            請耐心等待審核...</h1>
          <img style="margin: 0 auto;" src="@/assets/image/index/ok.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.pages
  box-sizing: border-box
  @media screen and (max-width: 768px)
    padding: 0 10px 10px
</style>
<style scoped lang="sass">
.tag
  position: relative
  background: url(@/assets/image/index/bank-bg.jpg)  no-repeat center / cover
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
    font-size: 58px
    color: white
    margin-top: 10px
  .tag-subtitle
    position: relative
    padding-left: 70px
    font-size: 16px
    color: #fff
    letter-spacing: .2em
    &::before
      content: ''
      position: absolute
      left: 0
      top: 50%
      transform: translateY(-50%)
      width: 50px
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

.inf-bg
  max-width: 1200px
  margin: 30px auto
  background-color: #fff
  padding: 40px 32px
  border-radius: 14px
  border: 1px solid #5ca6ff
  animation: fadeInUp 0.7s ease forwards
  opacity: 0
  .ul-contact-form-container
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
      
  .ul-contact-form input, .ul-contact-form textarea , .ul-contact-form select 
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
        color: #4a5568
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
.input-classic

</style>
