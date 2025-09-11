// Auth service for managing JWT tokens and API calls

export interface AuthUser {
  userId: string;
  email: string;
  role: "tenant" | "manager";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  role: "tenant" | "manager";
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: AuthUser | null = null;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('auth_user');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();

      // Assuming the server returns { access_token: string, user: UserData }
      const user: AuthUser = {
        userId: data.user.id,
        email: data.user.email,
        role: data.user.role || 'tenant',
      };

      this.setAuth(data.access_token, user);
      return { user, token: data.access_token };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(credentials: RegisterCredentials): Promise<{ user: AuthUser; token: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();

      const user: AuthUser = {
        userId: data.user.id,
        email: data.user.email,
        role: data.user.role,
      };

      this.setAuth(data.access_token, user);
      return { user, token: data.access_token };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  setAuth(token: string, user: AuthUser) {
    this.token = token;
    this.user = user;

    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): AuthUser | null {
    return this.user;
  }

  clearAuth() {
    this.token = null;
    this.user = null;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  async logout() {
    this.clearAuth();
  }
}

export const authService = AuthService.getInstance();

