import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, Clock, FileText, Search } from 'lucide-react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/common/StatusBadge';

const Quality: React.FC = () => {
  const qualityIssues = useAppStore((state) => state.qualityIssues);
  const products = useAppStore((state) => state.products);

  const [activeTab, setActiveTab] = useState<'issues' | 'reports'>('issues');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '严重';
      case 'high':
        return '高';
      case 'medium':
        return '中';
      default:
        return '低';
    }
  };

  const fitData = [
    { temperature: 25, failureRate: 0.5 },
    { temperature: 45, failureRate: 0.8 },
    { temperature: 65, failureRate: 1.2 },
    { temperature: 85, failureRate: 1.8 },
    { temperature: 105, failureRate: 2.5 },
    { temperature: 125, failureRate: 3.5 }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">质量与风控</h1>
        <p className="text-gray-600">质量跟踪、问题追溯与可靠性分析</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">总问题数</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{qualityIssues.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">活跃问题</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {qualityIssues.filter(q => ['open', 'in_progress'].includes(q.status)).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">已解决</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {qualityIssues.filter(q => ['resolved', 'closed'].includes(q.status)).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">FIT率</h3>
            <ShieldCheck className="w-5 h-5 text-[#0F3460]" />
          </div>
          <p className="text-3xl font-bold text-[#0F3460]">12.5</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('issues')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'issues'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            问题追溯
          </div>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'reports'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            可靠性报告
          </div>
        </button>
      </div>

      {activeTab === 'issues' && (
        <div className="space-y-6">
          {qualityIssues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{issue.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(issue.severity)}`}>
                      {getSeverityLabel(issue.severity)}
                    </span>
                  </div>
                  <p className="text-gray-600">{issue.productName}</p>
                </div>
                <StatusBadge status={issue.status} type="quality" />
              </div>

              <p className="text-gray-700 mb-6">{issue.description}</p>

              {issue.lotNumber && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  {issue.lotNumber && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">批次号</p>
                      <p className="font-medium text-gray-900">{issue.lotNumber}</p>
                    </div>
                  )}
                  {issue.waferLot && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">晶圆批次</p>
                      <p className="font-medium text-gray-900">{issue.waferLot}</p>
                    </div>
                  )}
                  {issue.packageLot && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">封装批次</p>
                      <p className="font-medium text-gray-900">{issue.packageLot}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-[#0F3460] text-white rounded-lg text-sm font-medium hover:bg-[#0F3460]/90 transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  查看详情
                </button>
                <p className="text-sm text-gray-500">创建于: {issue.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">可靠性测试报告</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">HTOL 测试</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• 测试温度: 125°C</p>
                  <p>• 测试时长: 1000小时</p>
                  <p>• 样品数: 77/77 通过</p>
                  <p>• 失效率: 0 FIT</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">通过</span>
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">ESD 测试</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• HBM: ±2000V</p>
                  <p>• MM: ±200V</p>
                  <p>• CDM: ±500V</p>
                  <p>• 样品数: 30/30 通过</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">通过</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">质量文档</h2>
            <div className="space-y-4">
              {[
                { name: 'AEC-Q100 认证报告', date: '2024-01-15', status: '通过' },
                { name: 'ISO 9001 合规文档', date: '2023-12-20', status: '有效' },
                { name: 'FMEA 失效模式分析', date: '2024-03-10', status: '最新' },
                { name: 'PCN 产品变更通知', date: '2024-05-05', status: '待审批' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#0F3460]/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#0F3460]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">{doc.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doc.status === '通过' || doc.status === '有效' || doc.status === '最新'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quality;
