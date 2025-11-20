import request from './request'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  email?: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    username: string
    email?: string
  }
}

// 用户登录
export const login = (data: LoginRequest): Promise<AuthResponse> => {
  return request.post('/auth/login', data)
}

// 用户注册
export const register = (data: RegisterRequest): Promise<AuthResponse> => {
  return request.post('/auth/register', data)
}

// 用户登出
export const logout = (): Promise<void> => {
  return request.post('/auth/logout')
}

// 获取当前用户信息
export const getCurrentUser = (): Promise<AuthResponse['user']> => {
  return request.get('/auth/me')
}

