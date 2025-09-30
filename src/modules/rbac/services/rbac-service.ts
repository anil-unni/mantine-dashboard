import { api } from '../../../api/axios';
import { Role, Permission, User, UserRole, PaginatedResponse } from '../../../types/api';
import { RoleFormData, PermissionFormData, UserRoleFormData, RBACStats } from '../types';

class RBACService {
  // Role management
  async getRoles(): Promise<Role[]> {
    const response = await api.get('/api/v1/rbac/roles/');
    return response.data.results;
  }

  async getRole(id: number): Promise<Role> {
    const response = await api.get(`/api/v1/rbac/roles/${id}/`);
    return response.data;
  }

  async createRole(data: RoleFormData): Promise<Role> {
    const response = await api.post('/api/v1/rbac/roles/', data);
    return response.data;
  }

  async updateRole(id: number, data: RoleFormData): Promise<Role> {
    const response = await api.put(`/api/v1/rbac/roles/${id}/`, data);
    return response.data;
  }

  async deleteRole(id: number): Promise<void> {
    await api.delete(`/api/v1/rbac/roles/${id}/`);
  }

  // Permission management
  async getPermissions(): Promise<Permission[]> {
    const response = await api.get('/api/v1/rbac/permissions/');
    return response.data.results;
  }

  async getPermission(id: number): Promise<Permission> {
    const response = await api.get(`/api/v1/rbac/permissions/${id}/`);
    return response.data;
  }

  async createPermission(data: PermissionFormData): Promise<Permission> {
    const response = await api.post('/api/v1/rbac/permissions/', data);
    return response.data;
  }

  async updatePermission(id: number, data: PermissionFormData): Promise<Permission> {
    const response = await api.put(`/api/v1/rbac/permissions/${id}/`, data);
    return response.data;
  }

  async deletePermission(id: number): Promise<void> {
    await api.delete(`/api/v1/rbac/permissions/${id}/`);
  }

  // User role assignments
  async getUserRoles(userId: number): Promise<UserRole[]> {
    const response = await api.get(`/api/v1/rbac/users/${userId}/roles/`);
    return response.data.results;
  }

  async assignUserRole(data: UserRoleFormData): Promise<UserRole> {
    const response = await api.post('/api/v1/rbac/user-roles/', data);
    return response.data;
  }

  async updateUserRole(assignmentId: number, data: Partial<UserRoleFormData>): Promise<UserRole> {
    const response = await api.patch(`/api/v1/rbac/user-roles/${assignmentId}/`, data);
    return response.data;
  }

  async removeUserRole(assignmentId: number): Promise<void> {
    await api.delete(`/api/v1/rbac/user-roles/${assignmentId}/`);
  }

  // Role permissions
  async getRolePermissions(roleId: number): Promise<Permission[]> {
    const response = await api.get(`/api/v1/rbac/roles/${roleId}/permissions/`);
    return response.data.results;
  }

  async assignRolePermissions(roleId: number, permissionIds: number[]): Promise<void> {
    await api.post(`/api/v1/rbac/roles/${roleId}/permissions/`, {
      permission_ids: permissionIds
    });
  }

  // Users management
  async getUsers(params?: { search?: string; role?: number; is_active?: boolean }): Promise<PaginatedResponse<User>> {
    const response = await api.get('/api/v1/rbac/users/', { params });
    return response.data;
  }

  async getUser(id: number): Promise<User> {
    const response = await api.get(`/api/v1/rbac/users/${id}/`);
    return response.data;
  }

  // Statistics
  async getRBACStats(): Promise<RBACStats> {
    const response = await api.get('/api/v1/rbac/stats/');
    return response.data;
  }

  // Permission checking
  async checkUserPermission(userId: number, permission: string): Promise<boolean> {
    const response = await api.get(`/api/v1/rbac/users/${userId}/permissions/${permission}/`);
    return response.data.has_permission;
  }

  // Bulk operations
  async bulkAssignRoles(assignments: UserRoleFormData[]): Promise<UserRole[]> {
    const response = await api.post('/api/v1/rbac/user-roles/bulk/', { assignments });
    return response.data;
  }

  async bulkUpdateRolePermissions(roleId: number, permissionIds: number[]): Promise<void> {
    await api.put(`/api/v1/rbac/roles/${roleId}/permissions/`, {
      permission_ids: permissionIds
    });
  }
}

export const rbacService = new RBACService();
