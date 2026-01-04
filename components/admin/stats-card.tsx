'use client';

import { LucideIcon } from 'lucide-react';
import { 
  Store, 
  CheckCircle, 
  MapPin, 
  Tag, 
  Search, 
  Calendar, 
  TrendingUp, 
  BarChart as BarChartIcon,
  Target,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Store,
  CheckCircle,
  MapPin,
  Tag,
  Search,
  Calendar,
  TrendingUp,
  BarChart: BarChartIcon,
  Target,
  AlertCircle,
  DollarSign,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-admin-info-light', text: 'text-admin-info-dark' },
  green: { bg: 'bg-admin-success-light', text: 'text-admin-success-dark' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  orange: { bg: 'bg-admin-warning-light', text: 'text-admin-warning-dark' },
  red: { bg: 'bg-admin-error-light', text: 'text-admin-error-dark' },
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const Icon = iconMap[icon] || Store;
  const colorClasses = colorMap[color] || colorMap.blue;

  return (
    <div className={cn(
      'bg-admin-surface p-6 rounded-admin-md border border-admin-border shadow-admin',
      'admin-card-hover animate-admin-fade-in'
    )}>
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-admin-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-admin-text-primary truncate">{value}</p>
        </div>
        <div className={cn(
          'p-3 rounded-admin flex-shrink-0 ml-4',
          colorClasses.bg,
          colorClasses.text
        )}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

