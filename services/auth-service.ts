const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || 'http://localhost:8080';

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
  static async signIn(credentials: SignInRequest): Promise<SignInResponse> {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/emailLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: 'Sign in successful',
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Sign in failed',
      };
    }
  }
}
