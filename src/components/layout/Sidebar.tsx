import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Users,
  ShieldCheck,
  Building2,
  Cpu
} from 'lucide-react';
import { useAppStore } from '../../store';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-[#0F3460] text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const Sidebar: React.FC = () => {
  const user = useAppStore((state) => state.user);

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0F3460] to-[#3498DB] rounded-lg flex items-center justify-center">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ChipFlow</h1>
            <p className="text-xs text-gray-500">芯片全生命周期管理</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            主菜单
          </p>
          <NavItem to="/" icon={<LayoutDashboard className="w-5 h-5" />} label="仪表盘" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            战略与规划
          </p>
          <NavItem to="/strategy" icon={<TrendingUp className="w-5 h-5" />} label="市场与路线图" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            执行与交付
          </p>
          <NavItem to="/execution" icon={<Briefcase className="w-5 h-5" />} label="项目与文档" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            商业与销售
          </p>
          <NavItem to="/sales" icon={<Building2 className="w-5 h-5" />} label="客户与销售" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            质量与风控
          </p>
          <NavItem to="/quality" icon={<ShieldCheck className="w-5 h-5" />} label="质量与追溯" />
        </div>

        <div>
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            组织与协作
          </p>
          <NavItem to="/team" icon={<Users className="w-5 h-5" />} label="团队与KPI" />
        </div>
      </nav>

      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
