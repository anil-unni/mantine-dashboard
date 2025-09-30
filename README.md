# Dynamic Task & Employee Management System

A comprehensive, scalable, and secure real-time task management and employee monitoring application built with React, TypeScript, and Mantine UI.

## 🚀 Features

### Module 1: Dynamic Role-Based Access Control (RBAC)

- **User Management**: Create, view, update, and deactivate user accounts
- **Dynamic Role Creator**: Admin interface for creating, editing, and deleting user roles
- **Dynamic Permission Manager**: UI-driven system to define granular permissions for each role
- **Role Assignment**: Assign roles to users with audit trails

### Module 2: Project & Task Management

- **Project Management**: Create, manage, and archive projects with full lifecycle tracking
- **Task Management**: Create project-specific or standalone tasks with detailed tracking
- **Task Allocation**: Intuitive interface for Team Leads and Admins to assign tasks
- **Task Status Tracking**: Customizable workflows for task statuses
- **Progress Monitoring**: Real-time progress tracking and reporting

### Module 3: Employee Workspace & Time Tracking

- **Personal Dashboard**: Personalized dashboard showing assigned tasks and work activity
- **Time Logging**: Simple interface for employees to log work hours against tasks
- **Work Summaries**: Automated weekly and monthly summaries
- **Timer Integration**: Start/stop/pause timers for accurate time tracking
- **Calendar Integration**: View tasks and deadlines in calendar format

### Module 4: Advanced Reporting & Analytics

- **Comprehensive Reporting Dashboard**: Central hub for all analytics
- **Pre-built Reports**: Employee productivity, project hours, task completion rates
- **Dynamic Filtering**: Robust filtering by date range, employee, project, and status
- **Data Export**: Export reports to Excel, CSV, and PDF formats
- **Custom Reports**: Build custom reports with drag-and-drop interface

## 🏗️ Architecture

### Modular Structure

The application is built with a modular architecture that makes it easy to maintain and extend:

```
src/
├── modules/
│   ├── shared/           # Shared components, utilities, and types
│   ├── rbac/            # Role-Based Access Control module
│   ├── projects/        # Project management module
│   ├── tasks/           # Task management module
│   ├── workspace/       # Employee workspace and time tracking
│   └── reporting/       # Reports and analytics module
├── layouts/             # Application layouts
├── routes/              # Routing configuration
├── types/               # Global TypeScript types
└── api/                 # API configuration and services
```

### Component-Based Design

- **Reusable Components**: All components are designed to be reusable across modules
- **Mantine UI**: Primary component library for consistent design
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with responsive layouts

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Library**: Mantine UI v8
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Forms**: Mantine Form with Zod validation
- **Charts**: Recharts
- **Icons**: Tabler Icons
- **Styling**: CSS Modules with Mantine theming

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mantine-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## 🔧 Configuration

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=Task Management System
VITE_APP_VERSION=1.0.0
```

### API Integration

The system is designed to work with the provided API specification. Update the API base URL in your environment variables to point to your backend server.

## 📱 Usage

### Navigation

The application uses a modular navigation system:

- **Dashboard**: Overview of all system metrics
- **RBAC**: Manage roles, permissions, and user assignments
- **Projects**: Create and manage projects
- **Tasks**: Task management and assignment
- **Workspace**: Personal workspace for employees
- **Reports**: Generate and view reports

### Key Workflows

#### 1. Setting Up RBAC

1. Navigate to RBAC module
2. Create roles (Admin, Manager, Employee, etc.)
3. Define permissions for each role
4. Assign roles to users

#### 2. Managing Projects

1. Create a new project
2. Assign project manager and team members
3. Set project timeline and budget
4. Monitor progress through dashboard

#### 3. Task Management

1. Create tasks within projects
2. Assign tasks to team members
3. Set priorities and deadlines
4. Track progress and completion

#### 4. Time Tracking

1. Employees log time against tasks
2. Use timer for accurate tracking
3. Generate time reports
4. Monitor productivity metrics

#### 5. Reporting

1. Access reporting dashboard
2. Choose from pre-built reports
3. Apply filters and customizations
4. Export reports in various formats

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Granular permission system
- **Audit Trails**: Complete audit trail for all actions
- **Data Validation**: Client and server-side validation
- **Secure API Communication**: HTTPS and secure headers

## 📊 Performance Features

- **Lazy Loading**: Components and routes are lazy-loaded
- **Optimized Queries**: Efficient data fetching with React Query
- **Caching**: Intelligent caching for better performance
- **Code Splitting**: Automatic code splitting for smaller bundles
- **Responsive Design**: Optimized for all device sizes

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
npm run build
vercel --prod
```

## 📈 Monitoring and Analytics

The system includes built-in monitoring and analytics:

- **Performance Metrics**: Track application performance
- **User Activity**: Monitor user engagement
- **Error Tracking**: Automatic error reporting
- **Usage Analytics**: Track feature usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Changelog

### Version 1.0.0

- Initial release
- Complete RBAC system
- Project and task management
- Employee workspace
- Reporting and analytics
- Responsive design
- Full TypeScript support

## 🎯 Roadmap

### Upcoming Features

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] API documentation
- [ ] Integration with external tools
- [ ] Advanced reporting features
- [ ] Multi-language support
- [ ] Dark mode theme

---

Built with ❤️ using React, TypeScript, and Mantine UI
