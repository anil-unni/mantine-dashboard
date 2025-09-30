import { ElementType } from 'react';
import {
  PiStarDuotone,
  PiNewspaperDuotone,
  PiUsersDuotone,
  PiShieldDuotone,
} from 'react-icons/pi';
import { paths } from '@/routes/paths';

interface MenuItem {
  header: string;
  section: {
    name: string;
    href: string;
    icon: ElementType;
    dropdownItems?: {
      name: string;
      href: string;
      badge?: string;
    }[];
  }[];
}

export const menu: MenuItem[] = [
  {
    header: 'Overview',
    section: [
      {
        name: 'Welcome',
        href: paths.dashboard.home,
        icon: PiStarDuotone,
      },
    ],
  },
  {
    header: 'Projects',
    section: [
      {
        name: 'Projects',
        href: paths.app.projects.root,
        icon: PiNewspaperDuotone,
        dropdownItems: [
          {
            name: 'All Projects',
            href: paths.app.projects.root,
          },
          {
            name: 'Create Project',
            href: paths.app.projects.create,
          },
          {
            name: 'Timeline',
            href: paths.app.projects.timeline,
          },
          {
            name: 'Reports',
            href: paths.app.projects.reports,
          },
        ],
      },
    ],
  },
  {
    header: 'Tasks',
    section: [
      {
        name: 'Tasks',
        href: paths.app.tasks.root,
        icon: PiNewspaperDuotone,
        dropdownItems: [
          {
            name: 'All Tasks',
            href: paths.app.tasks.root,
          },
          {
            name: 'Create Task',
            href: paths.app.tasks.create,
          },
        ],
      },
    ],
  },
  {
    header: 'Workspace',
    section: [
      {
        name: 'My Workspace',
        href: paths.app.workspace.root,
        icon: PiNewspaperDuotone,
        dropdownItems: [
          {
            name: 'My Tasks',
            href: paths.app.workspace.tasks,
          },
          {
            name: 'Time Logs',
            href: paths.app.workspace.timelogs,
          },
          {
            name: 'Calendar',
            href: paths.app.workspace.calendar,
          },
          {
            name: 'Timer',
            href: paths.app.workspace.timer,
          },
          {
            name: 'Settings',
            href: paths.app.workspace.settings,
          },
        ],
      },
    ],
  },
  {
    header: 'User Management',
    section: [
      {
        name: 'Users',
        href: paths.app.rbac.users,
        icon: PiUsersDuotone,
        dropdownItems: [
          {
            name: 'All Users',
            href: paths.app.rbac.users,
          },
          {
            name: 'Add User',
            href: paths.app.rbac.usersCreate,
          },
          {
            name: 'User Roles',
            href: paths.app.rbac.assignments,
          },
        ],
      },
    ],
  },
  {
    header: 'Role Management',
    section: [
      {
        name: 'Roles',
        href: paths.app.rbac.roles,
        icon: PiShieldDuotone,
        dropdownItems: [
          {
            name: 'All Roles',
            href: paths.app.rbac.roles,
          },
          {
            name: 'Create Role',
            href: paths.app.rbac.rolesCreate,
          },
          {
            name: 'Permissions',
            href: paths.app.rbac.permissions,
          },
        ],
      },
    ],
  },
  {
    header: 'Reporting',
    section: [
      {
        name: 'Reports',
        href: paths.app.reporting.root,
        icon: PiNewspaperDuotone,
        dropdownItems: [
          {
            name: 'Employee Productivity',
            href: paths.app.reporting.employeeProductivity,
          },
          {
            name: 'Project Progress',
            href: paths.app.reporting.projectProgress,
          },
          {
            name: 'Time Tracking',
            href: paths.app.reporting.timeTracking,
          },
          {
            name: 'Custom Reports',
            href: paths.app.reporting.custom,
          },
        ],
      },
    ],
  },
  {
    header: 'Analytics',
    section: [
      {
        name: 'Analytics',
        href: paths.app.analytics.dashboard,
        icon: PiNewspaperDuotone,
        dropdownItems: [
          {
            name: 'Dashboard',
            href: paths.app.analytics.dashboard,
          },
          {
            name: 'Cards',
            href: paths.app.analytics.cards,
          },
          {
            name: 'Metrics',
            href: paths.app.analytics.metrics,
          },
          {
            name: 'Charts',
            href: paths.app.analytics.charts,
          },
        ],
      },
    ],
  },
  {
    header: 'Audit',
    section: [
      {
        name: 'Audit',
        href: paths.app.audit.root,
        icon: PiNewspaperDuotone,
        dropdownItems: [
          {
            name: 'Logs',
            href: paths.app.audit.logs,
          },
          {
            name: 'Activity',
            href: paths.app.audit.activity,
          },
          {
            name: 'Settings',
            href: paths.app.audit.settings,
          },
        ],
      },
    ],
  },
];
