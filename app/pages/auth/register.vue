<template>
  <main class="register">
    <section class="register-inner">
      <header class="register-title">
        <h3>建立帳戶</h3>
        <p>填寫欄位以建立您的ID</p>
      </header>

      <form class="register-enter">
        <div class="enter-inputs">
          <input type="text" placeholder="名子" />
          <input type="text" placeholder="姓氏" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="密碼" />
          <input type="text" placeholder="確認密碼" />
        </div>

        <div class="register-enter-submits">
          <label class="register-label">
            <input type="checkbox" name="marketingConsent" />
            <div class="fontsize">
              我希望接收
              <strong>Horizon</strong>
              傳送的個人化行銷訊息。您可以隨時取消訂閱。請參閱我們的
              <span>隱私政策</span>。
            </div>
          </label>
          <div class="register-info">
            建立帳戶即表示您同意我們的 <span>服務條款</span>，並已詳閱我們的
            <span>隱私權政策</span>。 您同意接收簡訊和／或電子郵件通知此網站使用
            hCaptcha 保護機制，並適用其 <span>隱私權政策</span> 與
            <span>服務條款</span>。
          </div>
          <button type="button" class="btn register-btn">建立</button>
        </div>
      </form>
      <section class="register-othermethods">
        <div class="othermethods-or">
          <span>or</span>
          <hr />
        </div>
        <ul class="othermethods-logoicon">
          <AuthLogoicon />
        </ul>
        <NuxtLink class="login" to="/auth/login">以擁有帳戶?登入</NuxtLink>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.register {
  // height: 100vh;
  background: var(--bg-surface);
  display: grid;
  place-items: center;
  .register-inner {
    padding: 120px 32px;
    margin: 0 auto;

    width: clamp(200px, 100%, 600px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
  .register-title {
    display: grid;
    gap: 8px;
    text-align: center;
  }
  .register-enter {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    .enter-inputs {
      display: grid;
      gap: 32px;
    }
    input {
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
    input[type="date"]::placeholder {
      color: red;
    }
    .register-enter-submits {
      display: grid;
      place-items: center;
      gap: 16px;
      line-height: 1.6;
      span {
        text-decoration: underline;
        text-underline-offset: 2px;
        
        cursor: pointer;
      }
      .register-label {
        margin-top: 16px;
        display: flex;
        gap: 8px;
        cursor: pointer;
        input {
          width: 20px;
          height: auto;
          margin: 0;
          cursor: pointer;
        }
      }
      .register-btn {
        margin-top: 16px;
        width: 100%;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--brand-hover);
          }
        }
      }
    }
  }

  .register-othermethods {
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
        background: var(--bg-surface);
        user-select: none;
      }
      hr {
        width: 100%;
        color: var(--border-default);
      }
    }
    .othermethods-logoicon {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      gap: 8px;

      .logoicon-btn {
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
    }

    .login {
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
</style>
