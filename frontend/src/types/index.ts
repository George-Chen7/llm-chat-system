// 通用类型定义

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PaginationParams {
  page: number
  page_size: number
}

export interface PaginationResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
}

