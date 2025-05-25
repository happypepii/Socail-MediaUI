<template>
  <div class="app">
    <el-container class="main-container">
      <!-- Sidebar Navigation -->
      <el-aside width="280px" class="sidebar">
        <div class="logo">
          <h2>Sync</h2>
        </div>

        <el-menu
          :default-active="activeSection"
          class="sidebar-menu"
          @select="handleMenuSelect"
          background-color="#1a1a1a"
          text-color="#e5e7eb"
          active-text-color="#a855f7"
        >
          <el-menu-item index="posts">
            <el-icon><Document /></el-icon>
            <span>Posts</span>
          </el-menu-item>

          <el-menu-item index="shorts">
            <el-icon><VideoPlay /></el-icon>
            <span>Shorts</span>
          </el-menu-item>

          <el-menu-item index="messages">
            <el-icon><ChatDotRound /></el-icon>
            <span>Messages</span>
          </el-menu-item>

          <el-menu-item index="settings">
            <el-icon><Setting /></el-icon>
            <span>Settings & History</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- Main Content Area -->
      <el-main class="main-content">
        <PostsSection v-if="activeSection === 'posts'" />
        <ShortsSection v-if="activeSection === 'shorts'" />
        <MessagesSection v-if="activeSection === 'messages'" />
        <SettingsSection v-if="activeSection === 'settings'" />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Document, VideoPlay, ChatDotRound, Setting } from '@element-plus/icons-vue'

import PostsSection from '@/components/PostsSection.vue'
import ShortsSection from '@/components/ShortsSection.vue'
import MessagesSection from '@/components/MessagesSection.vue'
import SettingsSection from '@/components/SettingsSection.vue'

const activeSection = ref('posts')

const handleMenuSelect = (key) => {
  activeSection.value = key
}
</script>

<style scoped>
.sidebar-menu {
  border: none;
  padding-top: 20px;
  height: 100vh;
}

.sidebar-menu .el-menu-item {
  margin: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.sidebar-menu .el-menu-item:hover {
  background-color: #374151 !important;
  transform: translateX(4px);
}

.sidebar-menu .el-menu-item.is-active {
  background: linear-gradient(135deg, #7c3aed, #a855f7) !important;
  color: white !important;
}

.main-container {
  height: 100vh;
}

.sidebar {
  background: linear-gradient(180deg, #1a1a1a 0%, #2d1b69 100%);
  border-right: 1px solid #374151;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #374151;
}

.logo h2 {
  color: #a855f7;
  font-size: 24px;
  font-weight: bold;
}

.main-content {
  background-color: #000000;
  padding: 0;
  overflow-y: auto;
}

</style>
