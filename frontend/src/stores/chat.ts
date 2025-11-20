import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ChatMessage } from '@/api/chat'

export const useChatStore = defineStore('chat', () => {
  // 当前会话ID
  const currentConversationId = ref<string>('')

  // 消息列表
  const messages = ref<ChatMessage[]>([])

  // 是否正在发送消息
  const isLoading = ref<boolean>(false)

  // 添加消息
  const addMessage = (message: ChatMessage) => {
    messages.value.push(message)
  }

  // 更新最后一条消息（用于流式响应）
  const updateLastMessage = (content: string) => {
    if (messages.value.length > 0) {
      const lastMessage = messages.value[messages.value.length - 1]
      if (lastMessage.role === 'assistant') {
        lastMessage.content += content
      }
    }
  }

  // 清空消息
  const clearMessages = () => {
    messages.value = []
  }

  // 设置会话ID
  const setConversationId = (id: string) => {
    currentConversationId.value = id
  }

  // 设置消息列表
  const setMessages = (newMessages: ChatMessage[]) => {
    messages.value = newMessages
  }

  // 计算属性：是否有消息
  const hasMessages = computed(() => messages.value.length > 0)

  return {
    currentConversationId,
    messages,
    isLoading,
    addMessage,
    updateLastMessage,
    clearMessages,
    setConversationId,
    setMessages,
    hasMessages,
  }
})

