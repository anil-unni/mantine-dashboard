// Shared types and interfaces

export interface ModuleConfig {
  name: string;
  path: string;
  icon: string;
  permissions: string[];
  isActive: boolean;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  permissions?: string[];
  children?: NavigationItem[];
  badge?: number;
}

export interface TableColumn<T = any> {
  key: keyof T;
  title: string;
  width?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'select' | 'multiselect' | 'date' | 'number' | 'switch';
  options?: FilterOption[];
  render?: (value: any, record: T) => React.ReactNode;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SortOption {
  key: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SearchState {
  query: string;
  filters: Record<string, any>;
  sort: SortOption[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'multiselect' | 'date' | 'datetime' | 'textarea' | 'switch' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: FilterOption[];
  validation?: any;
  dependencies?: string[];
}

export interface ActionButton {
  label: string;
  action: () => void;
  variant?: 'filled' | 'outline' | 'light' | 'subtle';
  color?: string;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface ConfirmationDialog {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export interface NotificationOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: ActionButton;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}

export interface TabItem {
  label: string;
  value: string;
  icon?: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

export interface DrawerProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string | number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
  data?: any;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  message?: string;
  code?: string;
}

export interface SuccessState {
  isSuccess: boolean;
  message?: string;
  data?: any;
}

export interface AsyncState<T = any> extends LoadingState, ErrorState, SuccessState {
  data?: T;
  refetch?: () => void;
  mutate?: (data: any) => void;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Component props types
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface DataTableProps<T = any> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: PaginationState;
  search?: SearchState;
  onSearchChange?: (search: SearchState) => void;
  onPaginationChange?: (pagination: PaginationState) => void;
  onRowClick?: (record: T) => void;
  onRowSelect?: (selectedRows: T[]) => void;
  selectable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  actions?: ActionButton[];
}

export interface FormProps extends BaseComponentProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  loading?: boolean;
  initialValues?: Record<string, any>;
  validationSchema?: any;
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
}

export interface PageHeaderProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ActionButton[];
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  actions?: ActionButton[];
  loading?: boolean;
  error?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

export interface StatsCardProps extends BaseComponentProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: string;
  color?: string;
  loading?: boolean;
  onClick?: () => void;
}

export interface ChartProps extends BaseComponentProps {
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  height?: number;
  loading?: boolean;
  error?: string;
  config?: Record<string, any>;
  onDataPointClick?: (data: any) => void;
}

export interface FilterPanelProps extends BaseComponentProps {
  filters: FormField[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onReset: () => void;
  onApply: () => void;
  loading?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface SearchBarProps extends BaseComponentProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  loading?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  filters?: FilterOption[];
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
}
