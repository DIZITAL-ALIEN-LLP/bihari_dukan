import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  indicator?: React.ReactNode;
  variant?: 'default' | 'success' | 'alert';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  indicator, 
  variant = 'default' 
}) => {
  const variantStyles = {
    default: 'bg-white border-slate-200',
    success: 'bg-white border-secondary/20 border-l-4 border-l-secondary',
    alert: 'bg-alert border-alert-foreground/10 border-l-4 border-l-alert-foreground',
  };

  return (
    <div className={`p-4 rounded-2xl border shadow-sm ${variantStyles[variant]}`}>
      <div className="flex flex-col gap-0 mb-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      {indicator && <div className="mt-2">{indicator}</div>}
    </div>
  );
};

export default MetricCard;
