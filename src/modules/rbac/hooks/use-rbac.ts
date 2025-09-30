import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rbacService } from '../services/rbac-service';
import { Role, Permission, User, UserRole, RBACStats } from '../../../types/api';
import { RoleFormData, PermissionFormData, UserRoleFormData } from '../types';

// Main RBAC hook that provides all RBAC functionality
export function useRBAC() {
  const queryClient = useQueryClient();

  // Roles
  const {
    data: roles = [],
    isLoading: rolesLoading,
    error: rolesError,
    refetch: refetchRoles,
  } = useQuery({
    queryKey: ['rbac', 'roles'],
    queryFn: rbacService.getRoles,
  });

  const createRoleMutation = useMutation({
    mutationFn: rbacService.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'roles'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: RoleFormData }) =>
      rbacService.updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'roles'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: rbacService.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'roles'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  // Permissions
  const {
    data: permissions = [],
    isLoading: permissionsLoading,
    error: permissionsError,
    refetch: refetchPermissions,
  } = useQuery({
    queryKey: ['rbac', 'permissions'],
    queryFn: rbacService.getPermissions,
  });

  const createPermissionMutation = useMutation({
    mutationFn: rbacService.createPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'permissions'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  const updatePermissionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PermissionFormData }) =>
      rbacService.updatePermission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'permissions'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  const deletePermissionMutation = useMutation({
    mutationFn: rbacService.deletePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'permissions'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  // Users
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['rbac', 'users'],
    queryFn: () => rbacService.getUsers(),
  });

  const users = usersData?.results || [];

  // User Roles
  const {
    data: userRoles = [],
    isLoading: userRolesLoading,
    error: userRolesError,
    refetch: refetchUserRoles,
  } = useQuery({
    queryKey: ['rbac', 'user-roles'],
    queryFn: () => rbacService.getUserRoles(0), // This would need to be adapted based on your API
  });

  const assignUserRoleMutation = useMutation({
    mutationFn: rbacService.assignUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'user-roles'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UserRoleFormData> }) =>
      rbacService.updateUserRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'user-roles'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  const removeUserRoleMutation = useMutation({
    mutationFn: rbacService.removeUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'user-roles'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'stats'] });
    },
  });

  // Role Permissions
  const assignRolePermissionsMutation = useMutation({
    mutationFn: ({ roleId, permissionIds }: { roleId: number; permissionIds: number[] }) =>
      rbacService.assignRolePermissions(roleId, permissionIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbac', 'roles'] });
      queryClient.invalidateQueries({ queryKey: ['rbac', 'permissions'] });
    },
  });

  // Statistics
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ['rbac', 'stats'],
    queryFn: rbacService.getRBACStats,
  });

  // Utility functions
  const checkPermission = async (userId: number, permission: string): Promise<boolean> => {
    try {
      return await rbacService.checkUserPermission(userId, permission);
    } catch {
      return false;
    }
  };

  const getUserRoles = (userId: number): Role[] => {
    return userRoles
      .filter(ur => ur.user.id === userId && ur.is_active)
      .map(ur => ur.role);
  };

  const getRolePermissions = async (roleId: number): Promise<Permission[]> => {
    try {
      return await rbacService.getRolePermissions(roleId);
    } catch {
      return [];
    }
  };

  const getUsersByRole = (roleId: number): User[] => {
    return userRoles
      .filter(ur => ur.role.id === roleId && ur.is_active)
      .map(ur => ur.user);
  };

  return {
    // Data
    roles,
    permissions,
    users,
    userRoles,
    stats,

    // Loading states
    loading: {
      roles: rolesLoading,
      permissions: permissionsLoading,
      users: usersLoading,
      userRoles: userRolesLoading,
      stats: statsLoading,
    },

    // Error states
    error: {
      roles: rolesError,
      permissions: permissionsError,
      users: usersError,
      userRoles: userRolesError,
      stats: statsError,
    },

    // Role mutations
    createRole: createRoleMutation.mutateAsync,
    updateRole: updateRoleMutation.mutateAsync,
    deleteRole: deleteRoleMutation.mutateAsync,
    isCreatingRole: createRoleMutation.isPending,
    isUpdatingRole: updateRoleMutation.isPending,
    isDeletingRole: deleteRoleMutation.isPending,

    // Permission mutations
    createPermission: createPermissionMutation.mutateAsync,
    updatePermission: updatePermissionMutation.mutateAsync,
    deletePermission: deletePermissionMutation.mutateAsync,
    isCreatingPermission: createPermissionMutation.isPending,
    isUpdatingPermission: updatePermissionMutation.isPending,
    isDeletingPermission: deletePermissionMutation.isPending,

    // User role mutations
    assignUserRole: assignUserRoleMutation.mutateAsync,
    updateUserRole: updateUserRoleMutation.mutateAsync,
    removeUserRole: removeUserRoleMutation.mutateAsync,
    isAssigningUserRole: assignUserRoleMutation.isPending,
    isUpdatingUserRole: updateUserRoleMutation.isPending,
    isRemovingUserRole: removeUserRoleMutation.isPending,

    // Role permission mutations
    assignRolePermissions: assignRolePermissionsMutation.mutateAsync,
    isAssigningRolePermissions: assignRolePermissionsMutation.isPending,

    // Refetch functions
    refetchRoles,
    refetchPermissions,
    refetchUsers,
    refetchUserRoles,

    // Utility functions
    checkPermission,
    getUserRoles,
    getRolePermissions,
    getUsersByRole,
  };
}
