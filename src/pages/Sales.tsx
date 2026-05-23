import React, { useState } from 'react';
import { Building2, TrendingUp, DollarSign, Users, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/common/StatusBadge';

const salesData = [
  { month: '1月', revenue: 800, profit: 240 },
  { month: '2月', revenue: 950, profit: 285 },
  { month: '3月', revenue: 1200, profit: 360 },
  { month: '4月', revenue: 1100, profit: 330 },
  { month: '5月', revenue: 1400, profit: 420 },
  { month: '6月', revenue: 1600, profit: 480 }
];

const Sales: React.FC = () => {
  const customers = useAppStore((state) => state.customers);
  const products = useAppStore((state) => state.products);

  const [activeTab, setActiveTab] = useState<'customers' | 'analytics'>('customers');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">商业与销售</h1>
        <p className="text-gray-600">客户管理、销售分析与定价策略</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('customers')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'customers'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            客户管理
          </div>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'analytics'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            销售分析
          </div>
        </button>
      </div>

      {activeTab === 'customers' && (
        <div className="space-y-6">
          {customers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3460] to-[#3498DB] rounded-lg flex items-center justify-center text-white text-xl font-bold">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-gray-600">区域: {customer.region}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">客户项目</h4>
                <div className="space-y-3">
                  {customer.projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {project.status === 'design_win' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : project.status === 'design_in' ? (
                          <Clock className="w-5 h-5 text-blue-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                        <span className="font-medium text-gray-900">{project.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={project.status} type="customer" size="sm" />
                        <span className="font-semibold text-[#0F3460]">
                          ¥{(project.forecastRevenue / 10000).toFixed(0)}万
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">销售趋势</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F3460" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#0F3460" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1ABC9C" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#1ABC9C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value: number) => [`¥${value}万`, '']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#0F3460" fillOpacity={1} fill="url(#colorRevenue)" name="收入" />
                  <Area type="monotone" dataKey="profit" stroke="#1ABC9C" fillOpacity={1} fill="url(#colorProfit)" name="利润" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">总收入</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-[#0F3460]">¥6,850万</p>
              <p className="text-sm text-green-600 mt-2">+25% 同比增长</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">总利润</h3>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-[#1ABC9C]">¥2,055万</p>
              <p className="text-sm text-green-600 mt-2">+30% 同比增长</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">活跃客户</h3>
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-[#3498DB]">{customers.length}</p>
              <p className="text-sm text-green-600 mt-2">+2 新增</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">产品定价</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">产品</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">型号</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">1K价格</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">10K价格</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">目标成本</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">毛利率</th>
                  </tr>
                </thead>
                <tbody>
                  {products.filter(p => p.status !== 'eol').map((product) => {
                    const price1k = product.targetCost * 2.5;
                    const price10k = product.targetCost * 2.0;
                    const margin = ((price1k - product.targetCost) / price1k * 100).toFixed(0);
                    return (
                      <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-medium text-gray-900">{product.name}</td>
                        <td className="py-4 px-4 text-gray-600">{product.code}</td>
                        <td className="py-4 px-4 text-gray-600">${price1k.toFixed(2)}</td>
                        <td className="py-4 px-4 text-gray-600">${price10k.toFixed(2)}</td>
                        <td className="py-4 px-4 text-gray-600">${product.targetCost.toFixed(2)}</td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-green-600">{margin}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
