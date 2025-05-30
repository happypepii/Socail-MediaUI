<template>
  <div class="social-login">
    <div class="divider">
      <span>Or continue with</span>
    </div>
    <div class="social-buttons">
            <el-button class="social-button google">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path></svg>
              Google
            </el-button>
            <el-button class="social-button facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              Facebook
            </el-button>
            <el-button class="social-button twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              Twitter
            </el-button>
          </div>
  </div>
</template>

<style scoped>
.social-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #374151;
  border: 1px solid #4b5563;
  color: #e5e7eb;
  transition: all 0.3s ease;
}

.social-button:hover {
  transform: translateY(-2px);
}

.social-button.google:hover {
  background-color: rgba(219, 68, 55, 0.2);
  border-color: #db4437;
}

.social-button.facebook:hover {
  background-color: rgba(66, 103, 178, 0.2);
  border-color: #4267B2;
}

.social-button.twitter:hover {
  background-color: rgba(29, 161, 242, 0.2);
  border-color: #1DA1F2;
}

.divider {
  display: flex;
  align-items: center;
  margin: 30px 0;
  color: #9ca3af;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #4b5563;
}

.divider span {
  padding: 0 15px;
}

</style>