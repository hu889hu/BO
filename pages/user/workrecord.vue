<script lang="ts" setup>
const playerStore = usePlayerStore()
const { t } = useI18n()
const { getListenkey } = playerStore
const socket: any = ref(null)
const socketConnected = ref(false)
const isFirstGet = ref(false)
const ordertList = ref([])
const isloading = ref(false)
// game socket
const reconnected = ref(true)
const closeWebSocket = async () => {
    if (socket.value) {
        socket.value.close()
    }
}
const sendMessage = (msg: any) => {
    // send message to server
    socket.value.send(JSON.stringify(msg))
}

// 連接 socket
const startConnectWebSocket = async () => {
    const getListenkeyRes = await getListenkey()
    console.log('getListenkeyRes', getListenkeyRes)
    if (getListenkeyRes.success) {
        const runtimeConfig = useRuntimeConfig()
        const { POWERSOCKETURL } = runtimeConfig.public
        socket.value = new WebSocket(
            `${POWERSOCKETURL}/${getListenkeyRes.data.listenkey}`
        )
        socket.value.onopen = (event) => {
            console.log('Connected to socket', event)
            socketConnected.value = true
            sendMessage({
                op: 'subscribe',
                channel: ['product', 'order', 'round']
            })
        }
        socket.value.onmessage = async (e) => {
            const message = JSON.parse(e.data)
            // console.log('收到來自 socket 的訊息', message)
            const { event, data } = message
            switch (event) {
                case 'ORDER_UPDATE': {
                    isloading.value = true
                    ordertList.value = data.result.sort((a, b) => {
                        return (
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        )
                    })
                    break
                }
                default:
                    break
            }
        }
        socket.value.onclose = async () => {
            console.log('Disconnected from socket')
            isFirstGet.value = true
            socketConnected.value = false
            if (reconnected) {
                setTimeout(async () => {
                    // await startConnectWebSocket()
                    console.log('reconnected to socket')
                }, 3000)
            }
        }

        socket.value.onerror = (error) => {
            socketConnected.value = false
            console.error('WebSocket error:', error)
        }
    }
}


onMounted(async () => {
    await startConnectWebSocket()
})

onBeforeUnmount(() => {
    reconnected.value = false
    closeWebSocket()
})
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
        <div class="ul-cart-container">
            <div class="tag tag2">
                <div class="tag-title">
                    <div class="tag-subtitle">工作相關紀錄</div>
                    <h1>工作紀錄</h1>
                    <p class="link">
                        <router-link to="/user">{{ $lang('職員中心') }}</router-link>
                        <svg t="1759997221376" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1542" width="32" height="32">
                            <path
                                d="M323 837.6875c0-6.75 2.53125-13.5 7.59375-18.5625l307.12500001-307.125L330.59375 204.875c-5.0625-5.0625-7.59375-11.390625-7.59375-18.5625 0-6.75 2.53125-13.5 7.59375-18.5625 10.125-10.125 26.578125-10.125 36.703125 0L693.40625 493.4375c5.0625 5.0625 7.59375 11.390625 7.59375 18.5625 0 6.75-2.53125 13.5-7.59375 18.5625L367.71875 856.25c-10.125 10.125-26.578125 10.125-36.703125 0-5.0625-5.0625-8.015625-11.8125-8.015625-18.5625z"
                                fill="#ffffff" p-id="1543"></path>
                        </svg>
                        <span>工作記錄</span>
                    </p>
                </div>
            </div>
            <div class="tag-tit">
                <h1>您的工作記錄</h1>
                <p>相關工作紀錄</p>
            </div>
            <div class="cart-top" v-if="isloading">
                <table class="ul-cart-table">
                    <thead>
                        <tr>
                            <td>{{ $lang('時間') }}</td>
                            <td>{{ $lang('單號') }}</td>
                            <td>{{ $lang('内容') }}</td>
                            <td>{{ $lang('數量') }}</td>
                            <td>{{ $lang('結果') }}</td>
                            <td>{{ $lang('種類') }}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in ordertList" :key="index">
                            <td>{{ formatDate(item.createdAt) }}</td>
                            <td class="content">{{ item.roundNo }}</td>
                            <td>{{ item.option.type }}</td>
                            <td>{{ item.amount }}</td>
                            <td>
                                <div v-if="item.status === 0">
                                    {{ $lang('調整中') }}
                                </div>
                                <div v-else>
                                    <div v-if="item.profit > 0">
                                        {{ $lang('調整完成') }}
                                    </div>
                                    <div v-else>{{ $lang('調整失敗') }}</div>
                                </div>
                            </td>
                            <td>
                                {{ item.productName }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="text">
                數據加載中...
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
        font-size: 16px
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
.text
  text-align: center
  font-size: 20px
  color: #000
  margin-top: 50px
</style>
