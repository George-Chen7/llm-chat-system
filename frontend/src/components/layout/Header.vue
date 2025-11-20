<template>
  <div class="header">
    <div class="header-left">
      <h1 class="logo">🗣️ 智能对话系统</h1>
    </div>
    <div class="header-right">
      <template v-if="userStore.isLoggedIn">
        <el-dropdown @command="handleCommand">
          <span class="user-info">
            <el-avatar :size="32" :icon="UserFilled" />
            <span class="username">{{ userStore.user?.username }}</span>
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else>
        <el-button type="text" @click="$router.push('/login')">登录</el-button>
        <el-button type="primary" @click="$router.push('/register')">注册</el-button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UserFilled, ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { logout } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()

const handleCommand = async (command: string) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })

      await logout()
      userStore.clearUser()
      ElMessage.success('已退出登录')
      router.push('/login')
    } catch (error) {
      // 用户取消或出错
      if (error !== 'cancel') {
        console.error('Logout error:', error)
      }
    }
  } else if (command === 'profile') {
    // TODO: 跳转到个人中心
    ElMessage.info('个人中心功能开发中...')
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  background: var(--color-white);
  border-bottom: 1px solid var(--border-color);
}

.header-left {
  .logo {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--bg-secondary);
    }

    .username {
      font-size: 14px;
      color: var(--text-primary);
    }
  }
}
</style>

