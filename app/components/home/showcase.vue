<template>
  <div class="showcase-inner">
    <div class="showcase-intro">
      <h2>進入 Horizon 啟動新視野</h2>
      <p>查看最新消息，並了解如何使用</p>
    </div>
    <div class="showcase-content">
      <div class="showcase-hero">
        <div class="hero-media">
          <img :src="showcaseHero.image" alt="" />
        </div>
        <div class="hero-content">
          <h4 class="hero-subtitle">
            {{ showcaseHero.subtitle }}
          </h4>
          <h3 class="hero-title">
            {{ showcaseHero.title }}
          </h3>
          <p class="hero-text">
            {{ showcaseHero.text }}
          </p>
          <h4 class="hero-more">更多資訊</h4>
        </div>
      </div>
      <div class="showcase-cards">
        <article
          v-for="item in showcaseCardContent"
          :key="item.id"
          class="showcase-card"
        >
          <div class="card-media" @click="gotoWebsit(item.link)">
            <img :src="item.image" alt="" />
          </div>
          <h4 class="card-subtitle">
            {{ item.subtitle }}
          </h4>
          <h3 class="card-title">
            {{ item.title }}
          </h3>
          <p class="card-text">
            {{ item.text }}
          </p>
          <h4 class="card-more" @click="gotoWebsit(item.link)">更多資訊</h4>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const showcaseHero = {
  id: "Voxen-Prime",
  subtitle: "Voxen Prime",
  title: "藍色的聲音-大聲清晰地播放... 或者作為外星人",
  text: "藍色的 VO！CE是一組先進的廣播風格濾鏡和效果，可確保您得到大聲清晰的聲音。在Discord或角色扮演角色扮演您最喜歡的惡魔或外星人，全部都遠離兼容設備的麥克風路徑。",
  image: "./images/home/showcase/showcase-hero.png",
  link: "https://www.nvidia.com/zh-tw/geforce/news/rtx-5090-5080-out-now/",
};
const showcaseCardContent = [
  {
    id: "rtx-5090",
    subtitle: "NVIDIA RTX 5090",
    title: "新任顯示卡王者",
    text: "全新的 GeForce RTX 5080 和 GeForce RTX 5090 現已上市！來自頂尖顯示卡供應商 如ASUS全新的 GeForce RTX 5080 和 GeForce RTX 5090 現已上市！全新的 GeForce RTX 5080 和 GeForce RTX 5090 現已上市！",
    image: "./images/home/showcase/showcase-01.jpg",
    link: "https://www.nvidia.com/zh-tw/geforce/news/rtx-5090-5080-out-now/",
  },
  {
    id: "ryzen-9800x3d",
    subtitle: "Ryzen7 9800X3D",
    title: "最強的遊戲處理器",
    text: "Ryzen 7 9800X3D 正式登場，究竟遊戲表現能與自家 Ryzen 9000 系列處理器以及對手旗艦拉開多少差距？",
    image: "./images/home/showcase/showcase-02.jpg",
    link: "https://www.4gamers.com.tw/news/detail/68287/amd-ryzen-7-9800x3d-review",
  },
  {
    id: "switch-2",
    subtitle: "Nintendo Switch 2",
    title: "任天堂全新主機",
    text: "Switch 2 採用 7.9 吋 LCD 螢幕，解析度提升到 1080p，並支援 HDR10 與最高 120Hz 的可變更新...",
    image: "./images/home/showcase/showcase-03.jpg",
    link: "https://www.nintendo.com/tw/index.html?srsltid=AfmBOooYIinP5RcLgK1U2_khNlRXDpwLON6F1z4qiLP9mLGxmAQZgmi7",
  },
  {
    id: "macbook-air-m4",
    subtitle: "MacBook Air",
    title: "全新蘋果商品",
    text: "蘋果今日（14）中午正式開賣新一代 MacBook Air，搭載 M4 晶片帶來更強的 AI 效能還有嶄新的天藍色...",
    image: "./images/home/showcase/showcase-04.jpg",
    link: "https://3c.ltn.com.tw/news/61567",
  },
];

const gotoWebsit = (link: string) => {
  window.open(link, "_blank", "noopener,noreferrer");
};
</script>

<style scoped lang="scss">
.showcase-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-block: 76px 64px;
  gap: 48px;
  @media (max-width: 550px) {
    padding-block: 64px 32px;
    gap: 36px;
  }
}
.showcase-intro {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.showcase-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  .showcase-hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    color: var(--text-primary);
    background: var(--bg-surface-strong);
    .hero-media {
      flex: 0 0 50%;
      overflow: hidden;
      img {
        max-height: 400px;
        height: 100%;
        object-fit: contain;
      }
    }
    .hero-content {
      flex: 1;
      padding: 48px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      .hero-subtitle {
        display: none;
        color: var(--action-primary-hover);
      }
      .hero-text {
        color: var(--text-secondary);
        @include line-clamp(4);
      }
      .hero-more {
        cursor: pointer;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            text-decoration: underline;
            color: var(--action-primary-hover);
          }
        }
      }
    }
  }
  .showcase-cards {
    display: flex;
    justify-content: space-between;
    /* align-items: center;*/
    gap: 20px;
    .showcase-card {
      /*  flex: 0 0 25%;*/
      width: calc(50% - 10px);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      .card-media {
        overflow: hidden;
        border-radius: 4px;
        img {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover img {
            transform: scale(1.1);
          }
        }
      }
      .card-subtitle {
        color: var(--action-primary-hover);
      }
      .card-text {
        color: var(--text-inverse-soft);
        min-height: 0;
        @include line-clamp(2);
      }
      .card-more,
      .card-media {
        cursor: pointer;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            text-decoration: underline;
            color: var(--action-primary);
          }
        }
      }
    }
  }
  @media (max-width: 1024px) {
    .showcase-cards {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 550px) {
    .showcase-hero {
      justify-content: space-between;
      flex-direction: column;
      background: transparent;
      gap: 16px;
      .hero-media {
        flex: 0 0 100%;
      }
      .hero-content {
        padding: 0px 16px;
        color: var(--text-inverse);
        .hero-subtitle {
          display: block;
        }
        .hero-text {
          color: var(--text-inverse-soft);
          @include line-clamp(3);
        }
        .hero-more {
          align-self: flex-end;
          color: var(--brand);
        }
      }
    }
    .showcase-cards {
      flex-direction: column;
      margin-top: calc(32px - 20px);
      gap: 32px;
      .showcase-card {
        width: 100%;
        .card-media {
          width: 100%;
          border-radius: 0;
        }
        .card-title,
        .card-subtitle,
        .card-text,
        .card-more {
          padding: 0px 16px;
        }
        .card-more {
          align-self: flex-end;
          color: var(--brand);
        }
      }
    }
  }
}
</style>
