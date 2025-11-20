<template>
  <div class="chat-message" :class="{ 'is-user': message.role === 'user', 'is-assistant': message.role === 'assistant' }">
    <div class="message-avatar">
      <el-avatar v-if="message.role === 'user'" :icon="UserFilled" />
      <el-avatar v-else :icon="ChatDotRound" />
    </div>
    <div class="message-content">
      <div class="message-header">
        <span class="message-role">{{ message.role === 'user' ? '你' : 'AI助手' }}</span>
        <span class="message-time">{{ formatTime(message.timestamp) }}</span>
      </div>
      <div class="message-body">
        <MarkdownRenderer v-if="message.role === 'assistant'" :content="message.content" />
        <div v-else class="user-message">{{ message.content }}</div>
        <div v-if="loading" class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/api/chat'
import { formatTime } from '@/utils/format'
import { UserFilled, ChatDotRound } from '@element-plus/icons-vue'
import MarkdownRenderer from './MarkdownRenderer.vue'

interface Props {
  message: ChatMessage
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>

<style scoped lang="scss">
.chat-message {
  display: flex;
  gap: 12px;
  animation: fadeIn 0.3s ease-in;

  &.is-user {
    flex-direction: row-reverse;

    .message-content {
      align-items: flex-end;

      .message-body {
        background: var(--color-primary);
        color: var(--color-white);
        border-radius: 12px 12px 0 12px;
      }
    }
  }

  &.is-assistant {
    .message-content {
      align-items: flex-start;

      .message-body {
        background: var(--color-white);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        border-radius: 12px 12px 12px 0;
      }
    }
  }
}

.message-avatar {
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 70%;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--text-tertiary);

  .message-role {
    font-weight: 500;
  }
}

.message-body {
  padding: 12px 16px;
  word-wrap: break-word;
  line-height: 1.6;

  .user-message {
    white-space: pre-wrap;
  }
}

.typing-indicator {
  display: inline-flex;
  gap: 4px;
  margin-top: 8px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-tertiary);
    animation: typing 1.4s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
</style>

