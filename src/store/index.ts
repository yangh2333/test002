import { create } from 'zustand';
import {
  Product,
  Project,
  MarketData,
  Competitor,
  Customer,
  QualityIssue,
  Document,
  User
} from '../types';
import {
  mockUser,
  mockProducts,
  mockProjects,
  mockMarketData,
  mockCompetitors,
  mockCustomers,
  mockQualityIssues,
  mockDocuments
} from '../mock/data';

interface AppState {
  user: User | null;
  products: Product[];
  projects: Project[];
  marketData: MarketData[];
  competitors: Competitor[];
  customers: Customer[];
  qualityIssues: QualityIssue[];
  documents: Document[];
  setUser: (user: User) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addQualityIssue: (issue: QualityIssue) => void;
  updateQualityIssue: (id: string, updates: Partial<QualityIssue>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  products: mockProducts,
  projects: mockProjects,
  marketData: mockMarketData,
  competitors: mockCompetitors,
  customers: mockCustomers,
  qualityIssues: mockQualityIssues,
  documents: mockDocuments,

  setUser: (user) => set({ user }),

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
    }))
}));
