<template>
  <div class="product-page">
    <section class="product-cursoul">
      <BannerPromoBanner />
    </section>
    <div class="toggleSideber">
      <div class="content-area container">
        <button>
          關閉篩選條件
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 5h18v2H3zM7 11h10v2H7zM10 17h4v2h-4z" />
          </svg>
        </button>
      </div>
    </div>
    <main class="product-main container">
      <section class="col-sidebar " >
        <h4 class="toggletitle togglemini">篩選</h4>
        <ul>
          <li v-for="(section, index) in 6" :key="index">
            <div class="side-title">
              <h4>{{ section }}</h4>
              <span> </span>
            </div>

            <ul class="side-content">
              <li v-for="item in 4" :key="item">
                <label>
                  <input type="checkbox" :value="item" />
                  {{ item }}
                </label>
              </li>
            </ul>
          </li>
          <div class="togglemini toggleminibtn">
            <div class="reset">
              <h4>重置</h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <!-- 加號（+） -->
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <button class="btn">確定</button>
          </div>
        </ul>
      </section>
      <section class="products-show">
        <div class="btn-openlist">
          <button class="clear-btn">
            清除篩選條件
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <!-- 加號（+） -->
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <button v-for="(item, index) in 4" :key="index">
            {{ item }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <!-- 加號（+） -->
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="listrow">
          <div v-for="product in 6" :key="product" class="card">
            <div class="item-pic">
              <div class="pic">
                <img src="/images/pic-detal/RAZER-1000/10001.jpg" alt="" />
              </div>
              <div class="card-title">product.brand</div>
            </div>
            <div class="item-text">
              <h4>product.name</h4>
              <h5>product.description</h5>

              <div class="productprice">
                <p>特價$ 660g()</p>
                <p>NT$ 880()</p>
              </div>
              <button class="btn">加入購物車</button>
            </div>
          </div>
        </div>
        <div v-show="true" class="pagination">
          <button>上一頁</button>
          <button v-for="page in 3" :key="page">
            {{ page }}
          </button>
          <button>下一頁</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.product-page{
  display: flex;
  flex-direction: column;
}
.product-cursoul {
  max-height: 480px;
}
.toggleSideber {
  padding: 16px 0px;
  background: var(--bg-surface);
  button {
    font-size: 18px;
    // font-weight: 600;
    padding: 6px 16px;
    border-radius: 8px;
    margin-left: 16px;
    letter-spacing: 2px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      background-color: #fff;
    }
  }
}
.product-main {
  display: flex;
  width: 100%;
}
.col-sidebar {
  // flex: 0 0 40%;
  padding: 16px 8px;
  min-width: 186px;
  width: max(186px, 30%);
  border: 1px solid white;
  ul {
    padding: 0px;
    margin: 0px 0px 8px;
    li {
      padding: 4px 0px;
      margin-bottom: 4px;
      vertical-align: top;
      line-height: 100%;
      div {
        padding: 8px 0;
        margin-bottom: 8px;
        cursor: pointer;
        h4 {
          font-weight: 800;
        }
      }
      ul li {
        display: flex;
        align-items: center;
        // flex-direction: row-reverse;
        // justify-content: space-between;
        padding: 6px 8px;
        border-radius: 4px;
        transition: all 0.3s ease;
        &:hover {
          background-color: #fff;
        }
        label,
        input {
          cursor: pointer;
        }
      }
      .side-title {
        padding: 0 6px;
        display: flex;
        justify-content: space-between;
        h4,
        span {
          vertical-align: top;
        }
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1/1;
          // padding: 3px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 0.5px solid transparent;
        }

        &:hover {
          span {
            background-color: #fff;
          }
        }
      }

      .side-content {
        max-height: 400px;
        overflow: hidden;
        transition: all 0.3s ease-out;
      }

      .side-content.side-content-open {
        max-height: 400px;
      }
    }
  }
}
.products-show {
  flex: 1;

  .listrow {
    width: 100%;
    display: grid;
    // grid-template-columns: repeat(3, 1fr); /* 建立三欄，每欄 1fr 寬 */
    grid-template-columns: repeat(auto-fit, minmax(220px, max-content));
    grid-template-rows: auto-fit;
    /* 自動高度 */
    margin: 0 auto;
    gap: 32px 24px;
    justify-items: flex-start;
    justify-content: center;
    .card {
      height: 100%;
      min-width: 200px;
      max-width: 300px;
      width: 100%;
      padding-bottom: 0px;
      justify-content: space-between;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        height: 40%;
      }

      &:hover::after {
        height: 100%;
      }

      .item-pic {
        // flex: 1;

        a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pic {
          // height: 100%;
          width: 100%;
          padding: 16px;

          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 100%;
            object-fit: cover;
            object-position: center;
            margin: auto auto;
          }
        }

        .card-title {
          // display: none;
          position: absolute;
          bottom: 8px;
          left: 8px;
          font-size: 14px;
          font-weight: 900;
        }
      }

      .item-text {
        flex: 1;
        word-wrap: break-word;
        // color: $color-darkgery;;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: flex-start;
        padding: 6px 8px 8px;
        gap: 4px;

        h4,
        h5,
        p {
          margin: 0;
          text-align: left;
        }

        h4 {
          font-weight: 900;
        }

        h5 {
          font-size: 16px;
          font-weight: 400;
        }

        p {
          font-size: 16px;
          padding: 2px;
          font-weight: 600;
          // text-align: center;
        }

        .productprice {
          margin-top: 8px;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .btn {
          height: 36px;
          width: 100%;
          padding: 0;

          transition: all 0.3s ease;
          margin-top: 4px;
        }
      }
    }
  }
}
.btn-openlist {
      margin-bottom: 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      button {
        font-size: 16px;
        padding: 6px 12px;
        letter-spacing: 1px;
        text-align: center;
        line-height: 100%;
        border-radius: 8px;
        transition: all 0.3s ease;
        font-weight: 400;
        cursor: pointer;

        svg {
          transform: rotate(45deg);
        }

        &:hover {
          background-color: #fff;
        }
        &:hover svg {
          color: #333;
        }
      }
    }
 .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    flex-wrap: wrap;
    & button {
      padding: 6px 12px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s ease;
    }
    & button:hover:not(.active) {
      color: #222;
    }
    & button.active {
      color: white;
      font-weight: bold;
    }
    & button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
</style>
