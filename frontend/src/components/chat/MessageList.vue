<template>
  <div class="message-list" ref="messageListRef">
    <div v-if="messages.length === 0" class="empty-state">
      <el-empty description="开始你的第一次对话吧！" />
    </div>
    <div v-else class="messages">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :loading="loading && message.id === messages[messages.length - 1]?.id && message.role === 'assistant'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { ChatMessage } from '@/api/chat'
import ChatMessage from './ChatMessage.vue'

interface Props {
  messages: ChatMessage[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const messageListRef = ref<HTMLElement>()

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight
    }
  })
}

// 监听消息变化，自动滚动
watch(
  () => props.messages.length,
  () => {
    scrollToBottom()
  },
  { deep: true }
)

// 监听loading状态，流式响应时也要滚动
watch(
  () => props.loading,
  () => {
    scrollToBottom()
  }
)
</script>

<style scoped lang="scss">
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--bg-secondary);

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .messages {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>

