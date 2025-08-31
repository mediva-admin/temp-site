import { AuthApi } from '@/api-client/src/apis/AuthApi';
import { LoginEmailSubmitRequest, LoginTokenResponse } from '@/api-client/src/models';
import { apiConfig } from './api-config';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export class AuthService {
  private static authApi = new AuthApi(apiConfig)

  static async signIn(credentials: SignInRequest): Promise<SignInResponse> {
    try {
      const loginRequest: LoginEmailSubmitRequest = {
        email: credentials.email,
        password: credentials.password,
      }

      const response: LoginTokenResponse = await this.authApi.emailLogin(loginRequest)
      
      return {
        success: true,
        message: 'Sign in successful',
        token: response.token,
        user: {
          id: '1', // You may need to adjust this based on your actual response structure
          email: credentials.email,
          name: credentials.email.split('@')[0], // Fallback name from email
        },
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Sign in failed',
      }
    }
  }
}
