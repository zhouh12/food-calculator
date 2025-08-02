// Common API Types for Request/Response patterns

// Generic API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  code?: string
  timestamp?: string
}

// Generic API Error
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  statusCode?: number
}

// Pagination parameters
export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
  cursor?: string
}

// Paginated response
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
    nextCursor?: string
    prevCursor?: string
  }
}

// Sort parameters
export interface SortParams {
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
}

// Filter parameters
export interface FilterParams {
  [key: string]: string | number | boolean | string[] | number[] | undefined
}

// Generic list query parameters
export interface ListQueryParams extends PaginationParams, SortParams, FilterParams {}

// File upload response
export interface FileUploadResponse {
  url: string
  filename: string
  size: number
  mimeType: string
  uploadedAt: string
}

// Batch operation request
export interface BatchRequest<T> {
  items: T[]
  operation: 'CREATE' | 'UPDATE' | 'DELETE'
}

// Batch operation response
export interface BatchResponse<T> {
  successful: T[]
  failed: Array<{
    item: T
    error: ApiError
  }>
  summary: {
    total: number
    successful: number
    failed: number
  }
}

// Health check response
export interface HealthCheckResponse {
  status: 'UP' | 'DOWN' | 'DEGRADED'
  timestamp: string
  uptime: number
  version?: string
  services?: Record<string, 'UP' | 'DOWN'>
}

// Authentication related types
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: 'Bearer'
  user: {
    id: string
    email: string
    name?: string
    verified: boolean
  }
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface SignUpRequest {
  email: string
  password: string
  name?: string
  acceptTerms: boolean
}

export interface VerifyEmailRequest {
  token: string
  email: string
}

export interface ResetPasswordRequest {
  email: string
}

export interface ResetPasswordConfirmRequest {
  token: string
  newPassword: string
}

// Common HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  VALIDATION_ERROR = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// API endpoint configuration
export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  requiresAuth?: boolean
  timeout?: number
}

// Rate limiting info
export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number
  retryAfter?: number
}

// API configuration
export interface ApiConfig {
  baseUrl: string
  timeout: number
  retryAttempts: number
  retryDelay: number
  rateLimitEnabled: boolean
  authHeaderName: string
}

// Request context for logging/tracing
export interface RequestContext {
  requestId: string
  userId?: string
  sessionId?: string
  userAgent?: string
  ipAddress?: string
  timestamp: string
}

// Webhook payload
export interface WebhookPayload<T = any> {
  id: string
  event: string
  data: T
  timestamp: string
  signature?: string
  version: string
}

// Generic search request
export interface SearchRequest {
  query: string
  filters?: FilterParams
  pagination?: PaginationParams
  sort?: SortParams
  highlight?: boolean
  fuzzy?: boolean
}

// Generic search response
export interface SearchResponse<T> extends PaginatedResponse<T> {
  query: string
  took: number // milliseconds
  highlights?: Record<string, string[]>
  facets?: Record<
    string,
    Array<{
      value: string
      count: number
    }>
  >
}
