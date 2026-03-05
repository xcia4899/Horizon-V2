<template>
  <li v-for="item in icons" :key="item.icon">
    <button type="button" class="logonicon-btn">
      <img :src="item.src" :alt="item.alt" />
    </button>
  </li>
</template>

<script setup lang="ts">
interface LoginIcon {
  src: string;
  alt: string;
  icon: string;
}

const icons: LoginIcon[] = [
  { src: "/images/loginicon/10001.svg", alt: "Google login", icon: "google" },
  {
    src: "/images/loginicon/10002.svg",
    alt: "Facebook login",
    icon: "facebook",
  },
  { src: "/images/loginicon/10003.svg", alt: "Apple login", icon: "apple" },
  { src: "/images/loginicon/10004.svg", alt: "Line login", icon: "line" },
  { src: "/images/loginicon/10005.svg", alt: "Twitter login", icon: "twitter" },
  { src: "/images/loginicon/10006.svg", alt: "Discord login", icon: "discord" },
  { src: "/images/loginicon/10007.svg", alt: "Github login", icon: "github" },
];
</script>

<style scoped lang="scss">
.logonicon-btn {
  max-width: 60px;
  border-radius: 50%;
  aspect-ratio: 1/1;
  border: 6px solid transparent;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: $color-white;
    }
  }
  img {
    cursor: pointer;
  }
}

</style>
