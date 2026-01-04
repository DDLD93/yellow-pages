'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { cn } from '@/lib/utils';

// Use CSS variables for chart colors (Kaduna brand colors)
const COLORS = [
  'var(--kaduna-emerald)',      // #0D7B5D
  'var(--kaduna-navy)',          // #0A2463
  'var(--kaduna-gold)',          // #D4A017
  '#8B5CF6',                     // Purple
  'var(--admin-error)',          // #EF4444
];

// Chart tooltip styling
const tooltipStyle = {
  backgroundColor: 'var(--admin-surface)',
  border: '1px solid var(--admin-border)',
  borderRadius: 'var(--admin-radius)',
  padding: '8px 12px',
  boxShadow: 'var(--admin-shadow-md)',
};

const cartesianGridStyle = {
  stroke: 'var(--admin-border)',
  strokeDasharray: '3 3',
};

interface ChartData {
  name: string;
  value: number;
}

interface BusinessStatusChartProps {
  data: ChartData[];
}

export function BusinessStatusChart({ data }: BusinessStatusChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" style={cartesianGridStyle} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: 'var(--admin-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--admin-border)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--admin-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--admin-border)' }}
        />
        <Tooltip 
          contentStyle={tooltipStyle}
          labelStyle={{ color: 'var(--admin-text-primary)', fontWeight: 600 }}
        />
        <Bar 
          dataKey="value" 
          fill="var(--kaduna-emerald)" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface CategoryChartProps {
  data: ChartData[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data.slice(0, 5)}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.slice(0, 5).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={tooltipStyle}
          labelStyle={{ color: 'var(--admin-text-primary)', fontWeight: 600 }}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface LGAChartProps {
  data: ChartData[];
}

export function LGAChart({ data }: LGAChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.slice(0, 10)}>
        <CartesianGrid strokeDasharray="3 3" style={cartesianGridStyle} />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          height={100}
          tick={{ fill: 'var(--admin-text-secondary)', fontSize: 11 }}
          axisLine={{ stroke: 'var(--admin-border)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--admin-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--admin-border)' }}
        />
        <Tooltip 
          contentStyle={tooltipStyle}
          labelStyle={{ color: 'var(--admin-text-primary)', fontWeight: 600 }}
        />
        <Bar 
          dataKey="value" 
          fill="var(--kaduna-navy)" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface SearchBarChartProps {
  data: ChartData[];
  color?: string;
}

export function SearchBarChart({ data, color = 'var(--kaduna-navy)' }: SearchBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" style={cartesianGridStyle} />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          height={100}
          tick={{ fill: 'var(--admin-text-secondary)', fontSize: 11 }}
          axisLine={{ stroke: 'var(--admin-border)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--admin-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--admin-border)' }}
        />
        <Tooltip 
          contentStyle={tooltipStyle}
          labelStyle={{ color: 'var(--admin-text-primary)', fontWeight: 600 }}
        />
        <Bar 
          dataKey="value" 
          fill={color} 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface LineChartData {
  date: string;
  count: number;
}

interface TrendLineChartProps {
  data: LineChartData[];
  color?: string;
  name?: string;
}

export function TrendLineChart({ data, color = 'var(--kaduna-emerald)', name = 'Count' }: TrendLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" style={cartesianGridStyle} />
        <XAxis 
          dataKey="date" 
          tick={{ fill: 'var(--admin-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--admin-border)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--admin-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--admin-border)' }}
        />
        <Tooltip 
          contentStyle={tooltipStyle}
          labelStyle={{ color: 'var(--admin-text-primary)', fontWeight: 600 }}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '10px' }}
          iconType="line"
        />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke={color} 
          strokeWidth={2.5}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6 }}
          name={name} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

