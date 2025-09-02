import { Configuration } from '@/api-client/src/runtime'
import { authUtils } from '@/utils/auth-utils'

// Create a configuration instance with the base URL from environment
const apiConfig = new Configuration({
  basePath:  'https://api.mediva.in',
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
