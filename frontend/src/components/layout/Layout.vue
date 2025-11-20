<template>
  <div class="layout">
    <header v-if="$slots.header" class="layout-header">
      <slot name="header"></slot>
    </header>
    <main class="layout-main">
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout布局组件
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-header {
  flex-shrink: 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--color-white);
}

.layout-main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>

