import request from './request'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface ChatRequest {
  message: string
  conversation_id?: string
  history?: ChatMessage[]
}

export interface ChatResponse {
  message: string
  conversation_id: string
  finish_reason?: string
}

// 发送聊天消息
export const sendChatMessage = (data: ChatRequest): Promise<ChatResponse> => {
  return request.post('/chat', data)
}

// 流式发送聊天消息（SSE）
export const sendChatMessageStream = (
  data: ChatRequest,
  onMessage: (chunk: string) => void,
  onError?: (error: Error) => void,
  onComplete?: () => void
): EventSource => {
  const eventSource = new EventSource(
    `/api/chat/stream?message=${encodeURIComponent(data.message)}&conversation_id=${data.conversation_id || ''}`
  )

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      if (data.content) {
        onMessage(data.content)
      }
      if (data.finish_reason) {
        eventSource.close()
        onComplete?.()
      }
    } catch (error) {
      console.error('Parse SSE message error:', error)
    }
  }

  eventSource.onerror = (error) => {
    eventSource.close()
    onError?.(error as Error)
  }

  return eventSource
}

// 获取对话历史
export const getConversationHistory = (conversationId: string): Promise<ChatMessage[]> => {
  return request.get(`/chat/history/${conversationId}`)
}

// 获取所有会话列表
export const getConversations = (): Promise<Array<{ id: string; title: string; updated_at: string }>> => {
  return request.get('/chat/conversations')
}

// 创建新会话
export const createConversation = (): Promise<{ id: string; title: string }> => {
  return request.post('/chat/conversations')
}

// 删除会话
export const deleteConversation = (conversationId: string): Promise<void> => {
  return request.delete(`/chat/conversations/${conversationId}`)
}

