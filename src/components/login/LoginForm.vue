<template>
  <div class="login-form-container">
    <h2>Welcome Back</h2>

    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-position="top" class="login-form">
      <el-form-item prop="username" label="Username or Email">
        <el-input v-model="loginForm.username" prefix-icon="User" placeholder="Enter your username or email" />
      </el-form-item>

      <el-form-item prop="password" label="Password">
        <el-input v-model="loginForm.password" type="password" prefix-icon="Lock" placeholder="Enter your password"
          show-password />
      </el-form-item>

      <div class="remember-forgot">
        <el-checkbox v-model="remember" label="Remember me" />
        <a href="#" class="forgot-link">Forgot password?</a>
      </div>

      <el-form-item>
        <el-button type="primary" class="login-button" @click="handleLogin" :loading="loading">
          Log In
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter();
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const loginFormRef = ref(null)
const loading = ref(false)

const rules = {
  username: [{ required: true, message: 'Please enter your username', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
}

const handleLogin = () => {
  if (!loginFormRef.value) return

  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const response = await axios.post('/api/auth/login', {
          username: loginForm.username,
          password: loginForm.password
        });
        if (response.data.success) {
          ElMessage({ message: 'Login successful!', type: 'success' });
          // TODO: save user info into userStore
          console.log(response.data.data);
          router.push('/home');
        } else {
          ElMessage({ message: response.data.message || 'Login failed!', type: 'error' });
          loginFormRef.value.resetFields();
        }
      } catch (err) {
        ElMessage({ message: err?.response?.data?.message || 'Login error!', type: 'error' });
      } finally {
        loading.value = false;
      }

    }
  })
}
</script>

<style scoped>
.login-form-container h2 {
  color: #e5e7eb;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
}

.login-form {
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.5);
}

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