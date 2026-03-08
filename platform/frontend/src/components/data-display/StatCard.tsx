import type { LucideIcon } from 'lucide-react';
import { Card } from '../common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };
  variant?: 'default' | 'primary' | 'warning' | 'danger';
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}: StatCardProps) {
  const variantStyles = {
    default: 'border-navy-light/50',
    primary: 'border-blue-400/30 bg-gradient-to-br from-blue-900/20 to-blue-800/10',
    warning: 'border-yellow-400/30 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10',
    danger: 'border-red-400/30 bg-gradient-to-br from-red-900/20 to-red-800/10',
  };

  const getTrendColor = () => {
    if (!trend) return '';
    if (trend.direction === 'up') return 'text-red-600';
    if (trend.direction === 'down') return 'text-green-600';
    return 'text-gray-600';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.direction === 'up') return '↑';
    if (trend.direction === 'down') return '↓';
    return '→';
  };

  return (
    <Card
      variant="outlined"
      padding="md"
      className={`${variantStyles[variant]} transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground/70 mb-1">{title}</p>
          <p className="text-3xl font-bold text-saffron mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-foreground/60">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${getTrendColor()}`}>
              <span>{getTrendIcon()}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-xs text-foreground/60">vs last period</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="ml-4">
            <Icon className="w-8 h-8 text-saffron/60" />
          </div>
        )}
      </div>
    </Card>
  );
}
