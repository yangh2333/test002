import React from 'react';
import {
  Cpu,
  Briefcase,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/common/StatusBadge';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{Math.abs(trend)}% vs last month</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const products = useAppStore((state) => state.products);
  const projects = useAppStore((state) => state.projects);
  const qualityIssues = useAppStore((state) => state.qualityIssues);
  const marketData = useAppStore((state) => state.marketData);

  const stats = {
    totalProducts: products.length,
    activeProjects: projects.filter((p) => p.status === '进行中').length,
    openIssues: qualityIssues.filter((q) => ['open', 'in_progress'].includes(q.status)).length,
    totalRevenue: marketData.length > 0 ? marketData[marketData.length - 1].som : 0
  };

  const recentProjects = projects.slice(0, 3);
  const activeIssues = qualityIssues.filter((q) => ['open', 'in_progress'].includes(q.status)).slice(0, 3);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">仪表盘</h1>
        <p className="text-gray-600">欢迎回来，这是您今天的产品概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="产品总数"
          value={stats.totalProducts}
          icon={Cpu}
          colorClass="bg-gradient-to-br from-[#0F3460] to-[#3498DB]"
        />
        <StatCard
          title="进行中项目"
          value={stats.activeProjects}
          icon={Briefcase}
          colorClass="bg-gradient-to-br from-[#1ABC9C] to-[#16A085]"
          trend={12}
        />
        <StatCard
          title="待处理问题"
          value={stats.openIssues}
          icon={AlertTriangle}
          colorClass="bg-gradient-to-br from-orange-500 to-red-500"
          trend={-8}
        />
        <StatCard
          title="预计收入"
          value={`¥${(stats.totalRevenue / 100000000).toFixed(1)}亿`}
          icon={TrendingUp}
          colorClass="bg-gradient-to-br from-purple-500 to-indigo-500"
          trend={25}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">市场规模预测</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketData}>
                <defs>
                  <linearGradient id="colorTam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F3460" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0F3460" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498DB" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3498DB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSom" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1ABC9C" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1ABC9C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(value) => `${value / 10000000000}B`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [`¥${(value / 100000000).toFixed(1)}亿`, '']}
                />
                <Area type="monotone" dataKey="tam" stroke="#0F3460" fillOpacity={1} fill="url(#colorTam)" name="TAM" />
                <Area type="monotone" dataKey="sam" stroke="#3498DB" fillOpacity={1} fill="url(#colorSam)" name="SAM" />
                <Area type="monotone" dataKey="som" stroke="#1ABC9C" fillOpacity={1} fill="url(#colorSom)" name="SOM" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">产品状态分布</h2>
          <div className="space-y-4">
            {['planning', 'developing', 'mass_production', 'eol'].map((status) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusBadge status={status} type="product" />
                  <span className="text-sm text-gray-600">
                    {status === 'planning' && '规划中'}
                    {status === 'developing' && '研发中'}
                    {status === 'mass_production' && '量产中'}
                    {status === 'eol' && '已停产'}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {products.filter((p) => p.status === status).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">近期项目</h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{project.productName}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{project.startDate} - {project.endDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">进度</span>
                    <span className="text-gray-900 font-medium">
                      {Math.round(
                        project.tasks.reduce((acc, t) => acc + t.progress, 0) / project.tasks.length
                      )}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0F3460] to-[#3498DB] rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round(
                          project.tasks.reduce((acc, t) => acc + t.progress, 0) / project.tasks.length
                        )}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">活跃质量问题</h2>
          <div className="space-y-4">
            {activeIssues.length > 0 ? (
              activeIssues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{issue.title}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            issue.severity === 'critical'
                              ? 'bg-red-100 text-red-700'
                              : issue.severity === 'high'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {issue.severity === 'critical' && '严重'}
                          {issue.severity === 'high' && '高'}
                          {issue.severity === 'medium' && '中'}
                          {issue.severity === 'low' && '低'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{issue.productName}</p>
                    </div>
                    <StatusBadge status={issue.status} type="quality" size="sm" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">暂无活跃质量问题</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
