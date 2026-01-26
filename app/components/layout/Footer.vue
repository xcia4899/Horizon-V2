<template>
  <section class="footer-top">
    <h3 class="title">訂閱最新消息</h3>
    <div class="input">
      <input class="input-field" type="text" placeholder="請輸入Email" />
      <button class="btn input-btn"><h5>GO!</h5></button>
    </div>
    <p class="text">
      點擊“<span>Go!</span>”即表示您同意接收 Horizon
      的最新產品消息、優惠活動與專屬折扣。隨時取消訂閱，詳情請見使用條款。
    </p>
  </section>

  <section class="footer-main">
    <div class="main-left">
      <ul v-for="(items, index) in footerLinks" :key="index" class="item">
        <li class="title">
          {{ items.title }}
        </li>
        <li v-for="item in items.links" :key="item.text" class="text">
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="main-right">
      <h4>支援付款方式</h4>
      <div class="Payment">
        <Icon name="mdi:credit-card-multiple-outline" class="icon" />
        <Icon name="mdi:wallet-outline" class="icon" />
        <Icon name="mdi:qrcode-scan" class="icon" />
        <Icon name="mdi:bank-transfer" class="icon" />
      </div>
      <h4>追蹤我們的社群</h4>
      <p>客服上班時間 09:30～18:30 <br />（週一至週五，假日及國定假日除外)</p>
    </div>
  </section>
  <hr />
  <section class="footer-other">
    <p>支援 ID：77183a7ea63dc837</p>
    <p>English 中文 (繁體)</p>
  </section>
</template>

<script setup lang="ts">
const footerLinks = [
  {
    title: "關於我們",
    links: [
      { text: "服務據點", href: null },
      { text: "環境永續", href: null },
      { text: "材料科技", href: null },
      { text: "人才招募", href: null },
      { text: "Facebook", href: null },
    ],
  },
  {
    title: "支援服務",
    links: [
      { text: "常見問題", href: null },
      { text: "產品支援", href: null },
      { text: "退換貨須知", href: null },
      { text: "聯絡我們", href: null },
      { text: "追蹤我的訂單", href: null },
    ],
  },
  {
    title: "法律聲明",
    links: [
      { text: "網站使用條款", href: null },
      { text: "隱私保護政策", href: null },
      { text: "智慧財產權", href: null },
    ],
  },
];
</script>

<style scoped lang="scss">
.footer-top {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px 0px;

  .title {
    text-align: center;
    padding: 16px 0px;
  }

  .input {
    display: flex;
    .input-field {
      width: 100%;
      height: 40px;
      border-radius: 4px 0px 0px 4px;
      transition: border-color 0.3s ease;

      &:hover {
        background-color: #ffffff;
      }

      &:focus {
        background-color: #ffffff;
        outline: #c54242;
      }
    }

    .input-btn {
      width: 80px;
      height: 40px;
      border-radius: 0px 4px 4px 0px;
      background-color: $color-purple-500;
      color: $color-white;
      @include baseTransition;
      border-style: none;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          width: 100px;
          background-color: $color-purple-300;
        }
      }
      &:active {
        width: 100px;
        background-color: $color-purple-300;
      }
    }
  }
  .text {
    padding: 8px 0px;
    span {
      color: $color-purple-500;
    }
  }
}
.footer-main {
  // min-height: 200px;
  display: flex;
  justify-content: space-between;
  // flex-wrap: wrap;
  gap: 10vw;
  width: 100%;
  padding: 16px 0 32px;
  .main-left {
    // background-color: #bbbbbb;
    display: flex;
    justify-content: space-between;
    flex: 1;
    .item {
      min-width: 120px;
      max-width: 160px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .title {
      font-size: clamp(20px, 1.5vw, 24px);
      margin-bottom: 8px;
      cursor: default;
    }
    .text {
      font-size: clamp(14px, 1.5vw, 16px);
      @include baseTransition(color, 0.4s);
      cursor: pointer;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: $color-purple-300;
        }
      }
      &:active {
        transform: scale(0.99);
        color: $color-purple-300;
      }
    }
  }
  .main-right {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .Payment {
      display: flex;
      // justify-content: center;
      gap: 8px;
      .icon {
        font-size: 30px;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: $color-purple-300;
          }
        }
      }
    }
  }
}

.footer-other {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0px 16px;
}

@media screen and (max-width: 768px) {
  .footer-main {
    flex-wrap: wrap;
    .main-left {
      justify-content: space-between;
      .title {
        text-align: center;
      }
      .text {
        text-align: center;
      }
    }
    .main-right {
      text-align: center;
      width: 100%;
      .Payment {
        justify-content: center;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .footer-main {
    .main-left {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }
    .main-right {
      text-align: center;
    }
  }
}
</style>
