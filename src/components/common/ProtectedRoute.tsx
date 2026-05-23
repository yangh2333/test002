import React from 'react';
import { Shield } from 'lucide-react';
import { useAppStore } from '../../store';
import { RolePermission } from '../../types';

interface ProtectedRouteProps {
  permission: keyof RolePermission['permissions'];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ permission, children }) => {
  const hasPermission = useAppStore((state) => state.hasPermission);

  if (!hasPermission(permission)) {
    return (
      <div className="p-8 text-center">
        <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">无权限访问</h2>
        <p className="text-gray-600">您没有权限访问此功能模块</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
