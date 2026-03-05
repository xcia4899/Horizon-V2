<template>
  <main class="login">
    <section class="login-inner">
      <header class="login-title">
        <h3>登入</h3>
        <p>使用您的ID登入</p>
      </header>

      <form class="login-enter">
        <div class="enter-inputs">
          <input
            id="email"
            type="email"
            class="input"
            autocomplete="email"
            placeholder="Email"
          />
          <input
            id="password"
            type="password"
            class="input"
            autocomplete="current-password"
            placeholder="密碼"
          />
        </div>

        <div class="login-enter-submits">
          <NuxtLink class="forgot" to="/auth/register">忘記密碼？</NuxtLink>
          <button type="submit" class="btn login-btn">登入</button>
        </div>
      </form>
      <section class="login-othermethods">
        <div class="othermethods-or">
          <span>or</span>
          <hr />
        </div>
        <ul class="othermethods-logonicon">
          <li v-for="item in icons" :key="item.icon">
            <button type="button" class="logonicon-btn">
              <img :src="item.src" :alt="item.alt" />
            </button>
          </li>
        </ul>
        <NuxtLink class="register" to="/auth/register">註冊會員</NuxtLink>
      </section>
    </section>
  </main>
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
.login {
  height: 100vh;
  display: grid;
  place-items: center;
  .login-inner {
    padding: 92px 32px;
    // min-height: 800px;
    max-height: 100vh;
    margin: 0 auto;

    width: clamp(200px, 100%, 600px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
  .login-title {
    display: grid;
    gap: 8px;
    text-align: center;
  }
  .login-enter {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    .enter-inputs {
      display: grid;
      gap: 32px;
    }
    .input {
      padding: 8px;
      outline: none;
      border: none;
      background-color: transparent;
      border-bottom: 2px solid var(--border-default);

      &:focus {
        border-color: var(--border-soft);
      }
    }

    input::placeholder {
      padding: 0 8px;
      font-size: 16px;
    }
    .login-enter-submits {
      display: grid;
      gap: 8px;
      .forgot {
        justify-self: end;
        font-size: 14px;
        font-weight: bolder;
        text-decoration: underline;
        text-underline-offset: 4px;
        cursor: pointer;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--brand-hover);
          }
        }
      }

      .login-btn {
        width: 100%;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--brand-hover);
          }
        }
      }
    }
  }

  .login-othermethods {
    display: flex;
    flex-direction: column;

    gap: 32px;
    width: 100%;
    .othermethods-or {
      position: relative;
      display: grid;
      span {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        padding: 4px;
        font-size: 20px;
        color: var(--text-tertiary);
        background: var(--bg-page);
        user-select: none;
      }
      hr {
        width: 100%;
        color: var(--border-default);
      }
    }
    .othermethods-logonicon {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      gap: 8px;

      .logonicon-btn {
        max-width: 60px;
        padding: 8px;
        border-radius: 50%;
        aspect-ratio: 1/1;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: var(--bg-surface-soft);
          }
        }
        img {
          cursor: pointer;
        }
      }
    }

    .register {
      align-self: center;
      text-decoration: underline;
      text-underline-offset: 4px;
      font-size: 14px;
      font-weight: bolder;
      cursor: pointer;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--brand-hover);
        }
      }
    }
  }
}

@media screen and (max-width: 670px) {
  .login .othermethods {
    .logonicon {
      width: 280px;
    }
  }
}
</style>
