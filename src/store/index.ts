import { create } from 'zustand';
import {
  Product,
  Project,
  MarketData,
  Competitor,
  Customer,
  QualityIssue,
  Document,
  User,
  RolePermission,
  UserRole
} from '../types';
import {
  mockUsers,
  mockCurrentUser,
  rolePermissions,
  mockProducts,
  mockProjects,
  mockMarketData,
  mockCompetitors,
  mockCustomers,
  mockQualityIssues,
  mockDocuments
} from '../mock/data';

interface AppState {
  currentUser: User;
  users: User[];
  rolePermissions: RolePermission[];
  products: Product[];
  projects: Project[];
  marketData: MarketData[];
  competitors: Competitor[];
  customers: Customer[];
  qualityIssues: QualityIssue[];
  documents: Document[];
  
  switchUser: (userId: string) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  toggleUserActive: (id: string) => void;
  
  setUser: (user: User) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addQualityIssue: (issue: QualityIssue) => void;
  updateQualityIssue: (id: string, updates: Partial<QualityIssue>) => void;
  
  hasPermission: (permission: keyof RolePermission['permissions']) => boolean;
  getRoleName: (role: UserRole) => string;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: mockCurrentUser,
  users: mockUsers,
  rolePermissions: rolePermissions,
  products: mockProducts,
  projects: mockProjects,
  marketData: mockMarketData,
  competitors: mockCompetitors,
  customers: mockCustomers,
  qualityIssues: mockQualityIssues,
  documents: mockDocuments,

  switchUser: (userId) => set((state) => {
    const user = state.users.find(u => u.id === userId);
    return user ? { currentUser: user } : state;
  }),

  addUser: (userData) => set((state) => ({
    users: [
      ...state.users,
      {
        ...userData,
        id: `user-${Date.now()}`,
        createdAt: new Date().toISOString()
      }
    ]
  })),

  updateUser: (id, updates) => set((state) => ({
    users: state.users.map((u) =>
      u.id === id ? { ...u, ...updates } : u
    ),
    currentUser: state.currentUser.id === id 
      ? { ...state.currentUser, ...updates } 
      : state.currentUser
  })),

  toggleUserActive: (id) => set((state) => {
    const user = state.users.find(u => u.id === id);
    if (!user) return state;
    
    const updatedUsers = state.users.map(u => 
      u.id === id ? { ...u, isActive: !u.isActive } : u
    );
    
    return {
      users: updatedUsers,
      currentUser: state.currentUser.id === id 
        ? { ...state.currentUser, isActive: !state.currentUser.isActive }
        : state.currentUser
    };
  }),

  setUser: (user) => set({ currentUser: user }),

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product]
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      )
    })),

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project]
    })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      )
    })),

  addQualityIssue: (issue) =>
    set((state) => ({
      qualityIssues: [...state.qualityIssues, issue]
    })),

  updateQualityIssue: (id, updates) =>
    set((state) => ({
      qualityIssues: state.qualityIssues.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      )
    })),

  hasPermission: (permission) => {
    const state = get();
    const rolePerm = state.rolePermissions.find(r => r.role === state.currentUser.role);
    return rolePerm?.permissions[permission] ?? false;
  },

  getRoleName: (role) => {
    const state = get();
    const rolePerm = state.rolePermissions.find(r => r.role === role);
    return rolePerm?.name ?? role;
  }
}));
