<template>
  <main class="register">
    <section class="register-inner">
      <header class="register-title">
        <h3>建立帳戶</h3>
        <p>填寫欄位以建立您的ID</p>
      </header>
      <el-form
        ref="formRegisterRef"
        :model="formRegister"
        :rules="registerRule"
        status-icon
        class="register-enter"
      >
        <div class="enter-inputs">
          <el-form-item prop="lastName">
            <el-input
              v-model="formRegister.lastName"
              type="text"
              autocomplete="off"
              placeholder="姓氏"
            />
          </el-form-item>
          <el-form-item prop="name">
            <el-input
              v-model="formRegister.name"
              type="text"
              autocomplete="off"
              placeholder="名字"
            />
          </el-form-item>
          <el-form-item prop="birthday">
            <el-date-picker
              v-model="formRegister.birthday"
              type="date"
              placeholder="出生日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="formRegister.email"
              type="text"
              autocomplete="off"
              placeholder="帳號"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formRegister.password"
              type="password"
              autocomplete="off"
              placeholder="密碼"
              show-password
            />
          </el-form-item>
          <el-form-item prop="passwordConfirm">
            <el-input
              v-model="formRegister.passwordConfirm"
              type="password"
              autocomplete="off"
              placeholder="再次輸入密碼"
              show-password
            />
          </el-form-item>
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
          <button
            type="button"
            class="btn register-btn"
            @click.prevent="submitRegisterForm"
          >
            建立
          </button>
        </div>
      </el-form>
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

<script setup lang="ts">
import type { FormRules } from "element-plus";
import { useAuthStore } from "@/stores/useUserAuth";
const auth = useAuthStore();

interface RegisterForm {
  lastName: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthday?: string;
}

const formRegisterRef = ref();

const formRegister = reactive<RegisterForm>({
  lastName: "",
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  birthday: "",
});

//密碼檢查規則
const validateRegisterPwd = (
  rule: unknown,
  value: string,
  callback: (error?: Error) => void,
) => {
  if (!value) {
    return callback(new Error("密碼不能為空"));
  }
  callback();
};
//密碼二次確認規則
const validateConfirmPwd = (
  rule: unknown,
  value: string,
  callback: (error?: Error) => void,
) => {
  if (!value) {
    return callback(new Error("請再次輸入密碼"));
  }
  if (value !== formRegister.password) {
    return callback(new Error("兩次輸入的密碼不一致"));
  }
  callback();
};

const registerRule: FormRules = reactive({
  lastName: [
    { required: true, trigger: "blur", message: "請輸入姓氏" },
    { min: 1, max: 20, message: "姓氏長度 1–20 字", trigger: "blur" },
  ],
  name: [
    { required: true, trigger: "blur", message: "請輸入名字" },
    { min: 1, max: 20, message: "名字長度 1–20 字", trigger: "blur" },
  ],
  email: [
    { required: true, trigger: "blur", message: "請輸入帳號" },
    { type: "email", message: "請輸入正確的 email 格式", trigger: "blur" },
    { max: 100, message: "Email 長度不可超過 100", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 20,
      message: "密碼為長度為 6–20 位",
      trigger: "blur",
    },
    { validator: validateRegisterPwd, trigger: "blur" },
  ],
  passwordConfirm: [
    { required: true, message: "請再次輸入密碼", trigger: "blur" },
    { validator: validateConfirmPwd, trigger: "blur" },
  ],
  birthday: [{ required: true, message: "請選擇生日", trigger: "change" }],
});

const submitRegisterForm = async () => {
  if (!formRegisterRef.value) return;

  // 1. 先做表單驗證
  try {
    await formRegisterRef.value.validate();
    console.log("註冊表單驗證成功");
  } catch (err) {
    console.log("註冊表單驗證失敗", err);
    return;
  }
  //2 .呼叫註冊API (目前是localStorage 模擬)
  try {
    await auth.register(formRegister);
  } catch (e) {
    alert((e as Error).message);
  }
};
</script>

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

    :deep(.el-input__wrapper) {
      outline: none;
      border: none;
      box-shadow: none;
      width: 100%;
      padding: 2px 8px;
      background-color: transparent;
      border-radius: 0;
      border-bottom: 2px solid var(--border-default);
    }
    :deep(.el-input__inner) {
      &::placeholder {
        color: var(--text-primary);
      }
    }
    :deep(.el-input__wrapper.is-focus) {
      border-bottom-color: var(--border-soft);
    }
    :deep(.el-date-editor) {
      width: 100%;
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
