<template>
  <div class="post-card">
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
      <el-button text class="action-btn" @click="$emit('toggle-like', post)">
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
</template>

<script setup>
import { Pointer, ChatDotRound, Share, MoreFilled } from '@element-plus/icons-vue'
defineProps(['post'])
defineEmits(['toggle-like'])
</script>

<style scoped>
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
</style>
