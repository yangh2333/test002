import React, { useState } from 'react';
import { Briefcase, FileText, Cpu, Clock, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/common/StatusBadge';

const Execution: React.FC = () => {
  const products = useAppStore((state) => state.products);
  const projects = useAppStore((state) => state.projects);
  const documents = useAppStore((state) => state.documents);

  const [activeTab, setActiveTab] = useState<'projects' | 'documents' | 'ip'>('projects');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">执行与交付</h1>
        <p className="text-gray-600">项目管理、文档库与知识库</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'projects'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            项目管理
          </div>
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'documents'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            文档库
          </div>
        </button>
        <button
          onClick={() => setActiveTab('ip')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'ip'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            IP与知识库
          </div>
        </button>
      </div>

      {activeTab === 'projects' && (
        <div className="space-y-6">
          {projects.map((project) => {
            const progress = Math.round(
              project.tasks.reduce((acc, t) => acc + t.progress, 0) / project.tasks.length
            );
            return (
              <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-gray-600">{project.productName}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {project.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">时间周期</p>
                      <p className="font-medium text-gray-900">
                        {project.startDate} - {project.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">预算</p>
                      <p className="font-medium text-gray-900">¥{(project.budget / 10000).toFixed(0)}万</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">实际支出</p>
                      <p className="font-medium text-gray-900">¥{(project.actualCost / 10000).toFixed(0)}万</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">项目进度</span>
                    <span className="text-sm font-bold text-[#0F3460]">{progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0F3460] to-[#3498DB] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">任务分解</h4>
                  <div className="space-y-3">
                    {project.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {task.status === 'done' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : task.status === 'in_progress' ? (
                            <AlertCircle className="w-5 h-5 text-blue-500" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className="font-medium text-gray-900">{task.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">负责人: {task.assignee}</span>
                          <StatusBadge status={task.status} type="project" size="sm" />
                          <span className="text-sm font-medium text-[#0F3460]">{task.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">产品文档库</h2>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#0F3460]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#0F3460]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-500">
                      {doc.productName} · v{doc.version} · {doc.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doc.type === 'datasheet' ? 'bg-blue-100 text-blue-700' :
                    doc.type === 'app_note' ? 'bg-green-100 text-green-700' :
                    doc.type === 'test_report' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {doc.type === 'datasheet' && '规格书'}
                    {doc.type === 'app_note' && '应用笔记'}
                    {doc.type === 'test_report' && '测试报告'}
                    {doc.type === 'other' && '其他'}
                  </span>
                  <button className="px-4 py-2 bg-[#0F3460] text-white rounded-lg text-sm font-medium hover:bg-[#0F3460]/90 transition-colors">
                    查看
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ip' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">IP 与工艺知识库</h2>
          <div className="space-y-4">
            {products.filter((p) => p.platformId).map((product) => (
              <div key={product.id} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{product.platformName}</h4>
                    <p className="text-sm text-gray-600">用于: {product.name}</p>
                  </div>
                  <StatusBadge status={product.status} type="product" size="sm" />
                </div>
                <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    目标成本: ¥{product.targetCost}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    性能: {product.targetPerformance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Execution;
