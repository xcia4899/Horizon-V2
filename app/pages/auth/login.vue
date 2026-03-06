<template>
  <main class="login">
    <section class="login-inner">
      <header class="login-title">
        <h3>登入</h3>
        <p>使用您的ID登入</p>
      </header>
      <!-- 使用element plus -->
      <el-form
        ref="formLoginRef"
        :model="formLogin"
        status-icon
        :rules="loginRules"
        class="login-enter"
      >
        <div class="enter-inputs">
          <el-form-item prop="email">
            <el-input
              v-model="formLogin.email"
              class="input"
              type="text"

              autocomplete="off"
              placeholder="帳號"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formLogin.password"
              type="password"
              autocomplete="off"
              placeholder="密碼"
              show-password
            />
          </el-form-item>
        </div>
        <div class="login-enter-submits">
          <NuxtLink class="forgot" to="/auth/register">忘記密碼？</NuxtLink>
          <button
            type="submit"
            class="btn login-btn"
            @click.prevent="submitLoginForm"
          >
            登入
          </button>
        </div>
      </el-form>
      <section class="login-othermethods">
        <div class="othermethods-or">
          <span>or</span>
          <hr />
        </div>
        <ul class="othermethods-logoicon">
          <AuthLogoicon />
        </ul>
        <NuxtLink class="register" to="/auth/register">註冊會員</NuxtLink>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { FormRules } from "element-plus";
import { useAuthStore } from "@/stores/useUserAuth";

const auth = useAuthStore();

//表單物件
const formLoginRef = ref();

interface LoginForm {
  email: string;
  password: string;
}
//登入表單雙向綁定
const formLogin = reactive<LoginForm>({
  email: "",
  password: "",
});

//自訂密碼規則
const validatePwd = (
  rule: unknown,
  value: string,
  callback: (error?: Error) => void,
) => {
  if (!value) {
    return callback(new Error("密碼不能為空"));
  }
  callback();
};
//驗證規則
const loginRules: FormRules = reactive({
  email: [
    { required: true, trigger: "blur", message: "請輸入帳號" },
    {
      required: true,
      type: "email",
      message: "請輸入正確的 email 格式",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 20,
      message: "密碼為長度為 6–20 位",
      trigger: "blur",
    },
    { validator: validatePwd, trigger: "blur" },
  ],
});
// 登入方法
const submitLoginForm = async () => {
  if (!formLoginRef.value) return;
  if (typeof window === "undefined") return;

  // 1. Element Plus 表單驗證
  try {
    await formLoginRef.value.validate();
    console.log("登入表單驗證成功");
  } catch (err) {
    console.log("登入表單驗證失敗", err);
    return;
  }

  // 2) 呼叫「登入 API」（目前由 localStorage 模擬）
  try {
    await auth.login(formLogin);
  } catch (e) {
    alert((e as Error).message);
    return;
  }

  // 4 跳轉導頁
  navigateTo("/");
};
</script>

<style scoped lang="scss">
.login {
  background: var(--bg-surface);
  display: grid;
  place-items: center;
  /* --el-color-danger: var(--state-danger); */
  .login-inner {
    padding: 120px 32px;
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
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    .enter-inputs {
      display: grid;
      gap: 32px;
    }
    /* <-- 使用element plus --> */
    .el-input {
      :deep(.el-input__wrapper) {
        outline: none;
        border: none;
        box-shadow: none;
        padding: 2px 8px;
        background-color: transparent;
        border-radius: 0;
        border-bottom: 2px solid var(--border-default);
        input::placeholder {
          color: var(--text-primary);
        }

        /* focus 狀態 */
        &.is-focus {
          border-color: var(--border-soft);
        }
      }
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
        color: var(--text-tertiary);
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
    }

    .register {
      align-self: center;
      text-decoration: underline;
      text-underline-offset: 4px;
      font-size: 14px;
      font-weight: bolder;
      color: var(--text-secondary);
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
