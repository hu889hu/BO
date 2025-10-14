<script lang="ts" setup>

const { queryTransaction } = useTransactionStore()
const { queryWithdrawRecord, queryDepositRecords, queryWalletLog } =
  useWalletStore()
const recordList: any = ref([])
const recordType = ref('withdraw')
const siteStore = useSiteStore()
const playerStore = usePlayerStore()
console.log(playerStore.playerInfo)

const { t } = useI18n()
const selectWallet: any = ref({})

const walletTypeName = (type: any) => {
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

onMounted(async () => {
  const firstWallet = playerStore.playerInfo.wallet.find(
    (item: any) => item.type === 2
  )
  const queryWalletLogRes = await queryWalletLog({
    walletId: firstWallet.id,
    page: 1,
    limit: 1000,
    size: 1000
  })
  const WalletLog = queryWalletLogRes.data.result.filter((item: any) => {
    return item.type === 0 || item.type === 3 || item.type === 4
  })
  const queryWithdrawRecordRes = await queryWithdrawRecord({})
  const withdraw = queryWithdrawRecordRes.data.result
  recordList.value = WalletLog.concat(withdraw)
  recordList.value = recordList.value.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
})

const showSectionType = (type: string) => {
  const bank = siteStore.siteData.depositOptions.bank.find((item) => {
    return item === type
  })
  if (!bank) {
    return true
  } else {
    return false
  }
}

const transactionRecordType = (type: any) => {
  const transactionTypeList = [
    {
      value: 0,
      label: t('儲值')
    },
    {
      value: 1,
      label: t('提領')
    },
    {
      value: 2,
      label: t('轉帳')
    },
    {
      value: 3,
      label: t('贈送')
    },
    {
      value: 4,
      label: t('活動')
    },
    {
      value: 5,
      label: t('結算')
    },
    {
      value: 6,
      label: t('系統')
    },
    {
      value: 7,
      label: t('下注')
    }
  ]
  const data = siteStore.siteData.walletLogType.find(
    (item) => item.type === type
  )
  if (selectWallet.value.type !== 1 && type === 7) {
    return '質押'
  } else {
    return data ? data.label : t('未知')
  }
}
const applyStatus = (status: any) => {
  const statusList = [
    {
      value: 0,
      label: '審核中'
    },
    {
      value: 1,
      label: '審核通過'
    },
    {
      value: 2,
      label: '審核駁回'
    }
  ]
  const data = statusList.find((item) => item.value === status)
  return data ? data.label : t('未知')
}
const applyStatus2 = (status: any) => {
  const statusList = [
    {
      value: 0,
      label: '提領申請'
    },
    {
      value: 1,
      label: '提領成功'
    },
    {
      value: 2,
      label: '提領失敗'
    }
  ]
  const data = statusList.find((item) => item.value === status)
  return data ? data.label : t('未知')
}
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
const hiddenAccountNo = (value) => {
  if (value) {
    return value.replace(/^.{4}/, '****')
  } else {
    return ''
  }
}
const formatMemo = (value: any) => {
  if (value.includes('[高低單雙]')) {
    const pattern = /(\d{12}).*?「([^」]+)」/
    let str = value.match(pattern)

    // str = '訂單編號：' + str[1] + '\r\n' + str[2].replace('高', '購置').replace('低', '放置')
    str =
      '訂單編號：' +
      str[1] +
      ' ' +
      '\r\n' +
      str[2].replace('高', '購置').replace('低', '放置')
    return str
  } else if (value.includes('[投注成功]')) {
    let str = value
    //   .replace('投注成功', '訂單成功')
    //   .replace('期別', '訂單編號')
    //   .replace('高', '購置')
    //   .replace('低', '放置')
    const pattern =
      /\[投注成功\]\s+投注-(.*?)\s+期別-(\d+)\s+選項-(.*?)\s+金額-\d+/
    str = str.match(pattern)
    // str = '[訂單成功] ' + str[1] + '\r\n' + '訂單編號：' + str[2] + '\r\n' + str[3].replace('高', '購置').replace('低', '放置')
    str =
      '[訂單成功] ' +
      str[1] +
      '\r\n' +
      '訂單編號：' +
      str[2] +
      '\r\n' +
      str[3].replace('高', '選項-購置 ').replace('低', '選項-放置 ')
    return str
  } else {
    return value
  }
}
</script>

<template>
  <div class="pages">
    <div class="ul-cart-container" :class="recordType == 'transaction' ? 'ck-container' : ''">
      <div class="tag" :class="recordType == 'transaction' ? 'tag2' : ''">
        <div class="tag-title">
          <div class="tag-subtitle">財務申請相關紀錄</div>
          <h1>財務紀錄</h1>
          <p class="link">
            <router-link to="/user">{{ $lang('職員中心') }}</router-link>
            <svg t="1759997221376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="1542" width="32" height="32">
              <path
                d="M323 837.6875c0-6.75 2.53125-13.5 7.59375-18.5625l307.12500001-307.125L330.59375 204.875c-5.0625-5.0625-7.59375-11.390625-7.59375-18.5625 0-6.75 2.53125-13.5 7.59375-18.5625 10.125-10.125 26.578125-10.125 36.703125 0L693.40625 493.4375c5.0625 5.0625 7.59375 11.390625 7.59375 18.5625 0 6.75-2.53125 13.5-7.59375 18.5625L367.71875 856.25c-10.125 10.125-26.578125 10.125-36.703125 0-5.0625-5.0625-8.015625-11.8125-8.015625-18.5625z"
                fill="#ffffff" p-id="1543"></path>
            </svg>
            <span>財務紀錄</span>
          </p>
        </div>
      </div>
      <div class="tag-tit">
        <h1>您的財務紀錄</h1>
        <p>相關申請紀錄</p>
      </div>
      <div class="cart-top">
        <div class="table-responsive">
          <table class="ul-cart-table">
            <thead>
              <tr>
                <td>{{ $lang('申請時間') }}</td>
                <td>{{ $lang('申請內容') }}</td>
                <td>{{ $lang('申請金額') }}</td>
                <td>{{ $lang('申請總結') }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in recordList" :key="index">
                <!-- 時間 -->
                <td>
                  <p>
                    {{ formatDate(item.createdAt) }}
                  </p>
                </td>
                <!-- 內容 -->
                <td>
                  <div v-if="item.bankData">
                    <div>{{ $lang('銀行') }}:{{ item.bankData.bankName }}</div>
                    <div>{{ $lang('分行') }}:{{ item.bankData.branch }}</div>
                    <div>{{ $lang('戶名') }}:{{ item.bankData.account }}</div>
                    <div>{{ $lang('帳號') }}:{{ hiddenAccountNo(item.bankData.accountNo) }}</div>
                    <div>{{ $lang('狀態') }}:{{ applyStatus2(item.status) }}</div>
                    <!-- <div>
                      {{ $lang('手續費') }}: $
                      {{ new Intl.NumberFormat('zh-TW').format(item.fee) }}
                    </div> -->
                  </div>
                  <div v-else>
                    {{ transactionRecordType(item.type) }}
                  </div>
                </td>

                <!-- 金額 -->
                <td>
                  <p>
                    $ {{ new Intl.NumberFormat('zh-TW').format(item.amount) }}</p>
                </td>
                <td>
                  <div v-if="item.bankData">
                    {{ applyStatus(item.status) }}
                  </div>
                  <div v-else>
                    {{ transactionRecordType(item.type) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.pages
  box-sizing: border-box
  @media screen and (max-width: 768px)
    padding: 0 5px 5px
</style>

<style scoped lang="sass">
.tag2
   background: url(@/assets/image/index/record2.jpg)  no-repeat center / cover !important
.tag
  position: relative
  background: url(@/assets/image/index/record.jpg)  no-repeat center / cover
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
.tag-tit
  text-align: center
  padding: 60px 0 0
  p
    margin-top: 30px
    font-size: 16px
.changeType
  display: flex
  align-items: center
  justify-content: center
  gap: 20px
  .buttonWhite
    margin-top: 15px
    padding: 10px 20px
    background: transparent
    color: #1f1f1f
    border: 1px solid #1f1f1f
    border-radius: 5px
    transition: all 0.3s ease-in-out
    &:hover
      color: #aaceff
      border: 1px solid #aaceff
    &.active
      color: #aaceff
      border: 1px solid #aaceff
      background: #5e95cd9a
      color: white 
      
.ul-cart-container
  min-height: 100vh
  .cart-top
    max-width: 100%
    .ul-cart-table
      width: 1200px
      margin: 20px auto
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
        padding-top: clamp(18px, 1.47vw, 28px)
        padding-bottom: clamp(18px, 1.47vw, 28px)
        padding-right: clamp(30px, 1.47vw, 28px)
        text-align: center
        p
          margin-top: 0
          margin-bottom: 1rem

@media screen and (max-width: 1140px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 30px !important
@media screen and (max-width: 992px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 15px !important
@media screen and (max-width: 768px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 0px !important
    overflow: auto
</style>

<style scoped lang="sass">
.walletBox
  padding: 10px 0
  select
    margin-left: 10px
.selectStyle
  height: 32px
  padding: 2px 15px
  font-size: 19px
  line-height: 32px
  font-weight: 400
  background-color: #fff
  border: 1px solid #000
  border-radius: 4px
  width: 130px !important
.formSection
  margin: 20px 0 0 0
  width: 100%
  height: 58vh
  position: relative
  border-radius: 5px
  font-size: 16px
  overflow-y: auto
  @media screen and (max-width: 768px)
    height: 48vh
  .formContent
    width: 100%
</style>

<style scoped lang="sass">
.title
  background-color: #c8a375
  width: 100%
  margin: 0 auto 20px
  border-radius: 50px
  line-height: 40px
  height: 40px
  font-size: 20px
  padding: 0 30px
  font-weight: bold
  color: #fff
  cursor: pointer
  @media screen and (min-width: 768px)
    padding: 0 30px
    line-height: 55px
    height: 55px
    font-size: 24px
    width: calc(100% - 30px)
.buttonWhGreen
  width: 120px
  height: 40px
  line-height: 38px
  text-align: center
  color: #fff
  background-color: #c8a375
  border: none
  border-radius: 50px
  font-size: 19px
  outline: 0
  border: solid 1px #fff
  margin: 30px auto
  display: block
  &:hover
    opacity: 0.8
  @media screen and (max-width: 768px)
    width: 135px
  svg
    padding: 0 10px 0 0
.active
  background-color: #0d6efd
  color: #FFF
</style>
