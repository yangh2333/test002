import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'product' | 'project' | 'quality' | 'customer';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  type = 'product',
  size = 'md' 
}) => {
  const statusConfig: Record<string, Record<string, { label: string; color: string }>> = {
    product: {
      planning: { label: '规划中', color: 'bg-yellow-100 text-yellow-800' },
      developing: { label: '研发中', color: 'bg-blue-100 text-blue-800' },
      mass_production: { label: '量产中', color: 'bg-green-100 text-green-800' },
      eol: { label: '已停产', color: 'bg-gray-100 text-gray-800' }
    },
    project: {
      todo: { label: '待开始', color: 'bg-gray-100 text-gray-800' },
      in_progress: { label: '进行中', color: 'bg-blue-100 text-blue-800' },
      done: { label: '已完成', color: 'bg-green-100 text-green-800' }
    },
    quality: {
      open: { label: '已开启', color: 'bg-red-100 text-red-800' },
      in_progress: { label: '处理中', color: 'bg-yellow-100 text-yellow-800' },
      resolved: { label: '已解决', color: 'bg-green-100 text-green-800' },
      closed: { label: '已关闭', color: 'bg-gray-100 text-gray-800' }
    },
    customer: {
      design_win: { label: 'Design Win', color: 'bg-green-100 text-green-800' },
      design_in: { label: 'Design In', color: 'bg-blue-100 text-blue-800' },
      pending: { label: 'Pending', color: 'bg-gray-100 text-gray-800' }
    }
  };

  const config = statusConfig[type]?.[status] || { 
    label: status, 
    color: 'bg-gray-100 text-gray-800' 
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClasses} ${config.color}`}>
      {config.label}
    </span>
  );
};
