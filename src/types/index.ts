export type UserRole = 
  | 'product_manager' 
  | 'design_engineer' 
  | 'application_engineer' 
  | 'qa_engineer' 
  | 'sales' 
  | 'admin';

export interface Product {
  id: string;
  name: string;
  code: string;
  status: 'planning' | 'developing' | 'mass_production' | 'eol';
  platformId?: string;
  platformName?: string;
  description: string;
  targetCost: number;
  targetPerformance: string;
  launchDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  name: string;
  assignee: string;
  status: 'todo' | 'in_progress' | 'done';
  startDate: string;
  endDate: string;
  progress: number;
}

export interface Project {
  id: string;
  name: string;
  productId: string;
  productName: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  actualCost: number;
  tasks: Task[];
}

export interface MarketData {
  tam: number;
  sam: number;
  som: number;
  year: number;
}

export interface Competitor {
  id: string;
  name: string;
  productModel: string;
  price: number;
  performance: Record<string, any>;
  marketShare: number;
}

export interface CustomerProject {
  id: string;
  name: string;
  status: 'design_win' | 'design_in' | 'pending';
  forecastRevenue: number;
}

export interface Customer {
  id: string;
  name: string;
  region: string;
  projects: CustomerProject[];
}

export interface QualityIssue {
  id: string;
  title: string;
  description: string;
  productId: string;
  productName: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  lotNumber?: string;
  waferLot?: string;
  packageLot?: string;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'datasheet' | 'app_note' | 'test_report' | 'other';
  version: string;
  productId: string;
  productName: string;
  url: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
}

export interface RolePermission {
  role: UserRole;
  name: string;
  description: string;
  permissions: {
    dashboard: boolean;
    strategy: boolean;
    execution: boolean;
    sales: boolean;
    quality: boolean;
    team: boolean;
    userManagement: boolean;
  };
}

export interface KPI {
  projectsCompleted: number;
  onTimeRate: number;
  qualityIssues: number;
}
