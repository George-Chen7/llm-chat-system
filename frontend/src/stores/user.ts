import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  username: string
  email?: string
}

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const user = ref<User | null>(null)

  // Token
  const token = ref<string>('')

  // 是否已登录
  const isLoggedIn = computed(() => !!token.value && !!user.value)

  // 设置用户信息
  const setUser = (userInfo: User) => {
    user.value = userInfo
  }

  // 设置Token
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // 清除用户信息
  const clearUser = () => {
    user.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  // 初始化（从localStorage读取token）
  const init = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      // 可以在这里调用getCurrentUser获取用户信息
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    setUser,
    setToken,
    clearUser,
    init,
  }
})

