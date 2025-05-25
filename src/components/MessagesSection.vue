<template>
  <div class="messages-section">
    <div class="messages-layout">
      <!-- Conversations List -->
      <div class="conversations-panel">
        <div class="conversations-header">
          <h2>Messages</h2>
          <el-button circle size="small" class="new-message-btn" @click="showNewMessageDialog = true">
            <el-icon><Plus /></el-icon>
          </el-button>
        </div>
        
        <div class="search-bar">
          <el-input
            v-model="searchQuery"
            placeholder="Search conversations..."
            prefix-icon="Search"
            class="search-input"
          />
        </div>
        
        <div class="conversations-list">
          <div
            v-for="conversation in filteredConversations"
            :key="conversation.id"
            class="conversation-item"
            :class="{ active: activeConversation?.id === conversation.id }"
            @click="selectConversation(conversation)"
          >
            <el-badge :value="conversation.unread" :hidden="conversation.unread === 0" class="conversation-badge">
              <el-avatar :src="conversation.avatar" :size="45">
                {{ conversation.name[0] }}
              </el-avatar>
            </el-badge>
            
            <div class="conversation-info">
              <div class="conversation-header">
                <h4>{{ conversation.name }}</h4>
                <span class="last-time">{{ conversation.lastMessageTime }}</span>
              </div>
              <p class="last-message">{{ conversation.lastMessage }}</p>
            </div>
            
            <div class="conversation-status">
              <el-icon v-if="conversation.online" class="online-indicator"><CircleCheckFilled /></el-icon>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Chat Area -->
      <div class="chat-panel" v-if="activeConversation">
        <div class="chat-header">
          <div class="chat-user-info">
            <el-avatar :src="activeConversation.avatar" :size="40">
              {{ activeConversation.name[0] }}
            </el-avatar>
            <div>
              <h3>{{ activeConversation.name }}</h3>
              <span class="user-status" :class="{ online: activeConversation.online }">
                {{ activeConversation.online ? 'Online' : 'Offline' }}
              </span>
            </div>
          </div>
          
          <div class="chat-actions">
            <el-button circle size="small">
              <el-icon><Phone /></el-icon>
            </el-button>
            <el-button circle size="small">
              <el-icon><VideoCamera /></el-icon>
            </el-button>
            <el-button circle size="small">
              <el-icon><MoreFilled /></el-icon>
            </el-button>
          </div>
        </div>
        
        <div class="messages-container" ref="messagesContainer">
          <div v-for="message in activeConversation.messages" :key="message.id" class="message-wrapper">
            <div class="message" :class="{ sent: message.sent, received: !message.sent }">
              <div class="message-content">
                <p>{{ message.content }}</p>
                <img v-if="message.image" :src="message.image" alt="Message image" class="message-image" />
              </div>
              <span class="message-time">{{ message.time }}</span>
            </div>
          </div>
        </div>
        
        <div class="message-input-area">
          <el-input
            v-model="newMessage"
            placeholder="Type a message..."
            class="message-input"
            @keyup.enter="sendMessage"
          >
            <template #prepend>
              <el-button circle size="small">
                <el-icon><Pointer /></el-icon>
              </el-button>
            </template>
            <template #append>
              <el-button type="primary" @click="sendMessage" :disabled="!newMessage.trim()">
                <el-icon><Promotion /></el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-chat">
        <el-icon class="empty-icon"><ChatDotRound /></el-icon>
        <h3>Select a conversation</h3>
        <p>Choose a conversation from the list to start messaging</p>
      </div>
    </div>

    <!-- New Message Dialog -->
    <el-dialog v-model="showNewMessageDialog" title="New Message" width="400px" class="new-message-dialog">
      <el-form :model="newConversation">
        <el-form-item label="To:">
          <el-input v-model="newConversation.recipient" placeholder="Enter username or email" />
        </el-form-item>
        <el-form-item label="Message:">
          <el-input
            v-model="newConversation.message"
            type="textarea"
            :rows="3"
            placeholder="Type your message..."
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showNewMessageDialog = false">Cancel</el-button>
        <el-button type="primary" @click="startNewConversation">Send</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import {
  Plus,
  Search,
  CircleCheckFilled,
  Phone,
  VideoCamera,
  MoreFilled,
  Pointer,
  Promotion,
  ChatDotRound
} from '@element-plus/icons-vue'

const searchQuery = ref('')
const activeConversation = ref(null)
const newMessage = ref('')
const showNewMessageDialog = ref(false)
const messagesContainer = ref(null)
const newConversation = ref({
  recipient: '',
  message: ''
})

const conversations = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg?height=45&width=45',
    lastMessage: 'Hey! How are you doing?',
    lastMessageTime: '2m ago',
    unread: 2,
    online: true,
    messages: [
      { id: 1, content: 'Hey there!', time: '10:30 AM', sent: false },
      { id: 2, content: 'Hi Sarah! How are you?', time: '10:32 AM', sent: true },
      { id: 3, content: 'I\'m doing great! Working on a new project', time: '10:33 AM', sent: false },
      { id: 4, content: 'That sounds exciting! What kind of project?', time: '10:35 AM', sent: true },
      { id: 5, content: 'It\'s a Vue.js application with some cool features', time: '10:36 AM', sent: false },
      { id: 6, content: 'Hey! How are you doing?', time: '10:38 AM', sent: false }
    ]
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: '/placeholder.svg?height=45&width=45',
    lastMessage: 'Thanks for the help with the code!',
    lastMessageTime: '1h ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, content: 'Can you help me with this Vue component?', time: '9:15 AM', sent: false },
      { id: 2, content: 'What do you need help with?', time: '9:20 AM', sent: true },
      { id: 3, content: 'I\'m having trouble with reactive data', time: '9:22 AM', sent: false },
      { id: 4, content: 'Try using ref() or reactive() from Vue 3', time: '9:25 AM', sent: true },
      { id: 5, content: 'Thanks for the help with the code!', time: '9:30 AM', sent: false }
    ]
  },
  {
    id: 3,
    name: 'Emma Wilson',
    avatar: '/placeholder.svg?height=45&width=45',
    lastMessage: 'See you at the meeting tomorrow!',
    lastMessageTime: '3h ago',
    unread: 1,
    online: true,
    messages: [
      { id: 1, content: 'Don\'t forget about tomorrow\'s meeting', time: '2:00 PM', sent: false },
      { id: 2, content: 'What time was it again?', time: '2:05 PM', sent: true },
      { id: 3, content: '10 AM in the conference room', time: '2:06 PM', sent: false },
      { id: 4, content: 'Perfect, I\'ll be there', time: '2:08 PM', sent: true },
      { id: 5, content: 'See you at the meeting tomorrow!', time: '2:10 PM', sent: false }
    ]
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    avatar: '/placeholder.svg?height=45&width=45',
    lastMessage: 'The design looks amazing!',
    lastMessageTime: '1d ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, content: 'Check out this new design I made', time: 'Yesterday', sent: false, image: '/placeholder.svg?height=200&width=300' },
      { id: 2, content: 'Wow, that looks incredible!', time: 'Yesterday', sent: true },
      { id: 3, content: 'The design looks amazing!', time: 'Yesterday', sent: false }
    ]
  }
])

const filteredConversations = computed(() => {
  if (!searchQuery.value) return conversations.value
  return conversations.value.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectConversation = (conversation) => {
  activeConversation.value = conversation
  conversation.unread = 0
  nextTick(() => {
    scrollToBottom()
  })
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !activeConversation.value) return
  
  const message = {
    id: Date.now(),
    content: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sent: true
  }
  
  activeConversation.value.messages.push(message)
  activeConversation.value.lastMessage = newMessage.value
  activeConversation.value.lastMessageTime = 'now'
  
  newMessage.value = ''
  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const startNewConversation = () => {
  if (newConversation.value.recipient && newConversation.value.message) {
    // Add logic to start new conversation
    newConversation.value = { recipient: '', message: '' }
    showNewMessageDialog.value = false
  }
}
</script>

<style scoped>
.messages-section {
  height: calc(100vh - 40px);
  padding: 20px;
}

.messages-layout {
  display: flex;
  height: 100%;
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #374151;
}

.conversations-panel {
  width: 350px;
  border-right: 1px solid #374151;
  display: flex;
  flex-direction: column;
}

.conversations-header {
  padding: 20px;
  border-bottom: 1px solid #374151;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.conversations-header h2 {
  color: #e5e7eb;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.new-message-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  color: white;
}

.search-bar {
  padding: 15px 20px;
  border-bottom: 1px solid #374151;
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #2d3748;
}

.conversation-item:hover {
  background-color: #374151;
}

.conversation-item.active {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
}

.conversation-badge {
  margin-right: 15px;
}

.conversation-info {
  flex: 1;
  min-width: 0;
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.conversation-header h4 {
  color: #e5e7eb;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.last-time {
  color: #9ca3af;
  font-size: 12px;
}

.last-message {
  color: #9ca3af;
  margin: 0;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-status {
  margin-left: 10px;
}

.online-indicator {
  color: #10b981;
  font-size: 12px;
}

.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid #374151;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.chat-user-info h3 {
  color: #e5e7eb;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.user-status {
  color: #9ca3af;
  font-size: 14px;
}

.user-status.online {
  color: #10b981;
}

.chat-actions {
  display: flex;
  gap: 10px;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
}

.message {
  max-width: 70%;
  align-self: flex-start;
}

.message.sent {
  align-self: flex-end;
}

.message-content {
  background: #374151;
  padding: 12px 16px;
  border-radius: 18px;
  margin-bottom: 5px;
}

.message.sent .message-content {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
}

.message-content p {
  color: #e5e7eb;
  margin: 0;
  line-height: 1.4;
}

.message-image {
  width: 100%;
  border-radius: 12px;
  margin-top: 8px;
}

.message-time {
  color: #9ca3af;
  font-size: 12px;
  padding: 0 16px;
}

.message.sent .message-time {
  text-align: right;
}

.message-input-area {
  padding: 20px;
  border-top: 1px solid #374151;
}

.empty-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  color: #6b7280;
}

.empty-chat h3 {
  color: #e5e7eb;
  margin: 0 0 10px 0;
  font-size: 20px;
}

.empty-chat p {
  margin: 0;
  font-size: 16px;
}

:deep(.search-input .el-input__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

:deep(.message-input .el-input__inner) {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

:deep(.new-message-dialog .el-dialog) {
  background: linear-gradient(135deg, #1f2937 0%, #2d1b69 100%);
  border: 1px solid #374151;
}

:deep(.new-message-dialog .el-dialog__title) {
  color: #e5e7eb;
}

:deep(.el-badge__content) {
  background-color: #a855f7;
}
</style>