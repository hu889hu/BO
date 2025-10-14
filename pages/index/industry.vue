<script setup>
const siteStore = useSiteStore()

const openChatBox = () => {
  window.open(siteStore.chatbox, '_blank')
}
</script>
<template>
  <div class="industry-page">
    <div class="industry-bnr">
      <img src="@/assets/image/index/industry-bnr.jpg" alt="" />
      <div class="industry-txt">
        <div class="bnr-tit">
          <h1>
            康泰倫特
          </h1>
          <div class="nav">
            <div class="nav-item">
              <a @click="navigateTo('/')">返回首頁</a>
            </div>
            <img src="@/assets/image/index/nav-right.png" alt="">
            <div class="nav-item">
              <a>產業分配與製造業</a>
            </div>
          </div>
        </div>
        <div class="bnr-txt">
          <img src="@/assets/image/jqindex/arrow-up-right.png" alt="">
          <p>人形機器人為您的配送作業帶來可靠的勞動力。</p>
        </div>
      </div>
    </div>
    <div class="row">
      <aside class="col-lg-3">
        <div class="widget-box project-details-box">
          <h4 class="title">支持多種工作流程</h4>
          <div class="content">
            <ul>
              <li><strong>保持自動化技術領先的最佳途徑</strong></li>
              <li><strong>除了提高效率外增加工作的準確率</strong></li>
              <li><strong>可用於接單、訂單處理、庫存管理</strong></li>
            </ul>
          </div>
        </div>
        <div class="widget-box consulting-box">
          <div class="inner-box">
            <h4 class="title">使用人形機器人<br>解決常見問題</h4>
            <p class="text">應對勞動短缺，提高效率</p>
            <div class="pt-25 mb-50" style="width: 100%; margin: 30px 0 20px;">
              <div class="border"></div>
            </div>
            <div class="contact-info">
              <div class="contact-item">

                <div class="content">
                  <h4 class="title">滿足不斷增長的需求</h4>
                  <p>分銷行業正在努力應對電子商務的激增，迫使公司迅速適應不斷變化的需求模式</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="content">
                  <h4 class="title">擁抱全通路分銷</h4>
                  <p>訂單的多樣化與客製化系統營造雙贏</p>
                </div>
              </div>
            </div>
            <a href="skill.html" class="theme-btn bg-transparent mt-50">
              <span class="link-effect">
                <div class="effect-1">
                  <div>數位技能庫</div>
                  <div>數位技能庫</div>
                </div>
              </span>
              <i class="fa-regular fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </aside>
      <div class="col-lg-9">
        <div class="single-post">
          <div class="details-image">
            <img src="@/assets/image/jqindex/home13.jpg" alt="">
          </div>
          <h1>機器人智能使用選擇與運用</h1>
          <p>對於渴望走在科技前端的公司來說，人形機器人團隊是理想的自動化工具。我們提供企業級解決方案，以應對日益嚴峻的勞動力挑戰。根據您的具體需求，我們提供兩種方便的入門方式。</p>
          <h3>機器人即服務 (RaaS)</h3>
          <p>
            我們的機器人即服務模型提供圍繞訂閱模型構建的全包套餐（機器人、軟體、配件、服務）。它確保最大的靈活性，同時最大限度地減少部署機器人車隊所需的時間。憑藉靈活的合約條款、對峰值需求的額外機器人的支援以及圍繞性能里程碑的特定條款，多樣模型可以滿足您的需求。
          </p>
          <h3>購買技術</h3>
          <p>
            只需兩年即可獲得投資回報，傳統設備購買提供硬體和配件，可立即升級您的自動化技術。購買的額外SaaS部分使您無需購買新機器人即可獲得最新的升級、技能和改進。它還包括各種服務和支援附加元件。您所要做的就是選擇服務等級和機器人數量。
          </p>
          <h1>支援多種特定製造工作流程</h1>
          <p>製造業正經歷一場大規模的回流運動，涵蓋汽車、電子、服裝和製藥等多個產業。這一趨勢標誌著對全球供應鏈策略的更廣泛重新評估，以及對國內製造能力的重新重視!</p>
          <h4><i class="fa-solid fa-check" style="color: #063232;"></i> <span>支援線路整合規劃</span></h4>
          <h4><i class="fa-solid fa-check" style="color: #063232;"></i> <span>物品手提箱裝卸調整</span></h4>
          <h4><i class="fa-solid fa-check" style="color: #063232;"></i> <span>特定路線產品回收</span></h4>
          <div class="flex-img">
            <div class="img-bx">
              <img src="@/assets/image/jqindex/home14.jpg" alt="">
            </div>
            <div class="img-bx">
              <img src="@/assets/image/jqindex/home15.jpg" alt="">
            </div>
          </div>
          <h1>機器人的出現解決產業問題</h1>
          <p>隨著勞動力老化和年輕一代的興趣下降，尋找和留住技術工人構成了重大挑戰，從消除非增值活動到培養持續改善的文化，精實製造之旅對於保持競爭力至關重要。</p>
          <h4><i class="fa-solid fa-circle-check" style="color: #5a7779;"></i>
            <span>製造商必須投資於提高員工技能、培養創新文化，並策略性部署MMR等自動化解決方案</span>
          </h4>
          <h4>
            <i class="fa-solid fa-circle-check" style="color: #5a7779;"></i>
            <span>在利潤緊張和效率要求不斷提高的環境中，簡化營運是關鍵。</span>
          </h4>
          <hr>
        </div>
      </div>
    </div>
    <!-- /row -->
  </div>
</template>
<style scoped lang="sass">

.container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl
  margin: 30px auto !important
  @media (min-width: 1400px)
    max-width: 1320px
.margin-30
  margin-block: 30px

.industry-page
  background-color: #fff
  display: block !important
.industry-bnr
  height: 60dvh
  position: relative
  &>img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    z-index: 1
    width: 100%
    height: 100%
    background-color: rgba(2, 27, 27, 0.7)
  .industry-txt
    position: absolute
    bottom: 30%
    left: 50%
    z-index: 2
    transform: translate(-50%, 0)
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 16px
    width: 1320px
    max-width: 100%
    padding: 0 15px
    @media (max-width:768px)
      display: block
      text-align: center
      .bnr-tit
        .nav
          justify-content: center
    .bnr-tit
      color: #ffffff
      h1
        font-size: 56px
        font-weight: bold
        text-align: center
        margin-bottom: 20px
      .nav
        display: flex
        align-items: center
        gap: 10px
        img
          width: 40px
          height: 10px
    .bnr-txt
      color: #90b4b6
.row
  background-color: #fff
  max-width: 100%
  width: 1320px
  padding: 0 15px
  --bs-gutter-x: 1.5rem
  --bs-gutter-y: 0
  display: flex
  flex-wrap: wrap
  margin-top: 120px
  margin-inline: auto
  @media screen and (max-width: 991px)
    display: block
    padding: 12px !important
  .col-lg-9
    flex: 7
    margin: 0 1rem
  .col-lg-3
    flex: 3
    margin: 0 1rem
    .project-details-box
      background-color: #ecf8f8
      padding: 0
      border-radius: 10px
      width: 100%
      margin-bottom: 30px
      .title
        font-size: 22px
        color: #fff
        font-weight: 500
        text-align: center
        background-color: #063232
        padding: 25px 0
        border-radius: 10px 10px 0 0
        margin-bottom: 0
      .content
        padding: 10px 40px 22px
        ul
          li
            font-size: 15px
            color: #5a7779
            font-weight: 400
            padding: 13px 0
            border-bottom: 1px dashed #063232
    .consulting-box
      background: url(@/assets/image/index/home12.jpg) center / cover
      padding: 60px 40px
      border-radius: 10px
      position: relative
      z-index: 1
      overflow: hidden
      width: 100%
      margin-bottom: 30px
      &::before
        position: absolute
        content: ""
        width: 100%
        height: 100%
        background: rgba(6, 50, 50, 0.8)
        transition: all .4s ease-in-out
        left: 0
        top: 0
        z-index: -1
      .inner-box
        display: flex
        flex-direction: column
        align-items: flex-start
        .border
          width: 100%
          border-bottom: 1px solid rgba(255,255,255,0.2)
        .title
          line-height: 1.417
          font-size: 24px
          color: #fff
          font-weight: 500
          margin-bottom: 7px
        .text
          font-size: 16px
          color: #90b4b6
          font-weight: 400
          margin: 0 0 15px 0
          line-height: 1.75
        .contact-info
          .contact-item
            margin-bottom: 20px
          .content
            p
              font-size: 14px
              color: #90b4b6
              font-weight: 400
              margin-bottom: 0
        .theme-btn
          border: 1px solid rgba(255,255,255,0.2)
          color: #fff
          padding: 12px 40px
          border-radius: 40px
          display: flex
          align-items: center
          .link-effect
            position: relative
            height: 20px
          &:hover
            .effect-1
              div
                top: -20px
          .effect-1
            height: 20px
            line-height: 20px
            overflow: hidden
            div
              position: relative
              top: 0
              transition: .3s
.single-post
  background-color: #fff
  border-radius: 3px
  margin-bottom: 60px
  .details-image
    width: 100%
    height: 550px
    overflow: hidden
    border-radius: 10px
    position: relative
    margin-bottom: 20px
    &:hover
      &::before
        opacity: 1  
    &::before
      content: ''
      position: absolute
      transition: all .4s ease-in-out
      top: 0
      left: 0
      z-index: 1
      opacity: 0
      background-color: rgba(0, 0, 0, 0.5)
      width: 100%
      height: 100%
    &>img
      object-fit: cover
      width: 100%
      height: 100%
  h1
    font-size: 34px
    color: #063232
    font-weight: 600
    margin-bottom: 10px
    margin-top: 40px
  h3
    line-height: 1.75
    font-size: 20px
    color: #05138f
  h4
    display: flex
    align-items: center
    gap: 5px
    color: #5a7779
    font-size: 16px
    padding: 12px 0
    line-height: 1.75
  p
    margin-bottom: 15px !important
    width: 95%
    margin: 0 0 15px 0
    color: #5a7779
    line-height: 1.75
  .flex-img
    display: flex
    justify-content: space-between
    gap: 20px
    margin-top: 20px
    .img-bx
      border-radius: 10px
      position: relative
      overflow: hidden
      &:hover
        &::before
          height: 100%
          opacity: 0
          -webkit-transition: all 400ms linear
          -o-transition: all 400ms linear
          transition: all 400ms linear
      &::before
        content: ''
        position: absolute
        top: 0
        left: 0
        z-index: 1
        background: rgba(255, 255, 255, .3)
        width: 100%
        height: 0
        opacity: 1
        

.widget
  position: relative
  display: block
  margin-bottom: 15px
  .widget-title
    padding: 15px 0
    margin-bottom: 20px
    border-bottom: 1px solid #dddddd
@media screen and (max-width: 991px)
  // .col-lg-3
  //   display: none
  .col-lg-9
    margin: 0 auto !important
    width: 100%
    max-width: 100%
    // padding-right: .75rem
    // padding-left: .75rem
    margin-top: 0
</style>
