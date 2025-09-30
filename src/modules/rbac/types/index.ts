// RBAC specific types
import { User, Role, Permission, UserRole } from '../../../types/api';

export interface RoleFormData {
  name: string;
  description?: string;
  permissions: number[];
  is_active: boolean;
}

export interface PermissionFormData {
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'assign';
  description?: string;
}

export interface UserRoleFormData {
  user_id: number;
  role_id: number;
  is_active: boolean;
}

export interface RolePermission {
  id: number;
  role_id: number;
  permission_id: number;
  permission: Permission;
}

export interface RoleWithPermissions extends Role {
  permissions: Permission[];
  user_count: number;
}

export interface UserWithRoles extends User {
  roles: Role[];
  role_assignments: UserRole[];
}

export interface PermissionGroup {
  resource: string;
  permissions: Permission[];
}

export interface RoleAssignment {
  id: number;
  user: User;
  role: Role;
  assigned_at: string;
  assigned_by: User;
  is_active: boolean;
}

export interface RBACStats {
  total_users: number;
  total_roles: number;
  total_permissions: number;
  active_assignments: number;
}

export interface PermissionMatrix {
  [roleId: number]: {
    [permissionId: number]: boolean;
  };
}

export interface RoleFilters {
  search?: string;
  is_active?: boolean;
  permissions?: number[];
}

export interface UserFilters {
  search?: string;
  is_active?: boolean;
  roles?: number[];
  department?: string;
}

export interface PermissionFilters {
  search?: string;
  resource?: string;
  action?: string;
}

export interface RBACState {
  roles: Role[];
  permissions: Permission[];
  users: User[];
  roleAssignments: UserRole[];
  loading: {
    roles: boolean;
    permissions: boolean;
    users: boolean;
    assignments: boolean;
  };
  error: {
    roles?: string;
    permissions?: string;
    users?: string;
    assignments?: string;
  };
}

export interface RBACActions {
  // Role actions
  createRole: (data: RoleFormData) => Promise<void>;
  updateRole: (id: number, data: RoleFormData) => Promise<void>;
  deleteRole: (id: number) => Promise<void>;
  assignRolePermissions: (roleId: number, permissionIds: number[]) => Promise<void>;
  
  // Permission actions
  createPermission: (data: PermissionFormData) => Promise<void>;
  updatePermission: (id: number, data: PermissionFormData) => Promise<void>;
  deletePermission: (id: number) => Promise<void>;
  
  // User role actions
  assignUserRole: (data: UserRoleFormData) => Promise<void>;
  removeUserRole: (assignmentId: number) => Promise<void>;
  updateUserRole: (assignmentId: number, data: Partial<UserRoleFormData>) => Promise<void>;
  
  // Data fetching
  fetchRoles: () => Promise<void>;
  fetchPermissions: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchRoleAssignments: () => Promise<void>;
  
  // Utility actions
  checkPermission: (permission: string) => boolean;
  getUserRoles: (userId: number) => Role[];
  getRolePermissions: (roleId: number) => Permission[];
  getUsersByRole: (roleId: number) => User[];
}
