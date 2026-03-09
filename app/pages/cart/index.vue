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
          <div class="into-remark">
            <h4 class="title">備註</h4>
            <textarea v-show="true" placeholder="請輸入備註..."></textarea>
          </div>
          <div class="into-bill">
            <div class="bill-select into-inner">
              <h4 class="title">發票類型</h4>
              <select v-model="billType" class="select">
                <option disabled value="">請選擇發票類型</option>
                <option
                  v-for="type in billTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>

            <div v-if="currentBill" class="bill-area">
              <!-- 說明 -->
              <p v-if="currentBill.description">
                {{ currentBill.description }}
              </p>

              <!-- 欄位 -->
              <label v-for="field in currentBill.fields" :key="field.key">
                {{ field.label }}

                <input
                  v-model="billForm[field.key]"
                  type="text"
                  :placeholder="field.placeholder"
                />
              </label>
            </div>
          </div>

          <div class="into-inner">
            <h4>運費</h4>
            <span>$400</span>
          </div>
          <div class="into-inner">
            <h4>總計</h4>
            <span>$ (total + 400).toLocaleString() </span>
          </div>
          <label class="into-agree">
            <input type="checkbox" />
            <p>
              我同意辦理退/換貨時，由賣方代為處理銷售憑證(發票處理/銷售折讓)以加速作業流程
            </p>
          </label>
          <div class="into-btns">
            <button class="btn btn-checkout">前往結帳</button>

            <button class="btn btn-keep">繼續購物</button>
          </div>
          <p class="into-subtitle">運費、稅金和折扣碼在結帳時計算</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
interface BillField {
  label: string;
  placeholder?: string;
  key: keyof typeof billForm;
}
interface BillType {
  value: string;
  label: string;
  description?: string;
  fields?: BillField[];
}
//綁定發票選擇select
const billType = ref("");
//綁定發票內輸入資料
const billForm = reactive({
  carrierCode: "",
  taxId: "",
  company: "",
  donateCode: "",
});
//發票資料
const billTypes: BillType[] = [
  {
    value: "electronic",
    label: "電子發票",
    description: "系統自動開立，無須提供資料",
  },
  {
    value: "carrier",
    label: "條碼載具",
    fields: [
      {
        label: "載具條碼",
        placeholder: "請輸入條碼",
        key: "carrierCode",
      },
    ],
  },
  {
    value: "invoice",
    label: "統一發票",
    fields: [
      {
        label: "統一編號",
        placeholder: "請輸入統一編號",
        key: "taxId",
      },
      {
        label: "公司抬頭",
        placeholder: "請輸入公司名稱",
        key: "company",
      },
    ],
  },
  {
    value: "donate",
    label: "捐贈",
    fields: [
      {
        label: "捐贈碼",
        placeholder: "請輸入捐贈碼",
        key: "donateCode",
      },
    ],
  },
];
//發票選擇
const currentBill = computed(() =>
  billTypes.find((b) => b.value === billType.value),
);

//購物車資訊
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
    onsale: false,
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
    quantity: 3,
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
    onsale: false,
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
    quantity: 2,
  },
]);
</script>

<style scoped lang="scss">
.cart {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: clamp(84px, 10vw, 120px);
  // min-height: 100vh;
  background: var(--bg-surface);
  .cart-inner {
    display: flex;
    justify-content: center;

    gap: 32px;
  }

  .cart-products {
    flex: 0 0 64%;
    position: relative;
    .cart-products-inner {
      display: grid;
      grid-template-rows: minmax(80px, 120px) 1fr;
      gap: 16px;
    }
    .cart-card {
      position: relative;
      display: grid;
      grid-template-columns: minmax(200px, 1fr) minmax(0, 1fr) 40px;
      align-items: center;
      // display: flex;
      // justify-content: space-between;
      gap: 16px;
      padding: 16px 8px;
      // background: var(--bg-surface-soft);
      /* 底線 */
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -8px;
        width: 100%;
        height: 1px;
        border-radius: 1px;
        background: var(--border-default);
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          border-radius: 12px;
          background: var(--bg-surface-soft);
        }
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
          .name {
            color: var(--text-secondary);
          }
        }
      }

      .card-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;

        .card-price {
          flex: 0 0 30%;
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
          flex: 0 0 33%;
          display: flex;
          justify-content: center;
          align-items: center;
          // width: 100%;
          max-width: 120px;
          height: 40px;
          min-height: 40px;
          border: 1px solid var(--border-soft);
          border-radius: 8px;
          // transition: all 0.3s ease;
          overflow: hidden;

          .quantity-input {
            width: 100%;
            min-width: 20px;
            height: 100%;
            text-align: center;
            font-size: 20px;
            border: none;
            outline: none;
            border-left: 1px solid var(--border-default);
            border-right: 1px solid var(--border-default);
            color: var(--text-primary);
            background: transparent;
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
            background: var(--bg-surface-strong);
            transition:
              color 0.3s ease,
              background-color 0.3s ease;

            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .icon {
              font-size: 24px;
              color: var(--text-primary);
            }
            @media (hover: hover) and (pointer: fine) {
              &:hover:not(:disabled) {
                background: var(--brand);
              }
              &:hover:not(:disabled) .icon {
                color: $color-white;
              }
            }
            &:active {
              background: transparent;
              .icon {
                transform: scale(0.95);
              }
            }
            &:disabled {
              // background: var(--bg-surface);
              opacity: 0.4;
              cursor: not-allowed;
            }
          }
        }
        .card-total {
          flex: 0 0 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 900;
        }
      }
      .card-delete {
        .btn-remove {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.3s ease;
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              color: var(--state-danger);
            }
          }
          &:active {
            transform: scale(0.9);
            color: var(--text-secondary);
          }
        }
      }
    }
    .cart-card.cart-head {
      user-select: none;
      padding: 8px;
      &:hover {
        color: inherit;
        background: inherit;
      }
      &::after {
        height: 2px;
        background: var(--border-soft);
        border-radius: 2px;
      }
      .card-details {
        gap: 0px;
      }
      .card-quantity {
        border: none;
      }
    }
  }

  .cart-information {
    flex: 0 0 30%;
    width: 100%;
    position: relative;
    // background-color: #fff;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .cart-information-inner {
      position: sticky;
      top: clamp(86px, 5vh, 104px);
      width: clamp(320px, 100%, 360px);
      width: 100%;
      padding: 16px;
      border-radius: 12px;
      background: var(--bg-surface-card);
      color: $color-black;
      display: flex;
      flex-direction: column;

      gap: 20px;
    }

    .into-remark {
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 8px;
      cursor: pointer;
      textarea {
        height: 100px;
        resize: vertical;
      }
    }

    .into-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // flex-wrap: wrap;
      gap: 8px;
      width: 100%;

    }
    .into-bill {
      display: grid;
      gap: 8px;
      .bill-select {
        .select {
          height: 100%;
          padding: 4px;
        }
      }
      .bill-area {
        display: grid;
        gap: 8px;
        padding: 8px;
        label {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        input {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid var(--border-default);
          &:focus {
            border-color: var(--border-soft);
          }
          &::placeholder {
            color: $color-gray-700;
          }
        }
      }
    }
    .into-agree {
      display: flex;
      gap: 8px;
      input {
        transform: scale(1.4);
      }
      p {
        font-size: 14px;
      }
    }
    .into-btns {
      display: grid;
      gap: 8px;
      .btn {
        width: 100%;
      }
    }
    .into-subtitle {
      text-align: center;
    }
  }
  @media screen and (max-width: 1024px) {
    .cart-inner {
      // flex-direction: column;
      width: 100%;
    }
    .cart-products {
      .cart-card {
        .card-details {
          flex-direction: column;
        }
      }
    }
  }
  @media screen and (max-width: 860px) {
    .cart-inner {
      flex-direction: column;
      width: 100%;
    }
    .cart-products {
      .cart-card {
        grid-template-columns: minmax(0, 1fr) 40px;
        grid-template-rows: auto auto;
        gap: 16px 4px;

        .card-title {
          grid-column: 1 / 2;
          grid-row: 1;
        }
        .card-details {
          grid-column: 1/3;
          grid-row: 2;
          flex-direction: row;
          // justify-content: space-between;
          // gap: 16px;
          .card-price,
          .card-total {
            flex: 0 0 20%;
          }
          .card-quantity {
            flex: 0 0 48%;
          }
        }
        .card-delete {
          grid-column: 2;
          grid-row: 1;
          justify-self: end;
        }
      }
    }
  }
}
</style>
