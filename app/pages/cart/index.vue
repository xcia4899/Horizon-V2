<template>
  <main class="cart">
    <div class="cart-inner container">
      <section class="cart-products">
        <ul class="cart-products-inner">
          <li class="cart-card cart-head">
            <div class="card-title">
              <h2>您的購物車</h2>
            </div>
            <div class="card-details">
              <h4 class="card-price">單價</h4>
              <h4 class="card-quantity">數量</h4>
              <h4 class="card-total">合計</h4>
            </div>

            <div class="card-delete"></div>
          </li>
          <li v-for="item in cartItems" :key="item.id" class="cart-card">
            <div class="card-title">
              <img :src="item.images.main" :alt="item.name" />
              <div class="title">
                <h4 class="brand">{{ item.brand }}</h4>
                <h5 class="name">{{ item.name }}</h5>
              </div>
            </div>

            <div class="card-details">
              <div class="card-price">
                <h5
                  v-show="item.onsale"
                  class="discount"
                  :class="{ redcharacter: item.onsale }"
                >
                  NT${{ item.discount.toLocaleString() }}
                </h5>
                <h5 class="price" :class="{ strike: item.onsale }">
                  NT${{ item.price.toLocaleString() }}
                </h5>
              </div>

              <div class="card-quantity">
                <button class="btn-minus" :disabled="item.quantity === 1">
                  <icon class="icon" name="humbleicons:minus" />
                </button>
                <input
                  :value="item.quantity"
                  type="number"
                  min="1"
                  class="quantity-input"
                />

                <button class="btn-add">
                  <icon class="icon" name="humbleicons:plus" />
                </button>
              </div>

              <h5 class="card-total">
                NT${{
                  (
                    item.quantity * (item.onsale ? item.discount : item.price)
                  ).toLocaleString()
                }}
              </h5>
            </div>

            <div class="card-delete">
              <button class="btn-remove" type="button" aria-label="移除商品">
                <Icon name="mdi:delete-circle-outline" class="icon" size="36" />
              </button>
            </div>
          </li>
        </ul>
      </section>

      <section class="cart-information">
        <div class="cart-information-inner">
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
    category: "鍵盤",
    discount: 4490,
    price: 4990,
    onsale: true,
    color: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: {
      main: "/images/pic-detal/RAZER-1000/10001.jpg",
      thumbnails: [
        "/images/pic-detal/RAZER-1000/10001.jpg",
        "/images/pic-detal/RAZER-1000/10002.jpg",
        "/images/pic-detal/RAZER-1000/10003.jpg",
        "/images/pic-detal/RAZER-1000/10004.jpg",
      ],
    },
    quantity: 1,
  },
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    category: "鍵盤",
    discount: 4490,
    price: 4990,
    onsale: true,
    color: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: {
      main: "/images/pic-detal/RAZER-1000/10001.jpg",
      thumbnails: [
        "/images/pic-detal/RAZER-1000/10001.jpg",
        "/images/pic-detal/RAZER-1000/10002.jpg",
        "/images/pic-detal/RAZER-1000/10003.jpg",
        "/images/pic-detal/RAZER-1000/10004.jpg",
      ],
    },
    quantity: 1,
  },

  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    category: "鍵盤",
    discount: 4490,
    price: 4990,
    onsale: true,
    color: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: {
      main: "/images/pic-detal/RAZER-1000/10001.jpg",
      thumbnails: [
        "/images/pic-detal/RAZER-1000/10001.jpg",
        "/images/pic-detal/RAZER-1000/10002.jpg",
        "/images/pic-detal/RAZER-1000/10003.jpg",
        "/images/pic-detal/RAZER-1000/10004.jpg",
      ],
    },
    quantity: 1,
  },
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    category: "鍵盤",
    discount: 4490,
    price: 4990,
    onsale: true,
    color: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: {
      main: "/images/pic-detal/RAZER-1000/10001.jpg",
      thumbnails: [
        "/images/pic-detal/RAZER-1000/10001.jpg",
        "/images/pic-detal/RAZER-1000/10002.jpg",
        "/images/pic-detal/RAZER-1000/10003.jpg",
        "/images/pic-detal/RAZER-1000/10004.jpg",
      ],
    },
    quantity: 1,
  },
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    category: "鍵盤",
    discount: 4490,
    price: 4990,
    onsale: true,
    color: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: {
      main: "/images/pic-detal/RAZER-1000/10001.jpg",
      thumbnails: [
        "/images/pic-detal/RAZER-1000/10001.jpg",
        "/images/pic-detal/RAZER-1000/10002.jpg",
        "/images/pic-detal/RAZER-1000/10003.jpg",
        "/images/pic-detal/RAZER-1000/10004.jpg",
      ],
    },
    quantity: 1,
  },
]);
</script>

<style scoped lang="scss">
.cart {
  display: grid;
  place-items: center;
  padding-block: clamp(84px, 10vw, 120px);
  min-height: 100vh;

  .cart-inner {
    display: flex;
    gap: 32px;
  }

  .cart-products {
    position: relative;
    .cart-products-inner {
      display: grid;

      grid-template-rows: 100px 1fr;
      gap: 16px;
    }

    .cart-card {
      position: relative;
      display: grid;
      grid-template-columns: minmax(220px, 36%) minmax(420px, 60%) 40px;

      align-items: center;
      gap: 8px;
      padding: 16px 8px;

      /* 底線 */
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
      &:hover .card-quantity {
        border-color: #db4b4b;
      }

      .card-title {
        display: flex;
        align-items: center;
        gap: 12px;

        img {
          width: 88px;
          height: 88px;
          object-fit: cover;
          border-radius: 8px;
        }

        .title {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      }

      .card-details {
        display: grid;
        grid-template-columns: repeat(3, minmax(80px, 1fr));
        align-items: center;
        justify-items: center;
        gap: 8px;

        .card-price {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
          .discount {
            color: var(--state-danger);
            font-weight: bolder;
          }
          .price.strike {
            text-decoration: line-through;
            color: var(--text-tertiary);
            opacity: 0.8;
            font-size: 14px;
          }
        }

        .card-quantity {
          display: flex;
          justify-content: center;
          align-items: center;
          // width: 100%;
          max-width: 120px;
          height: 40px;
          border: 1px solid #cecece;
          border-radius: 8px;
          // transition: all 0.3s ease;
          overflow: hidden;

          .quantity-input {
            width: 100%;
            height: 100%;
            text-align: center;
            border: none;
            outline: none;
            border-left: 1px solid #c7c7c7;
            border-right: 1px solid #c7c7c7;
            background-color: transparent;
            // transition: all 0.3s ease;

            &[type="number"]::-webkit-outer-spin-button,
            &[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }

          .btn-add,
          .btn-minus {
            // width: 32px;
            min-width: 32px;
            height: 100%;
            outline: none;
            border: none;
            // background-color: transparent;
            transition: all 0.3s ease;

            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .icon {
              font-size: 18px;
            }

            &:hover {
              background-color: #e95b5b;
            }

            &:hover .icon {
              color: $color-white;
            }

            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          }
        }
        .card-total {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .card-delete {
        .btn-remove {
          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
          transition: color 0.3s ease;
          &:hover {
            color: var(--state-danger)
          }
        }
      }
    }
    .cart-card.cart-head {
      &:hover {
        color: inherit;
      }
      &::after {
        height: 2px;
      }
    }
  }

  .cart-information {
    position: relative;
    .cart-information-inner {
      position: sticky;
      top: 72px;
      top: clamp(86px, 5vh, 104px);
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
