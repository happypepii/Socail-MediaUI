<template>
  <div class="shorts-section">
    <div class="shorts-header">
      <h1>Shorts</h1>
      <el-button type="primary" class="upload-btn" @click="showUploadDialog = true">
        <el-icon><VideoCamera /></el-icon>
        Upload Short
      </el-button>
    </div>

    <!-- Upload Dialog -->
    <el-dialog v-model="showUploadDialog" title="Upload Short Video" width="500px" class="upload-dialog">
      <el-form :model="newShort" label-width="100px">
        <el-form-item label="Title">
          <el-input v-model="newShort.title" placeholder="Enter video title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            v-model="newShort.description"
            type="textarea"
            :rows="3"
            placeholder="Describe your video..."
          />
        </el-form-item>
        <el-form-item label="Video">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            accept="video/*"
          >
            <el-icon class="el-icon--upload"><VideoCamera /></el-icon>
            <div class="el-upload__text">Drop video here or <em>click to upload</em></div>
            <div class="el-upload__tip">Max duration: 60 seconds</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showUploadDialog = false">Cancel</el-button>
        <el-button type="primary" @click="uploadShort">Upload</el-button>
      </template>
    </el-dialog>

    <!-- Shorts Grid -->
    <div class="shorts-grid">
      <div v-for="short in shorts" :key="short.id" class="short-card" @click="playShort(short)">
        <div class="short-thumbnail">
          <img :src="short.thumbnail" :alt="short.title" />
          <div class="play-overlay">
            <el-icon class="play-icon"><VideoPlay /></el-icon>
          </div>
          <div class="duration-badge">{{ short.duration }}</div>
        </div>
        
        <div class="short-info">
          <h4>{{ short.title }}</h4>
          <div class="short-meta">
            <el-avatar :src="short.creator.avatar" :size="24">
              {{ short.creator.name[0] }}
            </el-avatar>
            <span class="creator-name">{{ short.creator.name }}</span>
          </div>
          <div class="short-stats">
            <span class="views">{{ formatNumber(short.views) }} views</span>
            <span class="likes">{{ formatNumber(short.likes) }} likes</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Player Modal -->
    <el-dialog v-model="showPlayer" :show-close="false" width="400px" class="player-dialog">
      <div class="video-player" v-if="currentShort">
        <div class="video-container">
          <img :src="currentShort.thumbnail" :alt="currentShort.title" class="video-placeholder" />
          <div class="video-controls">
            <el-button circle class="control-btn">
              <el-icon><VideoPlay /></el-icon>
            </el-button>
          </div>
        </div>
        
        <div class="video-sidebar">
          <div class="video-actions">
            <el-button circle class="action-btn" @click="toggleLike(currentShort)">
              <el-icon :class="{ liked: currentShort.isLiked }"><Pointer /></el-icon>
            </el-button>
            <span class="action-count">{{ formatNumber(currentShort.likes) }}</span>
            
            <el-button circle class="action-btn">
              <el-icon><ChatDotRound /></el-icon>
            </el-button>
            <span class="action-count">{{ formatNumber(currentShort.comments) }}</span>
            
            <el-button circle class="action-btn">
              <el-icon><Share /></el-icon>
            </el-button>
            <span class="action-count">{{ formatNumber(currentShort.shares) }}</span>
          </div>
        </div>
        
        <div class="video-info">
          <h3>{{ currentShort.title }}</h3>
          <p>{{ currentShort.description }}</p>
          <div class="creator-info">
            <el-avatar :src="currentShort.creator.avatar" :size="32">
              {{ currentShort.creator.name[0] }}
            </el-avatar>
            <span>{{ currentShort.creator.name }}</span>
            <el-button size="small" type="primary">Follow</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VideoCamera, VideoPlay, Pointer, ChatDotRound, Share } from '@element-plus/icons-vue'

const showUploadDialog = ref(false)
const showPlayer = ref(false)
const currentShort = ref(null)
const newShort = ref({
  title: '',
  description: '',
  video: null
})

const shorts = ref([
  {
    id: 1,
    title: 'Amazing Vue.js Tips!',
    description: 'Learn these 5 Vue.js tricks that will blow your mind! Perfect for beginners and experts.',
    thumbnail: '/placeholder.svg?height=400&width=300',
    duration: '0:45',
    views: 125000,
    likes: 8500,
    comments: 234,
    shares: 89,
    isLiked: false,
    creator: {
      name: 'CodeMaster',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  },
  {
    id: 2,
    title: 'Quick CSS Animation',
    description: 'Create stunning animations with just 3 lines of CSS!',
    thumbnail: '/placeholder.svg?height=400&width=300',
    duration: '0:30',
    views: 89000,
    likes: 6200,
    comments: 156,
    shares: 67,
    isLiked: true,
    creator: {
      name: 'DesignPro',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  },
  {
    id: 3,
    title: 'JavaScript One-Liner',
    description: 'Mind-blowing JavaScript trick in just one line of code!',
    thumbnail: '/placeholder.svg?height=400&width=300',
    duration: '0:25',
    views: 234000,
    likes: 15600,
    comments: 445,
    shares: 234,
    isLiked: false,
    creator: {
      name: 'JSNinja',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  },
  {
    id: 4,
    title: 'React vs Vue Comparison',
    description: 'Quick comparison between React and Vue.js frameworks',
    thumbnail: '/placeholder.svg?height=400&width=300',
    duration: '0:55',
    views: 67000,
    likes: 4300,
    comments: 189,
    shares: 45,
    isLiked: false,
    creator: {
      name: 'TechReviewer',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  }
])

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const playShort = (short) => {
  currentShort.value = short
  showPlayer.value = true
}

const toggleLike = (short) => {
  short.isLiked = !short.isLiked
  short.likes += short.isLiked ? 1 : -1
}

const uploadShort = () => {
  if (newShort.value.title.trim()) {
    // Add upload logic here
    newShort.value = { title: '', description: '', video: null }
    showUploadDialog.value = false
  }
}
</script>

<style scoped>
.shorts-section {
  padding: 20px;
}

.shorts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #374151;
}

.shorts-header h1 {
  color: #e5e7eb;
  font-size: 28px;
  font-weight: bold;
}

.upload-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
}

.shorts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.short-card {
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  border: 1px solid #374151;
}

.short-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(168, 85, 247, 0.15);
}

.short-thumbnail {
  position: relative;
  aspect-ratio: 9/16;
  overflow: hidden;
}

.short-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.short-card:hover .play-overlay {
  opacity: 1;
}

.play-icon {
  color: white;
  font-size: 24px;
}

.duration-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.short-info {
  padding: 15px;
}

.short-info h4 {
  color: #e5e7eb;
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
}

.short-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.creator-name {
  color: #9ca3af;
  font-size: 14px;
}

.short-stats {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #6b7280;
}

.video-player {
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.video-container {
  position: relative;
  aspect-ratio: 9/16;
  max-height: 600px;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.control-btn {
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
}

.video-sidebar {
  position: absolute;
  right: 15px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.video-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.action-btn {
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 45px;
  height: 45px;
}

.action-count {
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.liked {
  color: #ef4444;
}

.video-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 40px 20px 20px;
  color: white;
}

.video-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.video-info p {
  margin: 0 0 15px 0;
  font-size: 14px;
  opacity: 0.9;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

:deep(.player-dialog .el-dialog) {
  background: transparent;
  box-shadow: none;
}

:deep(.player-dialog .el-dialog__body) {
  padding: 0;
}

:deep(.upload-dialog .el-dialog) {
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border: 1px solid #374151;
}

:deep(.upload-dialog .el-dialog__title) {
  color: #e5e7eb;
}

:deep(.el-input__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

:deep(.el-textarea__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}
</style>