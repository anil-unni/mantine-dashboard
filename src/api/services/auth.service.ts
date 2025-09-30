import { api, setClientAccessToken, setClientRefreshToken, loadRefreshToken } from '../axios';
import {
  User,
  UserRegistrationRequest,
  UserRegistration,
  CustomTokenObtainPairRequest,
  TokenRefreshRequest,
  TokenRefresh,
  ChangePasswordRequest,
  ChangePassword,
  UserRequest,
  UserUpdateRequest,
  PaginatedUserList,
  FilterParams
} from '../../types/api';

export class AuthService {
  // Authentication endpoints
  async register(data: UserRegistrationRequest): Promise<UserRegistration> {
    const response = await api.post('/api/v1/auth/register/', data);
    return response.data;
  }

  async login(credentials: CustomTokenObtainPairRequest): Promise<TokenRefresh> {
    const response = await api.post('/api/v1/auth/login/', credentials);
    // Handle wrapped response: { status, code, message, data: { user, tokens } }
    const wrapped = response.data as any;
    const tokens: TokenRefresh | undefined = wrapped?.data?.tokens ?? wrapped;
    if (tokens?.access) {
      setClientAccessToken(tokens.access);
    }
    if (tokens?.refresh) {
      setClientRefreshToken(tokens.refresh);
    }
    return tokens ?? ({} as TokenRefresh);
  }

  async refreshToken(data: TokenRefreshRequest): Promise<TokenRefresh> {
    const response = await api.post('/api/v1/auth/token/refresh/', data);
    if (response.data?.access) {
      setClientAccessToken(response.data.access);
    }
    if (response.data?.refresh) {
      setClientRefreshToken(response.data.refresh);
    }
    return response.data;
  }

  async logout(): Promise<void> {
    const refresh = loadRefreshToken();
    if (refresh) {
      await api.post('/api/v1/auth/logout/', { refresh });
    } else {
      await api.post('/api/v1/auth/logout/');
    }
  }

  async requestPasswordReset(): Promise<void> {
    await api.post('/api/v1/auth/password-reset/');
  }

  async confirmPasswordReset(): Promise<void> {
    await api.post('/api/v1/auth/password-reset-confirm/');
  }

  async changePassword(data: ChangePasswordRequest): Promise<ChangePassword> {
    const response = await api.post('/api/v1/auth/change-password/', data);
    return response.data;
  }

  // Profile management
  async getProfile(): Promise<User> {
    const response = await api.get('/api/v1/auth/profile/');
    return response.data;
  }

  async updateProfile(data: UserRequest): Promise<User> {
    const response = await api.put('/api/v1/auth/profile/', data);
    return response.data;
  }

  async partialUpdateProfile(data: Partial<UserRequest>): Promise<User> {
    const response = await api.patch('/api/v1/auth/profile/', data);
    return response.data;
  }

  async updateProfileInfo(data: UserUpdateRequest): Promise<User> {
    const response = await api.put('/api/v1/auth/profile/update/', data);
    return response.data;
  }

  async partialUpdateProfileInfo(data: Partial<UserUpdateRequest>): Promise<User> {
    const response = await api.patch('/api/v1/auth/profile/update/', data);
    return response.data;
  }

  async getDashboard(): Promise<any> {
    const response = await api.get('/api/v1/auth/dashboard/');
    return response.data;
  }

  // Organization user management
  async getOrganizationUsers(orgId: number, params?: FilterParams): Promise<PaginatedUserList> {
    const response = await api.get(`/api/v1/auth/organizations/${orgId}/users/`, { params });
    return response.data;
  }

  async getOrganizationUser(orgId: number, userId: number): Promise<User> {
    const response = await api.get(`/api/v1/auth/organizations/${orgId}/users/${userId}/`);
    return response.data;
  }

  async updateOrganizationUser(orgId: number, userId: number, data: UserRequest): Promise<User> {
    const response = await api.put(`/api/v1/auth/organizations/${orgId}/users/${userId}/`, data);
    return response.data;
  }

  async partialUpdateOrganizationUser(orgId: number, userId: number, data: Partial<UserRequest>): Promise<User> {
    const response = await api.patch(`/api/v1/auth/organizations/${orgId}/users/${userId}/`, data);
    return response.data;
  }

  async deleteOrganizationUser(orgId: number, userId: number): Promise<void> {
    await api.delete(`/api/v1/auth/organizations/${orgId}/users/${userId}/`);
  }
}

export const authService = new AuthService();
