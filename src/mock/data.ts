import { 
  Product, Project, MarketData, Competitor, 
  Customer, QualityIssue, Document, User, UserRole, RolePermission 
} from '../types';

export const rolePermissions: RolePermission[] = [
  {
    role: 'product_manager',
    name: '产品线经理',
    description: '负责产品全生命周期管理',
    permissions: {
      dashboard: true,
      strategy: true,
      execution: true,
      sales: true,
      quality: true,
      team: true,
      userManagement: true,
    }
  },
  {
    role: 'design_engineer',
    name: '设计工程师',
    description: '负责芯片设计和IP开发',
    permissions: {
      dashboard: true,
      strategy: false,
      execution: true,
      sales: false,
      quality: true,
      team: true,
      userManagement: false,
    }
  },
  {
    role: 'application_engineer',
    name: '应用工程师',
    description: '负责产品应用和客户支持',
    permissions: {
      dashboard: true,
      strategy: true,
      execution: true,
      sales: true,
      quality: true,
      team: true,
      userManagement: false,
    }
  },
  {
    role: 'qa_engineer',
    name: '质量工程师',
    description: '负责产品质量和可靠性验证',
    permissions: {
      dashboard: true,
      strategy: false,
      execution: true,
      sales: false,
      quality: true,
      team: true,
      userManagement: false,
    }
  },
  {
    role: 'sales',
    name: '销售',
    description: '负责产品销售和客户关系管理',
    permissions: {
      dashboard: true,
      strategy: true,
      execution: false,
      sales: true,
      quality: false,
      team: true,
      userManagement: false,
    }
  },
  {
    role: 'admin',
    name: '管理员',
    description: '系统管理员，拥有全部权限',
    permissions: {
      dashboard: true,
      strategy: true,
      execution: true,
      sales: true,
      quality: true,
      team: true,
      userManagement: true,
    }
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: '张明',
    email: 'zhangming@chiptech.com',
    role: 'product_manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    department: '产品部',
    phone: '13800138001',
    createdAt: '2023-01-01',
    isActive: true
  },
  {
    id: '2',
    name: '李工',
    email: 'ligong@chiptech.com',
    role: 'design_engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    department: '研发部',
    phone: '13800138002',
    createdAt: '2023-02-15',
    isActive: true
  },
  {
    id: '3',
    name: '王工',
    email: 'wanggong@chiptech.com',
    role: 'application_engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lilly',
    department: '应用部',
    phone: '13800138003',
    createdAt: '2023-03-20',
    isActive: true
  },
  {
    id: '4',
    name: '赵工',
    email: 'zhaogong@chiptech.com',
    role: 'qa_engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella',
    department: '质量部',
    phone: '13800138004',
    createdAt: '2023-04-10',
    isActive: true
  },
  {
    id: '5',
    name: '陈经理',
    email: 'chenjingli@chiptech.com',
    role: 'sales',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    department: '销售部',
    phone: '13800138005',
    createdAt: '2023-05-05',
    isActive: true
  },
  {
    id: '6',
    name: '系统管理员',
    email: 'admin@chiptech.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    department: 'IT部',
    phone: '13800138000',
    createdAt: '2022-12-01',
    isActive: true
  }
];

export const mockCurrentUser: User = mockUsers[0];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'AIoT主控芯片 A100',
    code: 'CT-A100',
    status: 'mass_production',
    platformId: 'plat1',
    platformName: 'Tegra平台',
    description: '高性能AIoT主控芯片，适用于智能设备和边缘计算',
    targetCost: 15,
    targetPerformance: '1.2GHz四核，NPU 2TOPS',
    launchDate: '2024-01-15',
    createdAt: '2023-01-01',
    updatedAt: '2024-06-01'
  },
  {
    id: 'p2',
    name: '电源管理芯片 PM50',
    code: 'CT-PM50',
    status: 'developing',
    platformId: 'plat2',
    platformName: 'PowerCore平台',
    description: '高效能电源管理芯片，支持快充和低功耗模式',
    targetCost: 3,
    targetPerformance: '95%效率，支持PD 3.1',
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01'
  },
  {
    id: 'p3',
    name: '无线连接芯片 W200',
    code: 'CT-W200',
    status: 'planning',
    platformId: 'plat3',
    platformName: 'ConnectX平台',
    description: '下一代WiFi 7 + BT 5.4双模连接芯片',
    targetCost: 5,
    targetPerformance: 'WiFi 7，BT 5.4，低功耗',
    createdAt: '2024-03-01',
    updatedAt: '2024-06-01'
  },
  {
    id: 'p4',
    name: '传感器信号处理芯片 S10',
    code: 'CT-S10',
    status: 'eol',
    platformId: 'plat1',
    platformName: 'Tegra平台',
    description: '通用传感器信号处理芯片（已停产）',
    targetCost: 2,
    targetPerformance: '16位ADC，低功耗',
    launchDate: '2021-06-01',
    createdAt: '2020-01-01',
    updatedAt: '2023-12-01'
  },
  {
    id: 'p5',
    name: '汽车级MCU A300',
    code: 'CT-A300',
    status: 'developing',
    platformId: 'plat4',
    platformName: 'AutoSafe平台',
    description: '符合AEC-Q100 Grade 1的车规级微控制器',
    targetCost: 20,
    targetPerformance: 'ARM Cortex-R5F，ISO 26262 ASIL-D',
    createdAt: '2023-06-01',
    updatedAt: '2024-06-01'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'A100量产优化项目',
    productId: 'p1',
    productName: 'AIoT主控芯片 A100',
    status: '进行中',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 5000000,
    actualCost: 2800000,
    tasks: [
      { id: 't1', name: '良率提升', assignee: '李工', status: 'done', startDate: '2024-01-01', endDate: '2024-03-31', progress: 100 },
      { id: 't2', name: '成本优化', assignee: '王工', status: 'in_progress', startDate: '2024-04-01', endDate: '2024-09-30', progress: 60 },
      { id: 't3', name: '客户技术支持', assignee: '张工', status: 'in_progress', startDate: '2024-01-01', endDate: '2024-12-31', progress: 40 }
    ]
  },
  {
    id: 'proj2',
    name: 'PM50流片项目',
    productId: 'p2',
    productName: '电源管理芯片 PM50',
    status: '进行中',
    startDate: '2024-02-01',
    endDate: '2024-10-31',
    budget: 3000000,
    actualCost: 1800000,
    tasks: [
      { id: 't4', name: '版图设计', assignee: '赵工', status: 'done', startDate: '2024-02-01', endDate: '2024-04-30', progress: 100 },
      { id: 't5', name: 'MPW流片', assignee: '钱工', status: 'in_progress', startDate: '2024-05-01', endDate: '2024-07-31', progress: 30 },
      { id: 't6', name: '样片测试', assignee: '孙工', status: 'todo', startDate: '2024-08-01', endDate: '2024-10-31', progress: 0 }
    ]
  },
  {
    id: 'proj3',
    name: 'A300定义与立项',
    productId: 'p5',
    productName: '汽车级MCU A300',
    status: '进行中',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    budget: 800000,
    actualCost: 650000,
    tasks: [
      { id: 't7', name: '市场调研', assignee: '周工', status: 'done', startDate: '2024-01-01', endDate: '2024-02-29', progress: 100 },
      { id: 't8', name: '规格定义', assignee: '吴工', status: 'done', startDate: '2024-03-01', endDate: '2024-04-30', progress: 100 },
      { id: 't9', name: '立项评审', assignee: '郑工', status: 'in_progress', startDate: '2024-05-01', endDate: '2024-06-30', progress: 75 }
    ]
  }
];

export const mockMarketData: MarketData[] = [
  { year: 2024, tam: 50000000000, sam: 15000000000, som: 500000000 },
  { year: 2025, tam: 58000000000, sam: 18000000000, som: 800000000 },
  { year: 2026, tam: 67000000000, sam: 22000000000, som: 1200000000 },
  { year: 2027, tam: 78000000000, sam: 26000000000, som: 1800000000 },
  { year: 2028, tam: 90000000000, sam: 32000000000, som: 2600000000 }
];

export const mockCompetitors: Competitor[] = [
  { id: 'c1', name: 'Qualcomm', productModel: 'QCS6490', price: 25, performance: { cpu: '2.0GHz', npu: '5TOPS' }, marketShare: 35 },
  { id: 'c2', name: 'MediaTek', productModel: 'MT8516', price: 12, performance: { cpu: '1.3GHz', npu: '0.5TOPS' }, marketShare: 25 },
  { id: 'c3', name: 'NXP', productModel: 'i.MX 8M', price: 20, performance: { cpu: '1.8GHz', npu: '2.3TOPS' }, marketShare: 15 },
  { id: 'c4', name: 'ST', productModel: 'STM32MP1', price: 18, performance: { cpu: '1.5GHz', npu: '1TOPS' }, marketShare: 10 },
  { id: 'c5', name: 'Rockchip', productModel: 'RK3588', price: 15, performance: { cpu: '2.4GHz', npu: '6TOPS' }, marketShare: 8 }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust1',
    name: '华为',
    region: '中国',
    projects: [
      { id: 'cp1', name: '智能家居中控项目', status: 'design_win', forecastRevenue: 8000000 },
      { id: 'cp2', name: '可穿戴设备项目', status: 'design_in', forecastRevenue: 3000000 }
    ]
  },
  {
    id: 'cust2',
    name: '小米',
    region: '中国',
    projects: [
      { id: 'cp3', name: '智能音箱项目', status: 'design_win', forecastRevenue: 12000000 },
      { id: 'cp4', name: '路由器项目', status: 'pending', forecastRevenue: 5000000 }
    ]
  },
  {
    id: 'cust3',
    name: '比亚迪',
    region: '中国',
    projects: [
      { id: 'cp5', name: '车载娱乐系统', status: 'design_in', forecastRevenue: 15000000 }
    ]
  },
  {
    id: 'cust4',
    name: 'Google',
    region: '美国',
    projects: [
      { id: 'cp6', name: 'Nest智能设备', status: 'pending', forecastRevenue: 20000000 }
    ]
  }
];

export const mockQualityIssues: QualityIssue[] = [
  {
    id: 'qi1',
    title: 'A100高温功耗异常',
    description: '在85°C环境下，部分芯片功耗超出规格20%',
    productId: 'p1',
    productName: 'AIoT主控芯片 A100',
    status: 'resolved',
    severity: 'high',
    lotNumber: 'L2405A',
    waferLot: 'W2405-12',
    packageLot: 'PK2406-03',
    createdAt: '2024-05-15'
  },
  {
    id: 'qi2',
    title: 'S10批量失效',
    description: '某批次芯片ADC精度漂移问题',
    productId: 'p4',
    productName: '传感器信号处理芯片 S10',
    status: 'closed',
    severity: 'critical',
    lotNumber: 'L2312B',
    createdAt: '2023-12-20'
  },
  {
    id: 'qi3',
    title: 'PM50样片测试异常',
    description: '部分样片在低压启动时出现不稳定现象',
    productId: 'p2',
    productName: '电源管理芯片 PM50',
    status: 'in_progress',
    severity: 'medium',
    createdAt: '2024-06-10'
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'doc1',
    title: 'A100 Datasheet v1.5',
    type: 'datasheet',
    version: '1.5',
    productId: 'p1',
    productName: 'AIoT主控芯片 A100',
    url: '#',
    createdAt: '2024-04-01'
  },
  {
    id: 'doc2',
    title: 'A100硬件设计参考',
    type: 'app_note',
    version: '1.2',
    productId: 'p1',
    productName: 'AIoT主控芯片 A100',
    url: '#',
    createdAt: '2024-03-15'
  },
  {
    id: 'doc3',
    title: 'A100可靠性测试报告',
    type: 'test_report',
    version: '1.0',
    productId: 'p1',
    productName: 'AIoT主控芯片 A100',
    url: '#',
    createdAt: '2024-02-28'
  },
  {
    id: 'doc4',
    title: 'PM50规格书 v0.8',
    type: 'datasheet',
    version: '0.8',
    productId: 'p2',
    productName: '电源管理芯片 PM50',
    url: '#',
    createdAt: '2024-05-20'
  }
];
