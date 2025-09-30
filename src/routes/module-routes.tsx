import React from 'react';
import { Routes, Route } from 'react-router-dom';

// RBAC Module Routes
import { RBACDashboardPage } from '../modules/rbac/pages/rbac-dashboard-page';
import { RolesPage } from '../modules/rbac/pages/roles-page';

// Projects Module Routes
import { ProjectDashboardPage } from '../modules/projects/pages/project-dashboard-page';

// Workspace Module Routes
import { WorkspaceDashboardPage } from '../modules/workspace/pages/workspace-dashboard-page';

// Reporting Module Routes
import { ReportingDashboardPage } from '../modules/reporting/pages/reporting-dashboard-page';

export function ModuleRoutes() {
    return (
        <Routes>
            {/* RBAC Routes */}
            <Route path="/rbac" element={<RBACDashboardPage />} />
            <Route path="/rbac/roles" element={<RolesPage />} />
            <Route path="/rbac/roles/create" element={<RolesPage />} />
            <Route path="/rbac/roles/:id/edit" element={<RolesPage />} />
            <Route path="/rbac/permissions" element={<div>Permissions Page</div>} />
            <Route path="/rbac/users" element={<div>Users Page</div>} />
            <Route path="/rbac/assignments" element={<div>Assignments Page</div>} />

            {/* Projects Routes */}
            <Route path="/projects" element={<ProjectDashboardPage />} />
            <Route path="/projects/create" element={<div>Create Project Page</div>} />
            <Route path="/projects/:id" element={<div>Project Detail Page</div>} />
            <Route path="/projects/:id/edit" element={<div>Edit Project Page</div>} />
            <Route path="/projects/timeline" element={<div>Project Timeline Page</div>} />
            <Route path="/projects/reports" element={<div>Project Reports Page</div>} />

            {/* Tasks Routes */}
            <Route path="/tasks" element={<div>Tasks List Page</div>} />
            <Route path="/tasks/create" element={<div>Create Task Page</div>} />
            <Route path="/tasks/:id" element={<div>Task Detail Page</div>} />
            <Route path="/tasks/:id/edit" element={<div>Edit Task Page</div>} />

            {/* Workspace Routes */}
            <Route path="/workspace" element={<WorkspaceDashboardPage />} />
            <Route path="/workspace/tasks" element={<div>My Tasks Page</div>} />
            <Route path="/workspace/timelogs" element={<div>Time Logs Page</div>} />
            <Route path="/workspace/timelogs/create" element={<div>Create Time Log Page</div>} />
            <Route path="/workspace/calendar" element={<div>Calendar Page</div>} />
            <Route path="/workspace/timer" element={<div>Timer Page</div>} />
            <Route path="/workspace/settings" element={<div>Workspace Settings Page</div>} />

            {/* Reporting Routes */}
            <Route path="/reporting" element={<ReportingDashboardPage />} />
            <Route path="/reporting/employee-productivity" element={<div>Employee Productivity Report</div>} />
            <Route path="/reporting/project-progress" element={<div>Project Progress Report</div>} />
            <Route path="/reporting/time-tracking" element={<div>Time Tracking Report</div>} />
            <Route path="/reporting/custom" element={<div>Custom Reports Page</div>} />
            <Route path="/reporting/templates" element={<div>Report Templates Page</div>} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<div>Main Dashboard</div>} />
            <Route path="/" element={<div>Home Page</div>} />
        </Routes>
    );
}
