import React, { useState } from 'react';
import {
  TrendingUp,
  MapPin,
  BarChart3,
  Calendar,
  Target,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/common/StatusBadge';

const Strategy: React.FC = () => {
  const products = useAppStore((state) => state.products);
  const marketData = useAppStore((state) => state.marketData);
  const competitors = useAppStore((state) => state.competitors);

  const [activeTab, setActiveTab] = useState<'market' | 'roadmap'>('market');

  const roadmapData = [
    { year: 2024, products: ['A100 - 量产'] },
    { year: 2025, products: ['PM50 - 量产', 'W200 - 研发'] },
    { year: 2026, products: ['W200 - 量产', 'A300 - 研发'] },
    { year: 2027, products: ['A300 - 量产'] }
  ];

  const COLORS = ['#0F3460', '#3498DB', '#1ABC9C', '#F39C12'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">战略与规划</h1>
        <p className="text-gray-600">市场分析、产品路线图与战略决策</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('market')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'market'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            市场分析
          </div>
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'roadmap'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            产品路线图
          </div>
        </button>
      </div>

      {activeTab === 'market' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">TAM / SAM / SOM 分析</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="year" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" tickFormatter={(value) => `${value / 10000000000}B`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value: number) => [`¥${(value / 100000000).toFixed(1)}亿`, '']}
                  />
                  <Bar dataKey="tam" name="TAM" radius={[8, 8, 0, 0]}>
                    {marketData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                  <Bar dataKey="sam" name="SAM" radius={[8, 8, 0, 0]}>
                    {marketData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                    ))}
                  </Bar>
                  <Bar dataKey="som" name="SOM" radius={[8, 8, 0, 0]}>
                    {marketData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }} />
                <span className="text-sm text-gray-600">TAM - 总体市场</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }} />
                <span className="text-sm text-gray-600">SAM - 可服务市场</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[2] }} />
                <span className="text-sm text-gray-600">SOM - 可获得市场</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">竞争对手分析</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">公司</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">产品型号</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">价格</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">市场份额</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">性能指标</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((competitor) => (
                    <tr key={competitor.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{competitor.name}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{competitor.productModel}</td>
                      <td className="py-4 px-4 text-gray-600">${competitor.price}</td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-[#0F3460]">{competitor.marketShare}%</span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {Object.entries(competitor.performance).map(([key, value]) => (
                          <span key={key} className="mr-3">
                            {key}: {value}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">产品路线图</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {roadmapData.map((item, index) => (
                <div key={item.year} className="relative flex gap-8">
                  <div className="w-16 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#0F3460] flex items-center justify-center text-white font-bold text-sm absolute left-6 z-10">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{item.year}</h3>
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.products.map((product, pIndex) => {
                        const foundProduct = products.find((p) => product.includes(p.name.split(' ')[0]));
                        return (
                          <div
                            key={pIndex}
                            className="p-4 rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">{product}</h4>
                                {foundProduct && (
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-500">{foundProduct.description}</p>
                                    <StatusBadge status={foundProduct.status} type="product" size="sm" />
                                  </div>
                                )}
                              </div>
                              <Target className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Strategy;
