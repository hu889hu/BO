<script lang="ts" setup>
const router = useRouter()
const siteStore = useSiteStore()
const PlayerStore = usePlayerStore()
const { isLogin } = useAuthStore()
const { t } = useI18n()
const { getListenkey } = PlayerStore
const socket: any = ref(null)
const socketConnected = ref(false)
const serverTime = ref({})
const productList = ref([])
const isFirstGet = ref(false)



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

    // 检查 POWERSOCKETURL 是否存在
    if (!POWERSOCKETURL) {
      console.error('POWERSOCKETURL is undefined or null')
      return
    }

    // 检查 listenkey 是否存在
    const listenkey = getListenkeyRes.data?.listenkey || getListenkeyRes?.listenkey
    if (!listenkey) {
      console.error('listenkey is undefined or null')
      return
    }

    // 添加重试机制
    const connectWithRetry = (url: string, retries: number = 3) => {
      const ws = new WebSocket(url)
      ws.onopen = (event) => {
        console.log('Connected to socket', event)
        socket.value = ws
        socketConnected.value = true
        sendMessage({
          op: 'subscribe',
          channel: ['product', 'order', 'round']
        })
      }
      ws.onmessage = async (e) => {
        const message = JSON.parse(e.data)
        // console.log('收到來自 socket 的訊息', message)
        const { event, data } = message

        switch (event) {
          case 'PRODUCT_UPDATE': {
            productList.value = data.result
            break
          }
          default:
            break
        }
      }
      ws.onclose = async () => {
        console.log('Disconnected from socket')
        isFirstGet.value = true
        socketConnected.value = false
        if (reconnected.value && retries > 0) {
          setTimeout(async () => {
            console.log(`Retrying connection... ${retries} attempts left`)
            connectWithRetry(url, retries - 1)
          }, 3000)
        }
      }
      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        ws.close()
      }
    }

    connectWithRetry(`${POWERSOCKETURL}/${listenkey}`)
  } else {
    console.error('Failed to get listenkey', getListenkeyRes)
  }
}


await onMounted(async () => {
  await startConnectWebSocket()
})
onBeforeUnmount(() => {
  reconnected.value = false
  console.log('closeWebSocket', reconnected.value)
  closeWebSocket()
})

const onPush = (path: string) => {
  if (path === '/') return navigateTo(path)
  let pathStr = '/game?type=' + path
  navigateTo(pathStr)
}
</script>
<template>
  <div class="page">
    <video autoplay muted loop poster="@/assets/image/index/bot-game-frame.jpg">
      <source src="https://upload.comethike.com/uploads/1759937570650.mp4" type="video/mp4">
      </source>
    </video>
    <div class="section1">
      <div class="wallet-list">
        <div class="item" @click="onPush(item.validation)" v-for="(item, index) in productList" :key="index">
          <h3>{{ item.name || '-' }}</h3>
          <h2>進入系統</h2>
          <h5>{{ item.validation[0] }}</h5>
        </div>
        <div class="item" @click="navigateTo('/user')">
          <h3>技術系統</h3>
          <h2>返回首頁</h2>
          <h5>返回技術系統頁面</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
.page
  position: relative
  width: 100%
  height: 100vh
  overflow-y: auto
  video
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1
    object-fit: cover
    object-position: center
    opacity: 1
    filter: brightness(0.4)
  .section1
    position: relative
    z-index: 2
    height: 100%
    width: 100%
    background: rgba(1, 59, 114, 0.589)
    display: flex
    justify-content: center
    align-items: center
    .wallet-list
      display: flex
      justify-content: center
      align-items: center
      gap: 25px
      width: 100%
      max-width: 1200px
      flex-wrap: wrap
      .item
        min-width: 250px
        padding: 20px
        display: block
        background: rgba(0, 0, 0, 0.4)
        border: 1px solid #0ff
        box-shadow: 0 0 12px #0ff88c88
        border-radius: 15px
        padding: 20px
        color: #00f0ff
        text-decoration: none
        position: relative
        overflow: hidden
        transition: transform 0.3s, box-shadow 0.3s
        backdrop-filter: blur(8px)
        text-align: center
        cursor: pointer
        h3
          font-size: 24px
          color: #fff
          font-weight: bold
          padding: 14px 10px
        h2
          font-weight: bold
          font-size: 2.625rem
          color: #0ff
          text-shadow: 0 0 10px #0ff
        h5
          font-size: 16px
          padding: 10px 0
          color: #aaa
        @keyframes pulse 
          0%  
            transform: rotate(0deg)
          50%  
            transform: rotate(180deg)
          100%  
            transform: rotate(360deg)
        &::before
          content: ""
          position: absolute
          top: -50%
          left: -50%
          width: 200%
          height: 300%
          background: conic-gradient(from 0deg at 50% 50%, transparent, #0ff, transparent)
          animation: pulse 5s linear infinite
          z-index: -1
          opacity: 0.08
        &:hover
          // transform: translateY(-6px) scale(1.02)
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.5)
          border-color: rgba(0, 255, 255, 0.6)
</style>
