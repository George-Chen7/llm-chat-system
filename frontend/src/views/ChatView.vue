<template>
  <div class="chat-view">
    <Layout>
      <template #header>
        <Header />
      </template>
      <template #main>
        <div class="chat-container">
          <!-- 消息列表 -->
          <MessageList :messages="chatStore.messages" :loading="chatStore.isLoading" />

          <!-- 输入区域 -->
          <ChatInput @send="handleSendMessage" :loading="chatStore.isLoading" />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import { sendChatMessageStream, type ChatMessage } from '@/api/chat'
import { generateId } from '@/utils/format'
import Layout from '@/components/layout/Layout.vue'
import Header from '@/components/layout/Header.vue'
import MessageList from '@/components/chat/MessageList.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import { ElMessage } from 'element-plus'

const chatStore = useChatStore()

let eventSource: EventSource | null = null

// 发送消息
const handleSendMessage = async (message: string) => {
  if (!message.trim()) return

  // 添加用户消息
  const userMessage: ChatMessage = {
    id: generateId(),
    role: 'user',
    content: message,
    timestamp: Date.now(),
  }
  chatStore.addMessage(userMessage)

  // 添加占位的助手消息
  const assistantMessage: ChatMessage = {
    id: generateId(),
    role: 'assistant',
    content: '',
    timestamp: Date.now(),
  }
  chatStore.addMessage(assistantMessage)

  chatStore.isLoading = true

  try {
    // 使用流式响应
    eventSource = sendChatMessageStream(
      {
        message,
        conversation_id: chatStore.currentConversationId || undefined,
        history: chatStore.messages.slice(0, -2), // 排除刚添加的两条消息
      },
      (chunk: string) => {
        // 流式更新最后一条消息
        chatStore.updateLastMessage(chunk)
      },
      (error: Error) => {
        console.error('Stream error:', error)
        ElMessage.error('消息发送失败，请重试')
        chatStore.isLoading = false
      },
      () => {
        // 完成
        chatStore.isLoading = false
        eventSource = null
      }
    )
  } catch (error) {
    console.error('Send message error:', error)
    ElMessage.error('消息发送失败，请重试')
    chatStore.isLoading = false
  }
}

// 组件卸载时清理
onUnmounted(() => {
  if (eventSource) {
    eventSource.close()
  }
})
</script>

<style scoped lang="scss">
.chat-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style>

