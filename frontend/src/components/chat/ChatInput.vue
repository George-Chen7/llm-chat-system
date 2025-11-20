<template>
  <div class="chat-input">
    <div class="input-container">
      <el-input
        v-model="inputText"
        type="textarea"
        :rows="3"
        placeholder="输入消息...（Shift+Enter换行，Enter发送）"
        :disabled="loading"
        @keydown="handleKeyDown"
        resize="none"
        class="input-textarea"
      />
      <div class="input-actions">
        <el-button
          type="primary"
          :loading="loading"
          :disabled="!inputText.trim()"
          @click="handleSend"
          :icon="Promotion"
        >
          发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'

interface Emits {
  (e: 'send', message: string): void
}

const emit = defineEmits<Emits>()

const props = defineProps<{
  loading?: boolean
}>()

const inputText = ref('')

const handleSend = () => {
  if (!inputText.value.trim() || props.loading) return

  const message = inputText.value.trim()
  emit('send', message)
  inputText.value = ''
}

const handleKeyDown = (event: KeyboardEvent) => {
  // Enter发送，Shift+Enter换行
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}
</script>

<style scoped lang="scss">
.chat-input {
  flex-shrink: 0;
  padding: 16px 24px;
  background: var(--color-white);
  border-top: 1px solid var(--border-color);
}

.input-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-textarea {
  :deep(.el-textarea__inner) {
    font-size: 14px;
    line-height: 1.6;
  }
}

.input-actions {
  display: flex;
  justify-content: flex-end;
}
</style>

