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
const productList = ref([
  { name: "半導體系統", validation: "Semiconductor" },
  { name: "絕緣材料系統", validation: "Silicon wafer" },
  { name: "新興與特殊材料", validation: "III-V Microcircuit" },
  { name: "AI 晶片系統", validation: "AI on Chip" },
  { name: "矽光子系統", validation: "Silicon Photonics" },
])
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
        case 'SERVER_TIME': {
          serverTime.value = data
          break
        }
        default:
          break
      }
      switch (event) {
        case 'PRODUCT_UPDATE': {
          // productList.value = data.result
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
          await startConnectWebSocket()
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


await onMounted(async () => {
  // await startConnectWebSocket()
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
console.log(productList, 'productList');

</script>
<template>
  <div class="page">
    <video autoplay muted loop poster="@/assets/image/index/bot-game-frame.jpg">
      <source src="https://upload.comethike.com/uploads/1759937570650.mp4" type="video/mp4">
      </source>
    </video>
    <div class="section1">
      <div v-if="productList.length > 0" class="wallet-list">
        <div class="item" @click="onPush(item.validation)" v-for="(item, index) in productList" :key="index">
          <h3>{{ item.name || '-' }}</h3>
          <h2>進入系統</h2>
          <h5>{{ item.validation }}</h5>
        </div>
        <div class="item" @click="navigateTo('/user')">
          <h3>技術系統</h3>
          <h2>返回首頁</h2>
          <h5>返回技術系統頁面</h5>
        </div>
      </div>
      <div v-else class="load">數據加載中...</div>
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
    overflow: auto
    @media (max-width: 768px)
      display: block
      padding: 100px 0
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
    .load
      color: #fff
      font-size: 2rem
</style>
