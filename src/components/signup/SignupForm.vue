<template>
  <div class="signup-form-container">
    <h2>Create Your Account</h2>
    <el-form
      ref="signupFormRef"
      :model="signupForm"
      :rules="rules"
      label-position="top"
      class="signup-form"
    >

      <el-form-item prop="username" label="Username">
        <el-input v-model="signupForm.username" prefix-icon="User" placeholder="Choose a unique username" class="input-with-padding" input-style="padding-left: 8px" />
      </el-form-item>

      <el-form-item prop="email" label="Email Address">
        <el-input v-model="signupForm.email" type="email" prefix-icon="Message" placeholder="Enter your email address" class="input-with-padding" input-style="padding-left: 8px" />
      </el-form-item>

      <el-form-item prop="password" label="Password">
        <el-input v-model="signupForm.password" type="password" prefix-icon="Lock" placeholder="Create a strong password" show-password class="input-with-padding" input-style="padding-left: 8px" />
      </el-form-item>

      <el-form-item prop="confirmPassword" label="Confirm Password">
        <el-input v-model="signupForm.confirmPassword" type="password" prefix-icon="Lock" placeholder="Confirm your password" show-password class="input-with-padding" input-style="padding-left: 8px" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="signup-button" @click="handleSignup" :loading="loading">
          Create Account
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()
const signupFormRef = ref(null)
const loading = ref(false)
const signupForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validatePasswordConfirm = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please confirm your password'))
  } else if (value !== signupForm.password) {
    callback(new Error('Passwords do not match'))
  } else {
    callback()
  }
}

const validateEmail = async (rule, value, callback) => {
  try {
    const response = await axios.get(`/api/auth/register/validateEmail?email=${value}`)
    if (response.data.success){
      callback()
    } else {
      callback(new Error('This email is already taken'))
    }
  } catch (err) {
    callback(new Error('Could not validate email: '+ err.message))
  }
}

const validateUsername = async (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter a username'))
  } else if (value.length < 3) {
    callback(new Error('Username must be at least 3 characters'))
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    callback(new Error('Username can only contain letters, numbers, and underscores'))
  } else {
    // check if the username is already taken
    try {
      const res = await axios.get(`/api/auth/register/validateUsername?username=${value}`)
      if (res.data.success) {
        callback()
      } else {
        callback(new Error('This username is already taken'))
      }
    } catch (err) {
      callback(new Error('Could not validate username: ' + err.message))
    }
  }
}

const rules = {
  username: [{ validator: validateUsername, trigger: 'blur' }],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Invalid email address', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur'}
  ],
  password: [
    { required: true, message: 'Please enter a password', trigger: 'blur' },
    { min: 8, message: 'Password must be at least 8 characters', trigger: 'blur' }
  ],
  confirmPassword: [{ validator: validatePasswordConfirm, trigger: 'blur' }]
}

const handleSignup = () => {
  signupFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true

      try {
        const response = await axios.post('/api/auth/register', {
          username: signupForm.username,
          email: signupForm.email,
          password: signupForm.password
        })

        ElMessage.success('Account created successfully!')
        signupFormRef.value.resetFields()
        
        if(response.data.success) {
          router.push('/login');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          ElMessage.error(error.response.data)
        } else {
          ElMessage.error('Registration failed')
        }
      } finally {
        loading.value = false
      }

    } else {
      ElMessage.error('Please fix the form errors')
    }
  })
}
</script>
<style scoped>
.signup-form-container h2 {
  color: #e5e7eb;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
}

.signup-form {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.half-width {
  flex: 1;
}

.signup-button {
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.signup-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.5);
}
</style>