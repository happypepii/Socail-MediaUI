<template>
  <div class="signup-page">
    <div class="signup-container">
      <!-- Logo and Branding -->
      <Branding />
      <SignupForm />
      <SocialSignup />
      <LoginLink />
    </div>

    <!-- Decorative Elements -->
    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>
    <div class="decoration-circle circle-3"></div>
    <div class="decoration-circle circle-4"></div>
  </div>
</template>

<script setup>
import Branding from '@/components/signup/Branding.vue'
import SignupForm from '@/components/signup/SignupForm.vue'
import SocialSignup from '@/components/signup/SocialSignup.vue'
import LoginLink from '@/components/signup/LoginLink.vue'

</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000000 0%, #1a0a2e 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.signup-container {
  width: 100%;
  max-width: 520px;
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  padding: 40px;
  position: relative;
  z-index: 10;
  border: 1px solid #374151;
  max-height: 90vh;
  overflow-y: auto;
}

.link {
  color: #a855f7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: #7c3aed;
  text-decoration: underline;
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
  width: 250px;
  height: 250px;
  background: #7c3aed;
  top: -80px;
  right: 15%;
}

.circle-2 {
  width: 350px;
  height: 350px;
  background: #4c1d95;
  bottom: -120px;
  left: -80px;
}

.circle-3 {
  width: 180px;
  height: 180px;
  background: #a855f7;
  top: 30%;
  right: -40px;
}

.circle-4 {
  width: 200px;
  height: 200px;
  background: #6b21a8;
  top: 60%;
  left: -60px;
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
  line-height: 1.4;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #7c3aed;
  border-color: #7c3aed;
}

:deep(.el-date-editor.el-input) {
  width: 100%;
}

:deep(.el-date-editor .el-input__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

:deep(.el-form-item__error) {
  color: #f87171;
}

/* Custom scrollbar for the container */
.signup-container::-webkit-scrollbar {
  width: 6px;
}

.signup-container::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.signup-container::-webkit-scrollbar-thumb {
  background: #6b21a8;
  border-radius: 3px;
}

.signup-container::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .signup-container {
    padding: 30px 20px;
    max-width: 100%;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .social-buttons {
    flex-direction: column;
  }

  .social-button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .signup-container {
    max-height: 95vh;
  }
}
</style>