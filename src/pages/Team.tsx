import React, { useState } from 'react';
import { Users, Calendar, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store';

const teamMembers = [
  { id: 1, name: '张明', role: '产品线经理', projects: 3, tasks: 15, onTimeRate: 92, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  { id: 2, name: '李工', role: '设计工程师', projects: 2, tasks: 22, onTimeRate: 88, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { id: 3, name: '王工', role: '应用工程师', projects: 2, tasks: 18, onTimeRate: 95, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lilly' },
  { id: 4, name: '赵工', role: '测试工程师', projects: 3, tasks: 25, onTimeRate: 90, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella' },
  { id: 5, name: '孙工', role: '质量工程师', projects: 2, tasks: 12, onTimeRate: 94, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
];

const meetingNotes = [
  { id: 1, date: '2024-06-15', title: 'A100 量产优化周会', items: ['良率提升至92%', '成本优化进度60%', '客户反馈处理中'], actionItems: ['张明跟进成本优化', '李工完成测试报告'] },
  { id: 2, date: '2024-06-08', title: 'PM50 项目评审会', items: ['版图设计完成', 'MPW准备就绪', 'ESD验证计划'], actionItems: ['赵工提交最终版图', '钱工安排流片'] },
  { id: 3, date: '2024-06-01', title: '月度产品规划会', items: ['Q3路线图确认', 'W200规格定义', 'A300立项准备'], actionItems: ['张明完成商业计划', '市场部更新竞品分析'] }
];

const Team: React.FC = () => {
  const projects = useAppStore((state) => state.projects);

  const [activeTab, setActiveTab] = useState<'members' | 'meetings' | 'kpis'>('members');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">组织与协作</h1>
        <p className="text-gray-600">团队管理、会议记录与KPI追踪</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">团队成员</h3>
            <Users className="w-5 h-5 text-[#0F3460]" />
          </div>
          <p className="text-3xl font-bold text-[#0F3460]">{teamMembers.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">活跃项目</h3>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">按时交付率</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">92%</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">本周任务</h3>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">28</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('members')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'members'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            团队成员
          </div>
        </button>
        <button
          onClick={() => setActiveTab('meetings')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'meetings'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            会议记录
          </div>
        </button>
        <button
          onClick={() => setActiveTab('kpis')}
          className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
            activeTab === 'kpis'
              ? 'border-[#0F3460] text-[#0F3460]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            绩效KPI
          </div>
        </button>
      </div>

      {activeTab === 'members' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full bg-gray-200"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">负责项目</span>
                    <span className="text-sm font-semibold text-[#0F3460]">{member.projects}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">进行中任务</span>
                    <span className="text-sm font-semibold text-[#0F3460]">{member.tasks}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">按时交付率</span>
                    <span className="text-sm font-semibold text-green-600">{member.onTimeRate}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${member.onTimeRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'meetings' && (
        <div className="space-y-6">
          {meetingNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{note.title}</h3>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    {note.date}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">讨论要点</h4>
                  <ul className="space-y-2">
                    {note.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#0F3460] rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">行动项</h4>
                  <ul className="space-y-2">
                    {note.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#0F3460] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">产品部KPI概览</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">项目交付KPI</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">按时交付率</span>
                      <span className="text-sm font-semibold text-green-600">92%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">预算控制</span>
                      <span className="text-sm font-semibold text-green-600">95%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">质量KPI</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">客户投诉率</span>
                      <span className="text-sm font-semibold text-green-600">0.5%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">良率达成</span>
                      <span className="text-sm font-semibold text-green-600">92%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">业务成果</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Design Win</h4>
                <p className="text-3xl font-bold text-[#0F3460]">8</p>
                <p className="text-sm text-green-600 mt-2">+3 本季度</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">量产产品数</h4>
                <p className="text-3xl font-bold text-[#1ABC9C]">5</p>
                <p className="text-sm text-green-600 mt-2">+1 本季度</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">客户满意度</h4>
                <p className="text-3xl font-bold text-[#3498DB]">4.6</p>
                <p className="text-sm text-green-600 mt-2">+0.2 vs 上季度</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
