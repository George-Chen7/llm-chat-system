/**
 * 应用常量配置
 */

// API配置
export const API_CONFIG = {
  BASE_URL: '/api',
  TIMEOUT: 30000,
} as const

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'user_info',
  CONVERSATION_ID: 'conversation_id',
} as const

// 消息类型
export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const

// 分页配置
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const

// 聊天配置
export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 10000,
  MAX_HISTORY_LENGTH: 50, // 最大历史消息数
  STREAM_CHUNK_DELAY: 50, // 流式响应延迟（ms）
} as const

