<template>
  <div class="login-page">
    <div class="login-container">
      <Branding />
      <LoginForm />
      <SocialLogin />
      <SignupLink />
    </div>

    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>
    <div class="decoration-circle circle-3"></div>
  </div>
</template>

<script setup>
import Branding from '../components/login/Branding.vue'
import LoginForm from '../components/login/LoginForm.vue'
import SocialLogin from '../components/login/SocialLogin.vue'
import SignupLink from '../components/login/SignupLink.vue'
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000000 0%, #1a0a2e 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 480px;
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  padding: 40px;
  position: relative;
  z-index: 10;
  border: 1px solid #374151;
}

/* Decorative elements */
.decoration-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  z-index: 1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: #7c3aed;
  top: -100px;
  right: 10%;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: #4c1d95;
  bottom: -150px;
  left: -100px;
}

.circle-3 {
  width: 200px;
  height: 200px;
  background: #a855f7;
  top: 40%;
  right: -50px;
}

/* Element Plus Overrides */
:deep(.el-form-item__label) {
  color: #e5e7eb !important;
  font-size: 14px;
  font-weight: 500;
}

:deep(.el-input__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
  height: 48px;
  border-radius: 12px;
}

:deep(.el-input__inner:focus) {
  border-color: #7c3aed;
}

:deep(.el-input__prefix) {
  color: #9ca3af;
}

:deep(.el-checkbox__label) {
  color: #e5e7eb;
  font-size: 14px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #7c3aed;
  border-color: #7c3aed;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .login-container {
    padding: 30px 20px;
  }
  
  .social-buttons {
    flex-direction: column;
  }
  
  .social-button {
    width: 100%;
  }
}
</style>

