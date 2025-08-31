import { Configuration } from '@/api-client/src/runtime'
import { authUtils } from '@/utils/auth-utils'

// Create a configuration instance with the base URL from environment
const apiConfig = new Configuration({
  basePath: process.env.BACKEND_BASE_URL || 'http://localhost:8080',
  accessToken: async () => {
    const token = authUtils.getToken()
    return token || ''
  },
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  }
})

export { apiConfig }
