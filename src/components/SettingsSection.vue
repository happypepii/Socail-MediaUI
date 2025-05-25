<template>
  <div class="settings-section">
    <div class="settings-container">
      <div class="settings-sidebar">
        <h2>Settings</h2>
        <el-menu
          :default-active="activeTab"
          class="settings-menu"
          @select="handleTabSelect"
          background-color="transparent"
          text-color="#e5e7eb"
          active-text-color="#a855f7"
        >
          <el-menu-item index="profile">
            <el-icon><User /></el-icon>
            <span>Profile</span>
          </el-menu-item>
          <el-menu-item index="privacy">
            <el-icon><Lock /></el-icon>
            <span>Privacy & Security</span>
          </el-menu-item>
          <el-menu-item index="notifications">
            <el-icon><Bell /></el-icon>
            <span>Notifications</span>
          </el-menu-item>
          <el-menu-item index="appearance">
            <el-icon><Brush /></el-icon>
            <span>Appearance</span>
          </el-menu-item>
          <el-menu-item index="history">
            <el-icon><Clock /></el-icon>
            <span>Activity History</span>
          </el-menu-item>
          <el-menu-item index="data">
            <el-icon><Download /></el-icon>
            <span>Data & Storage</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="settings-content">
        <!-- Profile Settings -->
        <div v-if="activeTab === 'profile'" class="settings-panel">
          <h3>Profile Settings</h3>
          <div class="profile-section">
            <div class="avatar-section">
              <el-avatar :src="userProfile.avatar" :size="100">
                {{ userProfile.name[0] }}
              </el-avatar>
              <el-button type="primary" size="small" class="change-avatar-btn">
                Change Photo
              </el-button>
            </div>
            
            <el-form :model="userProfile" label-width="120px" class="profile-form">
              <el-form-item label="Full Name">
                <el-input v-model="userProfile.name" />
              </el-form-item>
              <el-form-item label="Username">
                <el-input v-model="userProfile.username" />
              </el-form-item>
              <el-form-item label="Email">
                <el-input v-model="userProfile.email" />
              </el-form-item>
              <el-form-item label="Bio">
                <el-input
                  v-model="userProfile.bio"
                  type="textarea"
                  :rows="3"
                  maxlength="160"
                  show-word-limit
                />
              </el-form-item>
              <el-form-item label="Location">
                <el-input v-model="userProfile.location" />
              </el-form-item>
              <el-form-item label="Website">
                <el-input v-model="userProfile.website" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">Save Changes</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div v-if="activeTab === 'privacy'" class="settings-panel">
          <h3>Privacy & Security</h3>
          <div class="privacy-section">
            <div class="setting-group">
              <h4>Account Privacy</h4>
              <div class="setting-item">
                <div class="setting-info">
                  <span>Private Account</span>
                  <p>Only approved followers can see your posts</p>
                </div>
                <el-switch v-model="privacySettings.privateAccount" />
              </div>
              <div class="setting-item">
                <div class="setting-info">
                  <span>Show Online Status</span>
                  <p>Let others see when you're online</p>
                </div>
                <el-switch v-model="privacySettings.showOnlineStatus" />
              </div>
            </div>

            <div class="setting-group">
              <h4>Data & Analytics</h4>
              <div class="setting-item">
                <div class="setting-info">
                  <span>Analytics Tracking</span>
                  <p>Help improve our service with usage data</p>
                </div>
                <el-switch v-model="privacySettings.analytics" />
              </div>
            </div>

            <div class="setting-group">
              <h4>Security</h4>
              <el-button type="primary">Change Password</el-button>
              <el-button>Enable Two-Factor Authentication</el-button>
              <el-button type="danger">Delete Account</el-button>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeTab === 'notifications'" class="settings-panel">
          <h3>Notification Settings</h3>
          <div class="notifications-section">
            <div class="setting-group">
              <h4>Push Notifications</h4>
              <div class="setting-item">
                <div class="setting-info">
                  <span>New Messages</span>
                  <p>Get notified when you receive new messages</p>
                </div>
                <el-switch v-model="notificationSettings.messages" />
              </div>
              <div class="setting-item">
                <div class="setting-info">
                  <span>Likes & Comments</span>
                  <p>Get notified when someone likes or comments on your posts</p>
                </div>
                <el-switch v-model="notificationSettings.interactions" />
              </div>
              <div class="setting-item">
                <div class="setting-info">
                  <span>New Followers</span>
                  <p>Get notified when someone follows you</p>
                </div>
                <el-switch v-model="notificationSettings.followers" />
              </div>
            </div>

            <div class="setting-group">
              <h4>Email Notifications</h4>
              <div class="setting-item">
                <div class="setting-info">
                  <span>Weekly Summary</span>
                  <p>Receive a weekly summary of your activity</p>
                </div>
                <el-switch v-model="notificationSettings.weeklyEmail" />
              </div>
              <div class="setting-item">
                <div class="setting-info">
                  <span>Security Alerts</span>
                  <p>Get notified about security-related activities</p>
                </div>
                <el-switch v-model="notificationSettings.securityEmail" />
              </div>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div v-if="activeTab === 'appearance'" class="settings-panel">
          <h3>Appearance Settings</h3>
          <div class="appearance-section">
            <div class="setting-group">
              <h4>Theme</h4>
              <el-radio-group v-model="appearanceSettings.theme" class="theme-options">
                <el-radio label="dark">Dark Mode</el-radio>
                <el-radio label="light">Light Mode</el-radio>
                <el-radio label="auto">Auto (System)</el-radio>
              </el-radio-group>
            </div>

            <div class="setting-group">
              <h4>Font Size</h4>
              <el-slider
                v-model="appearanceSettings.fontSize"
                :min="12"
                :max="20"
                :step="1"
                show-stops
                show-input
              />
            </div>

            <div class="setting-group">
              <h4>Language</h4>
              <el-select v-model="appearanceSettings.language" placeholder="Select Language">
                <el-option label="English" value="en" />
                <el-option label="Spanish" value="es" />
                <el-option label="French" value="fr" />
                <el-option label="German" value="de" />
              </el-select>
            </div>
          </div>
        </div>

        <!-- Activity History -->
        <div v-if="activeTab === 'history'" class="settings-panel">
          <h3>Activity History</h3>
          <div class="history-section">
            <div class="history-filters">
              <el-select v-model="historyFilter" placeholder="Filter by activity">
                <el-option label="All Activities" value="all" />
                <el-option label="Posts" value="posts" />
                <el-option label="Messages" value="messages" />
                <el-option label="Likes" value="likes" />
                <el-option label="Comments" value="comments" />
              </el-select>
              <el-date-picker
                v-model="historyDateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
              />
            </div>

            <div class="history-list">
              <div v-for="activity in filteredHistory" :key="activity.id" class="history-item">
                <el-icon class="activity-icon">
                  <Document v-if="activity.type === 'post'" />
                  <ChatDotRound v-else-if="activity.type === 'message'" />
                  <Pointer v-else-if="activity.type === 'like'" />
                  <Comment v-else-if="activity.type === 'comment'" />
                </el-icon>
                <div class="activity-info">
                  <p>{{ activity.description }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data & Storage -->
        <div v-if="activeTab === 'data'" class="settings-panel">
          <h3>Data & Storage</h3>
          <div class="data-section">
            <div class="storage-info">
              <h4>Storage Usage</h4>
              <div class="storage-item">
                <span>Photos & Videos</span>
                <div class="storage-bar">
                  <el-progress :percentage="75" color="#a855f7" />
                  <span>2.1 GB of 3 GB</span>
                </div>
              </div>
              <div class="storage-item">
                <span>Messages</span>
                <div class="storage-bar">
                  <el-progress :percentage="45" color="#a855f7" />
                  <span>450 MB of 1 GB</span>
                </div>
              </div>
            </div>

            <div class="data-actions">
              <h4>Data Management</h4>
              <el-button type="primary">Download My Data</el-button>
              <el-button>Clear Cache</el-button>
              <el-button type="warning">Clear All Data</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  User,
  Lock,
  Bell,
  Brush,
  Clock,
  Download,
  Document,
  ChatDotRound,
  Pointer,
  Comment
} from '@element-plus/icons-vue'

const activeTab = ref('profile')
const historyFilter = ref('all')
const historyDateRange = ref([])

const userProfile = ref({
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  bio: 'Full-stack developer passionate about Vue.js and modern web technologies.',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  avatar: '/placeholder.svg?height=100&width=100'
})

const privacySettings = ref({
  privateAccount: false,
  showOnlineStatus: true,
  analytics: true
})

const notificationSettings = ref({
  messages: true,
  interactions: true,
  followers: true,
  weeklyEmail: false,
  securityEmail: true
})

const appearanceSettings = ref({
  theme: 'dark',
  fontSize: 16,
  language: 'en'
})

const activityHistory = ref([
  {
    id: 1,
    type: 'post',
    description: 'Created a new post about Vue.js development',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'like',
    description: 'Liked Sarah\'s post about CSS animations',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'message',
    description: 'Sent a message to Mike Chen',
    time: '6 hours ago'
  },
  {
    id: 4,
    type: 'comment',
    description: 'Commented on Emma\'s design showcase',
    time: '1 day ago'
  },
  {
    id: 5,
    type: 'post',
    description: 'Shared a short video about JavaScript tips',
    time: '2 days ago'
  }
])

const filteredHistory = computed(() => {
  if (historyFilter.value === 'all') {
    return activityHistory.value
  }
  return activityHistory.value.filter(activity => activity.type === historyFilter.value)
})

const handleTabSelect = (key) => {
  activeTab.value = key
}
</script>

<style scoped>
.settings-section {
  padding: 20px;
  height: calc(100vh - 40px);
}

.settings-container {
  display: flex;
  height: 100%;
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #374151;
}

.settings-sidebar {
  width: 280px;
  padding: 20px;
  border-right: 1px solid #374151;
}

.settings-sidebar h2 {
  color: #e5e7eb;
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: bold;
}

.settings-menu {
  border: none;
}

.settings-menu .el-menu-item {
  margin-bottom: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.settings-menu .el-menu-item:hover {
  background-color: #374151;
}

.settings-menu .el-menu-item.is-active {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: white;
}

.settings-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.settings-panel h3 {
  color: #e5e7eb;
  margin: 0 0 30px 0;
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 15px;
  border-bottom: 1px solid #374151;
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(55, 65, 81, 0.3);
  border-radius: 12px;
}

.change-avatar-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
}

.profile-form {
  max-width: 600px;
}

.setting-group {
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(55, 65, 81, 0.3);
  border-radius: 12px;
}

.setting-group h4 {
  color: #e5e7eb;
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #4b5563;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info span {
  color: #e5e7eb;
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
}

.setting-info p {
  color: #9ca3af;
  margin: 0;
  font-size: 14px;
}

.theme-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(55, 65, 81, 0.3);
  border-radius: 8px;
}

.activity-icon {
  color: #a855f7;
  font-size: 20px;
}

.activity-info p {
  color: #e5e7eb;
  margin: 0 0 5px 0;
  font-weight: 500;
}

.activity-time {
  color: #9ca3af;
  font-size: 14px;
}

.storage-info {
  margin-bottom: 30px;
}

.storage-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.storage-item span {
  color: #e5e7eb;
  font-weight: 500;
}

.storage-bar {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  margin-left: 20px;
}

.storage-bar span {
  color: #9ca3af;
  font-size: 14px;
  min-width: 100px;
}

.data-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.data-actions h4 {
  color: #e5e7eb;
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
}

:deep(.el-form-item__label) {
  color: #e5e7eb !important;
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

:deep(.el-select .el-input__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

:deep(.el-radio__label) {
  color: #e5e7eb;
}

:deep(.el-slider__runway) {
  background-color: #4b5563;
}

:deep(.el-slider__bar) {
  background-color: #a855f7;
}

:deep(.el-date-editor .el-input__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}
</style>