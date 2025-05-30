<template>
  <div class="remember-forgot">
    <el-checkbox v-model="remember" label="Remember me" />
    <a href="#" class="forgot-link">Forgot password?</a>
  </div>
</template>

<script setup>
// defineProps({
//   remember: Boolean
// })
// defineEmits(['update:remember'])
</script>

<style scoped>
.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.forgot-link {
  color: #a855f7;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #7c3aed;
  text-decoration: underline;
}

</style>