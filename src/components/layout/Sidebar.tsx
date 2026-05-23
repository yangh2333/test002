import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Users,
  ShieldCheck,
  Building2,
  Cpu,
  UserCog,
  ChevronDown
} from 'lucide-react';
import { useAppStore } from '../../store';
import { RolePermission } from '../../types';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  permission?: keyof RolePermission['permissions'];
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, permission }) => {
  const hasPermission = useAppStore((state) => state.hasPermission);
  
  if (permission && !hasPermission(permission)) {
    return null;
  }

  return (
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
};

export const Sidebar: React.FC = () => {
  const { currentUser, users, switchUser, getRoleName, hasPermission } = useAppStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            主菜单
          </p>
          <NavItem to="/" icon={<LayoutDashboard className="w-5 h-5" />} label="仪表盘" permission="dashboard" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            战略与规划
          </p>
          <NavItem to="/strategy" icon={<TrendingUp className="w-5 h-5" />} label="市场与路线图" permission="strategy" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            执行与交付
          </p>
          <NavItem to="/execution" icon={<Briefcase className="w-5 h-5" />} label="项目与文档" permission="execution" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            商业与销售
          </p>
          <NavItem to="/sales" icon={<Building2 className="w-5 h-5" />} label="客户与销售" permission="sales" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            质量与风控
          </p>
          <NavItem to="/quality" icon={<ShieldCheck className="w-5 h-5" />} label="质量与追溯" permission="quality" />
        </div>

        <div className="mb-6">
          <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            组织与协作
          </p>
          <NavItem to="/team" icon={<Users className="w-5 h-5" />} label="团队与KPI" permission="team" />
        </div>

        {hasPermission('userManagement') && (
          <div>
            <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              系统管理
            </p>
            <NavItem to="/users" icon={<UserCog className="w-5 h-5" />} label="用户管理" permission="userManagement" />
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-gray-200 relative">
        <div
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full bg-gray-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-500 truncate">{getRoleName(currentUser.role)}</p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isUserMenuOpen && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
            <div className="p-2">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                切换用户
              </p>
              {users.filter(u => u.isActive).map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    switchUser(user.id);
                    setIsUserMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    user.id === currentUser.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{getRoleName(user.role)}</p>
                  </div>
                  {user.id === currentUser.id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
