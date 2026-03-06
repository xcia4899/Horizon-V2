<template>
  <main class="cart">
    <div class="cart-inner container">
      <section class="cart-items">
        <ul class="cart-items-inner">
          <li class="cart-item cart-item--header">
            <div class="cart-col cart-col-01">
              <h2>您的購物車</h2>
            </div>
            <div class="cart-col cart-col-02">
              <h4 class="c2-01">單價</h4>
              <h4 class="c2-02">數量</h4>
              <h4 class="c2-03">合計</h4>
            </div>

            <div class="cart-col cart-col-03"></div>
          </li>
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="cart-col cart-col-01 item-image">
              <img :src="item.images" :alt="item.name" />
              <div class="item-title">
                <h4>{{ item.brand }}</h4>
                <h5>{{ item.name }}</h5>
              </div>
            </div>

            <div class="cart-col cart-col-02 item-details">
              <div class="item-price c2-01">
                <h5 v-show="item.onsale" :class="{ redcharacter: item.onsale }">
                  NT${{ item.price.toLocaleString() }}
                </h5>

                <h5 :class="{ strike: item.onsale }">
                  NT${{ item.originalPrice.toLocaleString() }}
                </h5>
              </div>

              <div class="item-quantity c2-02">
                <button class="btn-decrease" :disabled="item.quantity === 1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 10h10"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>

                <input
                  :value="item.quantity"
                  type="number"
                  min="1"
                  class="quantity-input"
                />

                <button class="btn-increase">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 5v10M5 10h10"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>

              <h5 class="item-total c2-03">
                NT${{
                  (
                    item.quantity *
                    (item.onsale ? item.price : item.originalPrice)
                  ).toLocaleString()
                }}
              </h5>
            </div>

            <div class="cart-col cart-col-03">
              <button class="btn-remove" type="button" aria-label="移除商品">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </section>

      <section class="cart-summary">
        <div class="cart-summary-inner">
          <div class="Remark">
            <h4>
              備註
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 5h18v2H3zM7 11h10v2H7zM10 17h4v2h-4z" />
              </svg>
            </h4>
            <textarea v-show="true" placeholder="請輸入備註..."></textarea>
          </div>
          <div>
            <div class="arrangement">
              <h4>發票類型</h4>
              <select v-model="billType">
                <option disabled value="">請選擇發票類型</option>
                <option value="electronic">電子發票</option>
                <option value="carrier">條碼載具</option>
                <option value="invoice">統一發票</option>
                <option value="donate">捐贈</option>
              </select>
            </div>
            <div class="bill_area">
              <div v-if="billType === 'electronic'">
                <label>
                  <p>電子發票：系統自動開立，無須提供資料。</p>
                </label>
              </div>
              <div v-if="billType === 'carrier'">
                <label
                  >載具條碼： <input type="text" placeholder="請輸入條碼"
                /></label>
              </div>
              <div v-if="billType === 'invoice'">
                <label
                  >統一編號：<input type="text" placeholder="請輸入統一編號"
                /></label>
                <label
                  >公司抬頭：<input type="text" placeholder="請輸入公司名稱"
                /></label>
              </div>
              <div v-if="billType === 'donate'">
                <label
                  >捐贈碼：<input type="text" placeholder="請輸入捐贈碼"
                /></label>
              </div>
            </div>
          </div>

          <div class="arrangement">
            <h4>運費</h4>
            <span>$400</span>
          </div>
          <div class="arrangement">
            <h4>總計</h4>
            <span>$ (total + 400).toLocaleString() </span>
          </div>
          <div class="agreeCheckbox">
            <label>
              <input type="checkbox" />
              <span
                >我同意辦理退/換貨時，由賣方代為處理銷售憑證(發票處理/銷售折讓)以加速作業流程</span
              >
            </label>
          </div>
          <div class="btn-area">
            <a><button class="btn btn-checkout">前往結帳</button></a>
            <a href="./productlist.html"
              ><button class="btn btn-keep">繼續購物</button></a
            >
          </div>
          <p>運費、稅金和折扣碼在結帳時計算</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
const billType = ref(null);
const cartItems = ref([
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    price: 4490,
    originalPrice: 4990,
    quantity: 1,
    onsale: true,
    colorOptions: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: "/images/pic-detal/RAZER-1000/10001.jpg",
  },
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    price: 4490,
    originalPrice: 4990,
    quantity: 1,
    onsale: true,
    colorOptions: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: "/images/pic-detal/RAZER-1000/10001.jpg",
  },
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    price: 4490,
    originalPrice: 4990,
    quantity: 1,
    onsale: true,
    colorOptions: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: "/images/pic-detal/RAZER-1000/10001.jpg",
  },
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    price: 4490,
    originalPrice: 4990,
    quantity: 1,
    onsale: true,
    colorOptions: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: "/images/pic-detal/RAZER-1000/10001.jpg",
  },
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    price: 4490,
    originalPrice: 4990,
    quantity: 1,
    onsale: true,
    colorOptions: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: "/images/pic-detal/RAZER-1000/10001.jpg",
  },
]);
</script>

<style scoped lang="scss">
.cart {
  display: grid;
  place-items: center;
  * {
    border: 1px solid;
  }
  padding-block: clamp(84px, 10vw, 120px);
  min-height: 100vh;

  .cart-inner {
    display: flex;
    gap: 32px;
    // padding-top: 64px;
    // padding: 120px 0px ;
  }

  .cart-items {
    position: relative;
    .cart-items-inner {
      display: flex;
      flex-direction: column;
      gap: 16px;
      // max-height: 540px;
      // overflow-y: auto;
      // scrollbar-width: none;
    }

    .cart-item {
      position: relative;
      display: grid;
      grid-template-columns: minmax(220px, 36%) minmax(420px, 60%) 40px;
      align-items: center;
      gap: 8px;
      padding: 16px 8px;
      min-height: 140px;
      transition: all 0.2s ease;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -8px;
        width: 100%;
        height: 1px;
        border-radius: 1px;
        background-color: var(--border-default);
      }

      &:hover {
        border-radius: 12px;
        color: #e95b5b;
      }

      &:hover .item-quantity {
        border-color: #db4b4b;
      }

      .cart-col {
        display: flex;
        align-items: center;
        height: 100%;
      }

      .cart-col-01 {
        min-width: 0;
      }

      .cart-col-02 {
        display: grid;
        grid-template-columns: repeat(3, minmax(100px, 1fr));
        align-items: center;
        justify-items: center;
        gap: 8px;
        min-width: 0;

        .c2-01,
        .c2-02,
        .c2-03 {
          width: 100%;
          display: flex;
          justify-content: center;
          white-space: nowrap;
        }
      }

      .cart-col-03 {
        justify-content: center;
        width: 40px;
      }

      &.cart-item--header {
        height: 80px;
        &:hover {
          color: inherit;
        }
        &::after {
          height: 2px;
        }
      }

      .item-image {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;

        img {
          width: 88px;
          height: 88px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .item-title {
          min-width: 0;
          text-align: left;

          h4 {
            font-weight: 600;
          }

          h5 {
            margin-top: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }

      .item-details {
        .item-price {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
        }

        .item-quantity {
          display: flex;
          align-items: stretch;
          width: 100%;
          max-width: 120px;
          height: 36px;
          border: 1px solid #cecece;
          border-radius: 4px;
          transition: all 0.3s ease;
          overflow: hidden;

          .quantity-input {
            width: 100%;
            height: 100%;
            text-align: center;
            border: none;
            border-left: 1px solid #c7c7c7;
            border-right: 1px solid #c7c7c7;
            background-color: transparent;
            outline: none;
            transition: all 0.3s ease;

            &[type="number"]::-webkit-outer-spin-button,
            &[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }

          .btn-increase,
          .btn-decrease {
            width: 32px;
            min-width: 32px;
            height: 100%;
            outline: none;
            border: none;
            background-color: transparent;
            transition: all 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            svg {
              width: 18px;
              height: 18px;
              transform: scale(1.2);
            }

            &:hover {
              background-color: #e95b5b;
            }

            &:hover svg {
              color: $color-white;
            }

            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          }
        }

        .item-total {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .btn-remove {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        aspect-ratio: 1 / 1;
        border: none;
        background-color: transparent;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;

        svg {
          transform: scale(1.2) rotate(45deg);
        }

        &:hover {
          background-color: #e95b5b;
        }

        &:hover svg {
          color: $color-white;
        }
      }
    }
  }

  .cart-summary {
    position: relative;
    .cart-summary-inner {
      position: sticky;
      top: 72px;
      top: clamp(72px, 5vh, 90px);
      // margin-top: 32px;
      padding: 16px;
      border-radius: 12px;
      // height: 600px;
      background-color: #fff;
      // height: 100%;
      min-width: 200px;
      max-width: 360px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 32px;
      text-align: center;
    }
    h4 {
      font-weight: 600;
    }
    div {
      // margin-bottom: 32px;
      width: 100%;
    }

    .Remark {
      text-align: left;
      display: flex;
      flex-direction: column;
      cursor: pointer;

      &:hover svg {
        color: #e95b5b;
      }

      svg {
        transition: all 0.3s ease;
        vertical-align: bottom;
      }

      svg.rotate {
        transform: rotateX(180deg);
      }

      label {
        cursor: pointer;
      }

      textarea {
        min-width: 268px;
        height: 100px;
        resize: vertical;
        margin-top: 8px;
      }
    }

    .arrangement {
      outline: none;
      display: flex;
      align-items: center;

      h4 {
        width: 40%;
        text-align: left;
      }

      span {
        width: 60%;
        text-align: right;
      }

      select {
        width: 60%;
      }
    }

    .bill_area {
      h4 {
        font-weight: 500;
      }

      p {
        margin: 0;
        text-align: left;
      }

      label {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        font-size: 16px;

        input {
          padding: 4px 4px;
          width: 60%;
          // margin-top: 8px;
        }
      }
    }

    .agreeCheckbox {
      label,
      span {
        vertical-align: top;
      }

      label {
        cursor: pointer;

        span {
          font-size: 14px;
        }
      }
    }

    .btn-area {
      .btn {
        width: 100%;

        &:hover {
          color: #e95b5b;
        }
      }

      .btn-keep {
        margin-top: 8px;
      }
    }

    p {
      font-size: 14px;
    }
  }
}
</style>
