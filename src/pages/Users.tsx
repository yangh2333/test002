import React, { useState } from 'react';
import { Users as UsersIcon, UserPlus, Edit, Eye, EyeOff, Shield, Mail, Phone, Building } from 'lucide-react';
import { useAppStore } from '../store';
import { UserRole, User } from '../types';

interface AddEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

const AddEditUserModal: React.FC<AddEditUserModalProps> = ({ isOpen, onClose, user }) => {
  const { addUser, updateUser, rolePermissions } = useAppStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'design_engineer' as UserRole,
    department: '',
    phone: '',
    isActive: true
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department || '',
        phone: user.phone || '',
        isActive: user.isActive
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser(user.id, formData);
    } else {
      addUser(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {user ? '编辑用户' : '添加用户'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]"
            >
              {rolePermissions.map(role => (
                <option key={role.role} value={role.role}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">部门</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-300 text-[#0F3460] focus:ring-[#0F3460]"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">账号激活</label>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#0F3460] text-white rounded-lg hover:bg-[#0F3460]/90"
            >
              {user ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Users: React.FC = () => {
  const { users, currentUser, rolePermissions, switchUser, toggleUserActive, hasPermission } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  const getRoleName = (role: UserRole) => {
    const rolePerm = rolePermissions.find(r => r.role === role);
    return rolePerm?.name ?? role;
  };

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  if (!hasPermission('userManagement')) {
    return (
      <div className="p-8 text-center">
        <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">无权限访问</h2>
        <p className="text-gray-600">您没有权限访问用户管理功能</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">用户管理</h1>
          <p className="text-gray-600">管理平台用户账号和角色权限</p>
        </div>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F3460] text-white rounded-lg hover:bg-[#0F3460]/90"
        >
          <UserPlus className="w-4 h-4" />
          添加用户
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">用户</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">角色</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">部门</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">联系方式</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">状态</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50 ${user.id === currentUser.id ? 'bg-blue-50' : ''}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {user.name}
                          {user.id === currentUser.id && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">当前用户</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {getRoleName(user.role)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {user.department || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {user.phone || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      user.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user.isActive ? '活跃' : '已禁用'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {user.id !== currentUser.id && (
                        <button
                          onClick={() => switchUser(user.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="切换用户"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="编辑用户"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleUserActive(user.id)}
                        className={`p-1.5 rounded-lg ${
                          user.isActive
                            ? 'text-orange-600 hover:bg-orange-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.isActive ? '禁用用户' : '启用用户'}
                      >
                        {user.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          角色权限说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rolePermissions.map(role => (
            <div key={role.role} className="p-4 border border-gray-200 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">{role.name}</div>
              <p className="text-sm text-gray-600 mb-3">{role.description}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(role.permissions).map(([perm, value]) => (
                  value && (
                    <span key={perm} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                      {
                        perm === 'dashboard' ? '仪表盘' :
                        perm === 'strategy' ? '战略规划' :
                        perm === 'execution' ? '执行交付' :
                        perm === 'sales' ? '商业销售' :
                        perm === 'quality' ? '质量风控' :
                        perm === 'team' ? '组织协作' :
                        perm === 'userManagement' ? '用户管理' : perm
                      }
                    </span>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddEditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
      />
    </div>
  );
};

export default Users;
