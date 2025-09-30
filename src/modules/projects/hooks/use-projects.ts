import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project-service';
import { Project } from '../../../types/api';
import { ProjectStats, ProjectWithDetails } from '../types';
import { StatusEnum } from '../../../types/api';
import { ProjectFormData, ProjectFilters } from '../types';

export function useProjects() {
  const queryClient = useQueryClient();

  // Projects list
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectService.getProjects(),
  });

  const projects = projectsData?.results || [];

  // Project stats
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['projects', 'stats'],
    queryFn: projectService.getProjectStats,
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'stats'] });
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProjectFormData> }) =>
      projectService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'stats'] });
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'stats'] });
    },
  });

  // Project management mutations
  const assignProjectManagerMutation = useMutation({
    mutationFn: ({ projectId, userId }: { projectId: number; userId: number }) =>
      projectService.assignProjectManager(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const addTeamMemberMutation = useMutation({
    mutationFn: ({ projectId, userId }: { projectId: number; userId: number }) =>
      projectService.addTeamMember(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const removeTeamMemberMutation = useMutation({
    mutationFn: ({ projectId, userId }: { projectId: number; userId: number }) =>
      projectService.removeTeamMember(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProjectStatusMutation = useMutation({
    mutationFn: ({ projectId, status }: { projectId: number; status: StatusEnum }) =>
      projectService.updateProjectStatus(projectId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProjectProgressMutation = useMutation({
    mutationFn: ({ projectId, progress }: { projectId: number; progress: number }) =>
      projectService.updateProjectProgress(projectId, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // Utility functions
  const getProject = async (id: number): Promise<Project> => {
    return projectService.getProject(id);
  };

  const getProjectWithDetails = async (id: number): Promise<ProjectWithDetails> => {
    return projectService.getProjectWithDetails(id);
  };

  const searchProjects = async (query: string, filters?: ProjectFilters): Promise<Project[]> => {
    return projectService.searchProjects(query, filters);
  };

  const getProjectsByStatus = (status: string): Project[] => {
    return projects.filter(project => project.status === status);
  };

  const getProjectsByManager = (managerId: number): Project[] => {
    return projects.filter(project => project.project_manager.id === managerId);
  };

  const getProjectsByTeamMember = (memberId: number): Project[] => {
    return projects.filter(project => 
      project.team_members.some(member => member.id === memberId)
    );
  };

  const getOverdueProjects = (): Project[] => {
    const today = new Date();
    return projects.filter(project => {
      if (!project.end_date) return false;
      return new Date(project.end_date) < today && project.status !== 'completed';
    });
  };

  const getUpcomingDeadlines = (days: number): Project[] => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return projects.filter(project => {
      if (!project.end_date) return false;
      const endDate = new Date(project.end_date);
      return endDate >= today && endDate <= futureDate && project.status !== 'completed';
    });
  };

  return {
    // Data
    projects,
    stats,

    // Loading states
    loading: {
      projects: projectsLoading,
      stats: statsLoading,
    },

    // Error states
    error: {
      projects: projectsError,
      stats: statsError,
    },

    // Mutations
    createProject: createProjectMutation.mutateAsync,
    updateProject: updateProjectMutation.mutateAsync,
    deleteProject: deleteProjectMutation.mutateAsync,
    assignProjectManager: assignProjectManagerMutation.mutateAsync,
    addTeamMember: addTeamMemberMutation.mutateAsync,
    removeTeamMember: removeTeamMemberMutation.mutateAsync,
    updateProjectStatus: updateProjectStatusMutation.mutateAsync,
    updateProjectProgress: updateProjectProgressMutation.mutateAsync,

    // Mutation states
    isCreatingProject: createProjectMutation.isPending,
    isUpdatingProject: updateProjectMutation.isPending,
    isDeletingProject: deleteProjectMutation.isPending,
    isAssigningManager: assignProjectManagerMutation.isPending,
    isAddingTeamMember: addTeamMemberMutation.isPending,
    isRemovingTeamMember: removeTeamMemberMutation.isPending,
    isUpdatingStatus: updateProjectStatusMutation.isPending,
    isUpdatingProgress: updateProjectProgressMutation.isPending,

    // Refetch functions
    refetchProjects,
    refetchStats,

    // Utility functions
    getProject,
    getProjectWithDetails,
    searchProjects,
    getProjectsByStatus,
    getProjectsByManager,
    getProjectsByTeamMember,
    getOverdueProjects,
    getUpcomingDeadlines,
  };
}
