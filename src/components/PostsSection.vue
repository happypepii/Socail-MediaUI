<template>
  <div class="posts-section">
    <div class="posts-header">
      <h1>Posts</h1>
      <el-button type="primary" class="create-post-btn" @click="showCreateDialog = true">
        <el-icon><Plus /></el-icon>
        Create Post
      </el-button>
    </div>

    <!-- Create Post Dialog -->
    <el-dialog v-model="showCreateDialog" title="Create New Post" width="500px" class="create-dialog">
      <el-form :model="newPost" label-width="80px">
        <el-form-item label="Content">
          <el-input
            v-model="newPost.content"
            type="textarea"
            :rows="4"
            placeholder="What's on your mind?"
            maxlength="280"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="Image">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            :on-change="handleImageUpload"
          >
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="el-upload__text">Drop image here or <em>click to upload</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateDialog = false">Cancel</el-button>
        <el-button type="primary" @click="createPost">Post</el-button>
      </template>
    </el-dialog>

    <!-- Posts Feed -->
    <div class="posts-feed">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-header">
          <el-avatar :src="post.avatar" :size="40">{{ post.username[0] }}</el-avatar>
          <div class="post-info">
            <h4>{{ post.username }}</h4>
            <span class="post-time">{{ post.time }}</span>
          </div>
          <el-dropdown class="post-menu">
            <el-icon><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Edit</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
                <el-dropdown-item>Report</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        
        <div class="post-content">
          <p>{{ post.content }}</p>
          <img v-if="post.image" :src="post.image" alt="Post image" class="post-image" />
        </div>
        
        <div class="post-actions">
          <el-button text class="action-btn" @click="toggleLike(post)">
            <el-icon :class="{ liked: post.liked }"><Pointer /></el-icon>
            {{ post.likes }}
          </el-button>
          <el-button text class="action-btn">
            <el-icon><ChatDotRound /></el-icon>
            {{ post.comments }}
          </el-button>
          <el-button text class="action-btn">
            <el-icon><Share /></el-icon>
            {{ post.shares }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, UploadFilled, MoreFilled, Pointer, ChatDotRound, Share } from '@element-plus/icons-vue'

const showCreateDialog = ref(false)
const newPost = ref({
  content: '',
  image: null
})

const posts = ref([
  {
    id: 1,
    username: 'john_doe',
    avatar: '/placeholder.svg?height=40&width=40',
    time: '2h ago',
    content: 'Just finished building an amazing Vue.js application! The component architecture is so clean and maintainable. 🚀',
    image: '/placeholder.svg?height=300&width=500',
    likes: 24,
    comments: 8,
    shares: 3,
    liked: false
  },
  {
    id: 2,
    username: 'sarah_dev',
    avatar: '/placeholder.svg?height=40&width=40',
    time: '4h ago',
    content: 'Beautiful sunset today! Sometimes you need to step away from the code and enjoy nature. 🌅',
    likes: 156,
    comments: 23,
    shares: 12,
    liked: true
  },
  {
    id: 3,
    username: 'tech_guru',
    avatar: '/placeholder.svg?height=40&width=40',
    time: '6h ago',
    content: 'New JavaScript features in ES2024 are incredible! The pipeline operator is going to change everything.',
    likes: 89,
    comments: 34,
    shares: 18,
    liked: false
  }
])

const createPost = () => {
  if (newPost.value.content.trim()) {
    posts.value.unshift({
      id: Date.now(),
      username: 'you',
      avatar: '/placeholder.svg?height=40&width=40',
      time: 'now',
      content: newPost.value.content,
      image: newPost.value.image,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false
    })
    
    newPost.value = { content: '', image: null }
    showCreateDialog.value = false
  }
}

const toggleLike = (post) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

const handleImageUpload = (file) => {
  newPost.value.image = URL.createObjectURL(file.raw)
}
</script>

<style scoped>
.posts-section {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #374151;
}

.posts-header h1 {
  color: #e5e7eb;
  font-size: 28px;
  font-weight: bold;
}

.create-post-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
}

.posts-feed {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #374151;
  transition: transform 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(168, 85, 247, 0.15);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.post-info {
  margin-left: 12px;
  flex: 1;
}

.post-info h4 {
  color: #e5e7eb;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.post-time {
  color: #9ca3af;
  font-size: 14px;
}

.post-menu {
  cursor: pointer;
  color: #9ca3af;
}

.post-content p {
  color: #e5e7eb;
  line-height: 1.6;
  margin-bottom: 15px;
}

.post-image {
  width: 100%;
  border-radius: 12px;
  margin-top: 10px;
}

.post-actions {
  display: flex;
  gap: 20px;
  padding-top: 15px;
  border-top: 1px solid #374151;
}

.action-btn {
  color: #9ca3af !important;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
}

.action-btn:hover {
  color: #a855f7 !important;
}

.action-btn .liked {
  color: #ef4444;
}

:deep(.create-dialog .el-dialog) {
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border: 1px solid #374151;
}

:deep(.create-dialog .el-dialog__title) {
  color: #e5e7eb;
}

:deep(.el-textarea__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

:deep(.el-upload-dragger) {
  background-color: #374151;
  border-color: #4b5563;
  color: #9ca3af;
}
</style>