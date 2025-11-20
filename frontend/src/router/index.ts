import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/ChatView.vue'),
    meta: {
      title: '智能对话',
      requiresAuth: true, // 需要登录
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: '登录',
      requiresAuth: false, // 已登录用户不能访问
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      title: '注册',
      requiresAuth: false, // 已登录用户不能访问
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 基于LLM的智能对话系统`
  }

  // 检查是否需要登录
  if (to.meta.requiresAuth === true) {
    if (!userStore.isLoggedIn) {
      // 未登录，跳转到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }
  }

  // 如果已登录，访问登录/注册页时跳转到首页
  if (to.meta.requiresAuth === false && userStore.isLoggedIn) {
    if (to.path === '/login' || to.path === '/register') {
      next({ path: '/' })
      return
    }
  }

  next()
})

export default router

