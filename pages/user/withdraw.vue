<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const { withdraw, transfer } = useWalletStore()
const withdrawAmount = ref(0)
const tPwd = ref('')
const withdrawFee = computed(() => withdrawFeeCount())
const selectType = ref('withdraw')
const showSectionType = ref(true)
await useAsyncData(async () => {
  if (siteStore.siteData.smsVerify === 3) {
    if (!playerStore.playerInfo.smsVerify) {
      navigateTo('/user/smsVerify')
    }
  }
  if (!playerStore.playerInfo?.bankInfo) {
    navigateTo('/user/bank')
  }

  if (playerStore.playerInfo.bankInfo.status !== 1) {
    navigateTo('/user/bank')
  }
})
// methods
const goWithdraw = async () => {
  console.log(withdrawAmount.value, siteStore.siteData.minWithdrawAmount,
    siteStore.siteData.maxWithdrawAmount, '321');

  if (
    withdrawAmount.value < siteStore.siteData.minWithdrawAmount ||
    withdrawAmount.value > siteStore.siteData.maxWithdrawAmount
  ) {
    ElNotification({
      title: `${t('提款金額不符合規定')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  if (siteStore.siteData.transactionPasswordRequired) {
    if (!tPwd.value) {
      ElNotification({
        title: `${t('請輸入交易密碼')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
  }
  console.log('withdrawAmount.value', withdrawAmount.value)
  console.log('Number(mainBalance.value)', Number(mainBalance.value))
  if (withdrawAmount.value > Number(mainBalance.value)) {
    ElNotification({
      title: `${t('可提領餘額不足')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  const withdrawRes = await withdraw(
    siteStore.siteData.transactionPasswordRequired
      ? {
        amount: JSON.stringify(withdrawAmount.value),
        password: tPwd.value,
        walletType: 13
      }
      : {
        amount: JSON.stringify(withdrawAmount.value),
        walletType: 13
      }
  )
  if (withdrawRes.success) {
    ElNotification({
      title: `${t('提款成功')}`,
      type: 'success',
      duration: 1000
    })
    withdrawAmount.value = 0
    tPwd.value = ''
    await playerStore.fetchInfo()
  }
}
const withdrawFeeCount = () => {
  const fee =
    withdrawAmount.value * siteStore.siteData.withdrawFeeRatio +
    siteStore.siteData.withdrawFeeFixed
  return fee < 1 ? 0 : new Intl.NumberFormat().format(fee)
}
const hiddenAccountNo = (value) => {
  if (value) {
    return value.replace(/^.{4}/, '****')
  } else {
    return ''
  }
}
onMounted(() => {
  if (playerStore.playerInfo.bankInfo !== null) {
    const bank = siteStore.siteData.depositOptions.bank.find((item) => {
      return item === playerStore.playerInfo.bankInfo.bankName
    })
    if (!bank) {
      showSectionType.value = false
    } else {
      showSectionType.value = true
    }
  }
})

const walletTypeName = (item: any) => {
  const type = item.type
  switch (type) {
    case 1:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('交易錢包')
    case 2:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('電力錢包')
    case 3:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('商城錢包')
    case 4:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('質押錢包')
    default:
      return t('其他資產')
  }
}

const transferWalletData = ref({
  from: '',
  to: '',
  amount: ''
})

const transferBtn = ref(false)

const goTransfer = async () => {
  transferBtn.value = false
  const fromData = playerStore.playerInfo.wallet.find(
    (item: any) => item.id === transferWalletData.value.from
  )
  const toData = playerStore.playerInfo.wallet.find(
    (item: any) => item.id === transferWalletData.value.to
  )
  if (!fromData) {
    ElNotification({
      title: `${t('請選擇轉出錢包')}`,
      type: 'error',
      duration: 1000
    })
    return
  }
  if (!toData) {
    ElNotification({
      title: `${t('請選擇轉入錢包')}`,
      type: 'error',
      duration: 1000
    })
    return
  }
  const transferRes = await transfer({
    fromWalletId: transferWalletData.value.from,
    toWalletId: transferWalletData.value.to,
    amount: JSON.stringify(transferWalletData.value.amount),
    memo: `用戶操作 ${walletTypeName(fromData)} 劃轉至 ${walletTypeName(toData)} ,數量: ${transferWalletData.value.amount}`
  })
  if (transferRes.success) {
    ElNotification({
      title: `${t('轉帳成功')}`,
      type: 'success',
      duration: 1000
    })
    await playerStore.fetchInfo()
    transferWalletData.value.amount = 0
  }
}

const mainBalance = computed(() => {
  const mainWallet = playerStore.playerInfo.wallet.find(
    (item: any) => item.type === 13
  )
  return mainWallet ? mainWallet.balance : 0
})

watch(
  () => transferWalletData.value.from,
  (newValue) => {
    console.log('transferWalletData.value', transferWalletData.value.from)
    const toWalletList = playerStore.playerInfo.wallet.filter(
      (item: any) => item.id !== transferWalletData.value.from
    )
    transferWalletData.value.to = toWalletList[0].id
  },
  { deep: true }
)
watch(
  () => transferWalletData.value.amount,
  (newValue) => {
    if (newValue > 0) {
      transferBtn.value = true
    } else {
      transferBtn.value = false
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="pages">
    <div class="tag">
      <div class="tag-title">
        <div class="tag-subtitle">財務相關表單與申請</div>
        <h1>財務申請</h1>
        <p class="link">
          <router-link to="/user">{{ $lang('職員中心') }}</router-link>
          <svg t="1759997221376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1542" width="32" height="32">
            <path
              d="M323 837.6875c0-6.75 2.53125-13.5 7.59375-18.5625l307.12500001-307.125L330.59375 204.875c-5.0625-5.0625-7.59375-11.390625-7.59375-18.5625 0-6.75 2.53125-13.5 7.59375-18.5625 10.125-10.125 26.578125-10.125 36.703125 0L693.40625 493.4375c5.0625 5.0625 7.59375 11.390625 7.59375 18.5625 0 6.75-2.53125 13.5-7.59375 18.5625L367.71875 856.25c-10.125 10.125-26.578125 10.125-36.703125 0-5.0625-5.0625-8.015625-11.8125-8.015625-18.5625z"
              fill="#ffffff" p-id="1543"></path>
          </svg>
          <span>財務申請</span>
        </p>
      </div>
    </div>
    <div class="inf-bg">
      <h3 class="ul-contact-form-container__title">
        {{ $lang('請新增一筆申請資訊') }}
      </h3>
      <div v-if="playerStore.playerInfo.bankInfo !== null" class="formSection">
        <div class="formContent">
          <form action="" class="ul-contact-form">
            <!--  銀行  -->
            <div class="form-group">
              <div class="position-relative">
                <label>您的銀行</label>
                <input type="text" name="acc" v-trim-input :value="playerStore.playerInfo.bankInfo.bankName"
                  class="form-control" readonly>
              </div>
            </div>
            <!-- 戶名 -->
            <div class="form-group">
              <div class="position-relative">
                <label>您的分行名稱</label>
                <input type="text" name="name" v-trim-input :value="playerStore.playerInfo.bankInfo.branch"
                  class="form-control" readonly>
              </div>
            </div>
            <!-- 我的資產 -->
            <!-- <div class="form-group">
              <div class="position-relative">
                <label>我的資產(主錢包)</label>
                <input type="text" name="name" :value="new Intl.NumberFormat('zh-TW').format(mainBalance)"
                  class="form-control" readonly>
              </div>
            </div> -->
            <!-- 帳號 -->
            <div class="form-group">
              <div class="position-relative">
                <label>您的帳戶號碼</label>
                <input type="text" name="name" v-trim-input v-model="playerStore.playerInfo.bankInfo.accountNo"
                  class="form-control" readonly>
              </div>
            </div>
            <!-- 戶名 -->
            <div class="form-group">
              <div class="position-relative">
                <label>您的帳戶戶名</label>
                <input type="text" name="name" v-trim-input v-model="playerStore.playerInfo.bankInfo.account"
                  class="form-control" readonly>
              </div>
            </div>
            <!-- 金額 -->
            <div class="form-group">
              <div class="position-relative">
                <label>請輸入申請金額</label>
                <input type="number" v-model="withdrawAmount" class="form-control">
              </div>
              <div style="font-size: 14px;color: #5178f8;font-weight: 600;margin-top: 20px;">
                <span>（{{ $lang('申請金額單筆最低')
                }}：{{
                    new Intl.NumberFormat('zh-TW').format(
                      siteStore.siteData.minWithdrawAmount
                    )
                  }}）</span>
                <!-- ~
                  {{
                    new Intl.NumberFormat('zh-TW').format(
                      siteStore.siteData.maxWithdrawAmount
                    )
                  }}</span>&nbsp
                <span style="font-size: 12px;color: rgb(47, 169, 88);">{{ $lang('手續費') }}：{{
                  withdrawAmount > 0 ? withdrawFee : 0
                }}</span> -->
              </div>
            </div>
            <div class="form-group" style="padding-top: 10px;" v-if="siteStore.siteData.transactionPasswordRequired">
              <div class="position-relative">
                <label>交易密碼</label>
                <input type="password" v-model="tPwd" v-trim-input name="new_password" autocomplete="off"
                  class="form-control">
              </div>
            </div>
            <button type="button" class="update_password" @click="goWithdraw">
              {{ $lang('確認送出') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
/* 基础样式 - 针对低配置设备优化 */
.pages
  box-sizing: border-box
  @media screen and (max-width: 768px)
    padding: 0 10px 10px

.tag
  position: relative
  background: url(@/assets/image/index/withdraw.jpg) no-repeat center / cover
  padding: 60px 0 20px
  line-height: 1.2
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
  .tag-title
    width: 100%
    margin: 0 auto
    padding: 0 15px
    display: flex
    justify-content: space-between
    flex-direction: column
  h1
    font-size: 36px
    color: white
    margin-top: 5px
  .tag-subtitle
    position: relative
    padding-left: 25px
    font-size: 14px
    &::before
      content: ''
      position: absolute
      left: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      height: 2px
      background-color: #fff
  .link
    display: flex
    align-items: center
    margin-top: 2rem
    gap: 15px
    font-weight: 400
    .icon
      width: 12px
      height: 12px
    a
      &:hover
        color: #aaceff

/* 关键帧动画 - 简化版本 */
@keyframes fadeInUp 
  0% 
    opacity: 0
    transform: translateY(8px)
  100% 
    opacity: 1
    transform: translateY(0)

@keyframes fadeIn 
  0% 
    opacity: 0
  100% 
    opacity: 1

/* 表单样式 - 针对低配置优化 */
.inf-bg
  width: 100%
  margin: 15px auto
  background-color: #fff
  padding: 20px 16px
  border-radius: 8px
  border: 1px solid #5ca6ff
  animation: fadeInUp 0.5s ease forwards
  opacity: 0
  .ul-contact-form-container 
    background-color: #fff
    padding: 20px 16px
    border-radius: 8px
    border: 1px solid #92acd9
    flex: 1 1 100%
    min-width: 0
    animation: fadeInUp 0.5s ease forwards
    opacity: 0
    &:nth-child(2)
      animation-delay: 0.1s
      
  .ul-contact-form input, .ul-contact-form textarea 
    width: 100%
    padding: 10px 12px
    font-size: 0.9rem
    font-weight: 500
    border: 1px solid #ccc
    border-radius: 6px
    background-color: #fff
    transition: border-color 0.2s ease
  .form-control:focus 
    color: #212529
    background-color: #fff
    border-color: #86b7fe
    outline: 0
    box-shadow: 0 0 0.15rem 1px rgba(13, 110, 253, .25)
  .form-group
    margin-bottom: 12px
    .position-relative
      position: relative
      label
        display: block
        letter-spacing: 0.3px
        margin-bottom: 6px
        font-size: 0.9rem
      .eyes
        position: absolute
        right: 8px
        bottom: 12px
        cursor: pointer
  .ul-contact-form-container__title
    font-size: 1.3rem
    font-weight: 600
    margin-bottom: 20px
    border-left: 3px solid #007BFF
    padding-left: 10px
    color: #222
    animation: fadeIn 0.8s ease forwards
    opacity: 0
  .ul-contact-form .update_password 
    width: 100%
    padding: 12px 0
    font-size: 16px
    font-weight: 500
    color: #fff
    background-color: #28a745
    border: none
    border-radius: 6px
    cursor: pointer
    text-align: center
    transition: background-color 0.2s ease
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4)
    &:hover 
      background-color: #218838

/* 移动端特定优化 */
@media screen and (max-width: 480px)
  .tag
    padding: 40px 0 15px
    h1
      font-size: 28px
    .tag-subtitle
      font-size: 12px
      padding-left: 20px
      &::before
        width: 15px
    .link
      margin-top: 1.5rem
      gap: 10px
      .icon
        width: 10px
        height: 10px
  
  .inf-bg
    margin: 10px auto
    padding: 15px 10px
    .ul-contact-form-container 
      padding: 15px 10px
    .ul-contact-form input, .ul-contact-form textarea 
      padding: 8px 10px
      font-size: 0.85rem
    .ul-contact-form-container__title
      font-size: 1.1rem
      margin-bottom: 15px
    .ul-contact-form .update_password 
      padding: 10px 0
      font-size: 15px
</style>