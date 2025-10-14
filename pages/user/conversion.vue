<script lang="ts" setup>
const { transfer, queryTransferRecord } = useWalletStore()
const siteStore = useSiteStore()
const PlayerStore = usePlayerStore()
const { isLogin } = useAuthStore()
const { t } = useI18n()
const playerWalletBalance = computed(() => {
  if (!isLogin()) {
    return 0
  }
  const findWallet = PlayerStore.playerInfo?.wallet.find(
    (wallet: any) => wallet.type === 2
  )
  if (findWallet) {
    return Number(findWallet.balance)
  } else {
    return 0
  }
})

const playerWalletBalances = computed(() => {
  if (!isLogin()) {
    return 0
  }
  const findWallet = PlayerStore.playerInfo?.wallet.find(
    (wallet: any) => wallet.type === '13'
  )
  if (findWallet) {
    return Number(findWallet.balance)
  } else {
    return 0
  }
})
const transferList = ref([])
onMounted(async () => {
  getTransferList()
  rate.value = siteStore.siteData.walletConfig?.exchangeRates.find((item) =>
    item.toWalletType == '13'
  ).rate
})
const getTransferList = async () => {
  const queryTransferRecordRes = await queryTransferRecord({})
  transferList.value = queryTransferRecordRes.data.result
}
const amount = ref()
const toAmount = ref()
const goTransfer = async () => {
  if (amount.value > playerWalletBalance.value) {
    ElNotification({
      title: '轉出錢包餘額不足',
      type: 'warning',
      duration: 1000
    })
    return
  }
  if (amount.value < 3125) {
    ElNotification({
      title: '未達交易數量（最低 3125 USDT）',
      type: 'warning',
      duration: 1000
    })
    return
  }
  const transferRes = await transfer({
    fromWalletId: PlayerStore.playerInfo.wallet[0].id,
    toWalletId: PlayerStore.playerInfo.wallet[1].id,
    amount: JSON.stringify(amount.value),
    memo: `用戶操作 USDT 劃轉至 TWD ,數量: ${amount.value}`
  })
  if (transferRes.success) {
    ElNotification({
      title: transferRes.message,
      type: 'success',
      duration: 1000
    })
    getTransferList()
    await PlayerStore.fetchInfo()
    amount.value = ''
    toAmount.value = ''
  }
}
const rate = ref(1)
const conversionCalculation = () => {
  toAmount.value = rate.value * amount.value
}
const statusList = [
  {
    label: '申請中',
    value: 0,
  },
  {
    label: '通過',
    value: 1,
  },
  {
    label: '駁回',
    value: 2,
  }
]
const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
</script>

<template>
  <div class="pages">
    <div class="tag">
      <div class="tag-title">
        <div class="tag-subtitle">貨幣轉換相關紀錄</div>
        <h1>貨幣轉換</h1>
        <p class="link">
          <router-link to="/user">{{ $lang('職員中心') }}</router-link>
          <svg t="1759997221376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1542" width="32" height="32">
            <path
              d="M323 837.6875c0-6.75 2.53125-13.5 7.59375-18.5625l307.12500001-307.125L330.59375 204.875c-5.0625-5.0625-7.59375-11.390625-7.59375-18.5625 0-6.75 2.53125-13.5 7.59375-18.5625 10.125-10.125 26.578125-10.125 36.703125 0L693.40625 493.4375c5.0625 5.0625 7.59375 11.390625 7.59375 18.5625 0 6.75-2.53125 13.5-7.59375 18.5625L367.71875 856.25c-10.125 10.125-26.578125 10.125-36.703125 0-5.0625-5.0625-8.015625-11.8125-8.015625-18.5625z"
              fill="#ffffff" p-id="1543"></path>
          </svg>
          <span>貨幣轉換</span>
        </p>
      </div>
    </div>
    <div class="inf-bg">
      <div class="ul-contact-form-container__title">
        <div>您當前可換購數量為 <span style="color: #a34405;"> {{ new Intl.NumberFormat('zh-TW').format(playerWalletBalance)
        }}</span></div>
        <div>可將您持有的USDT轉換為TWD（系統匯率：{{ rate }}）</div>
        <div>最低USDT數量為3125</div>
      </div>

      <hr class="fancy-hr">

      <div class="ul-contact-form">
        <div class="form-group">
          <div class="position-relative">
            <label>{{ $lang('請輸入USDT數量') }}</label>
            <input type="number" name="USDT" v-model="amount" class="form-control">
          </div>
        </div>
        <div @click="conversionCalculation" class="update_password update_password2">
          轉換貨幣
        </div>
        <div class="form-group">
          <div class="position-relative">
            <label>{{ $lang('TWD') }}</label>
            <input type="number" name="TWD" v-model="toAmount" class="form-control" readonly>
          </div>
        </div>
        <hr class="fancy-hr mt-20">
        <div @click="goTransfer" class="update_password">
          確認轉換
        </div>
      </div>

    </div>
    <div class="cart-top">
      <div class="cart-top-title">
        <h2>您的轉換紀錄</h2>
        <p>轉換紀錄</p>
      </div>
      <div class="table-responsive">
        <table class="ul-cart-table">
          <thead>
            <tr>
              <th>{{ $lang('申請時間') }}</th>
              <th>{{ $lang('申請內容') }}</th>
              <th>{{ $lang('申請金額') }}</th>
              <th>{{ $lang('申請總結') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in transferList">
              <!-- 時間 -->
              <td>
                <p>
                  {{ formatDate(item.createdAt) }}
                </p>
              </td>

              <!-- 內容 -->
              <td>
                <span v-if="item.balanceChange">{{ $lang('交易前') }}:{{ new
                  Intl.NumberFormat('zh-TW').format(item.balanceChange.fromBefore) }}</span>
                / <span v-if="item.balanceChange">{{ $lang('交易後') }}:{{ new
                  Intl.NumberFormat('zh-TW').format(item.balanceChange.fromAfter) }}</span>
              </td>
              <!-- 金額 -->
              <td>
                <p>
                  申請數量:{{ new Intl.NumberFormat('zh-TW').format(item.fromAmount) }}
                </p>
              </td>
              <td>
                <p>
                  {{ statusList[item.status].label }}/{{ new Intl.NumberFormat('zh-TW').format(item.toAmount) }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
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
    font-size: 58px
    color: white
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
  max-width: 1200px
  margin: 30px auto
  background-color: #fff
  padding: 40px 32px
  border-radius: 14px
  border: 1px solid #5ca6ff
  animation: fadeInUp 0.7s ease forwards
  opacity: 0
  img
    width: 100%
  .ul-contact-form-container__title
    font-size: 20px
    font-weight: 700
    margin-bottom: 28px
    border-left: 4px solid #007BFF
    padding-left: 14px
    color: #222
    animation: fadeIn 1s ease forwards
    opacity: 0
  .update_password
    display: block
    margin-top: 30px
    margin-bottom: 20px
    width: 100%
    padding: 14px 0
    font-size: 18px
    font-weight: 500
    color: #fff
    background-color: #2196f3
    border: none
    border-radius: 10px
    cursor: pointer
    text-align: center
    box-shadow: none
    transition: background-color 0.3s ease, transform 0.15s ease
    text-shadow: 2px 2px 4px rgba(0,0,0,.4)
    &:hover 
      background-color: #1976d2
  .update_password2
    background-color: #28a745
    &:hover 
      background-color: #218838
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
      font-size: 25px
      font-weight: 600
      color: #4a5568
      display: block
      letter-spacing: 0.5px
      margin-bottom: 8px
    .eyes
      position: absolute
      right: 10px
      bottom: 15px
      cursor: pointer

.cart-top
  max-width: 100%
  width: 1200px
  margin: 80px auto 50px
  .cart-top-title
    text-align: center
    margin-bottom: 40px
    h2
      font-size: 40px
    p
      margin-top: 30px
      font-size: 16px
  .ul-cart-table
    width: 100%
    text-align: -webkit-match-parent
    thead
      font-weight: 700
      font-size: clamp(17px, 1.05vw, 20px)
      padding-bottom: 17px
      border-bottom: 1px solid #aeb1be
      tr
        &:last-child
          border: none
    tr
      border-bottom: 1px solid #e8e9ee
      
    th
      padding-bottom: 20px
      padding-right: clamp(30px, 4.73vw, 90px)
      word-spacing: normal
      min-width: 150px
      text-align: center
    td
      padding-top: clamp(18px, 1.47vw, 20px)
      padding-bottom: clamp(18px, 1.47vw, 20px)
      padding-right: clamp(30px, 1.47vw, 28px)
      text-align: center
      color: #29293a
      p
        margin-top: 0
        // margin-bottom: 1rem

@media screen and (max-width: 1140px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 30px !important
@media screen and (max-width: 992px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 15px !important
@media screen and (max-width: 768px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 0px !important
</style>
