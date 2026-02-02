<template>
  <div class="banner">
    <img
      v-if="currentbanner"
      class="image"
      :src="currentbanner.image"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const bannerList = [
  {
    id: "banner-01",
    image: "./images/promoBanner/banner-01.jpg",
  },
  {
    id: "banner-02",
    image: "./images/promoBanner/banner-02.jpg",
  },
];

// 隨機 index（只算一次）
const randomIndex = ref<number | null>(null);

// const randomAgain = () => {
//   randomIndex.value = Math.floor(Math.random() * bannerList.length);
//   console.log("執行一次", randomIndex.value);
// };
onMounted(() => {
  randomIndex.value = Math.floor(Math.random() * bannerList.length);
});
const currentbanner = computed(() => {
  if (randomIndex.value === null) return null;
  return bannerList[randomIndex.value];
});
</script>

<style scoped lang="scss">
.banner {
  display: flex;
  //   transform: translateX(-100%);
  .image {
    width: 100%;
    object-fit: cover;
    @media (max-width: 550px) {
      width: 120%;
      transform: translateX(-10%); // 視覺置中
    }
  }
}
</style>
