'use client';

import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, HTMLAttributes } from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// AdminCard Component
interface AdminCardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function AdminCard({ 
  title, 
  description, 
  action, 
  children, 
  className,
  padding = 'md'
}: AdminCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div 
      className={cn(
        'bg-admin-surface rounded-admin-md border border-admin-border shadow-admin',
        'admin-card-hover',
        paddingClasses[padding],
        className
      )}
    >
      {(title || description || action) && (
        <div className="flex items-start justify-between mb-4 pb-4 border-b border-admin-border">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-admin-text-primary">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-admin-text-secondary mt-1">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

// AdminButton Component
interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export function AdminButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: AdminButtonProps) {
  const variantClasses = {
    primary: 'bg-kaduna-navy text-white hover:bg-kaduna-navy-light focus:ring-kaduna-navy',
    secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-400',
    danger: 'bg-admin-error text-white hover:bg-admin-error-dark focus:ring-admin-error',
    ghost: 'bg-transparent text-admin-text-secondary hover:bg-admin-surface-hover focus:ring-admin-border-focus',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-admin',
        'transition-all admin-transition',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={18} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={18} />}
        </>
      )}
    </button>
  );
}

// AdminInput Component
interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export function AdminInput({
  label,
  error,
  helperText,
  icon: Icon,
  fullWidth = true,
  className,
  ...props
}: AdminInputProps) {
  return (
    <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-admin-text-primary">
          {label}
          {props.required && <span className="text-admin-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-2 border rounded-admin',
            'text-admin-text-primary placeholder-admin-text-muted',
            'bg-admin-surface',
            'transition-all admin-transition',
            'focus:outline-none focus:ring-2 focus:ring-kaduna-navy focus:border-kaduna-navy',
            'disabled:bg-admin-surface-hover disabled:cursor-not-allowed',
            error
              ? 'border-admin-error focus:ring-admin-error focus:border-admin-error'
              : 'border-admin-border hover:border-admin-border-hover',
            Icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-admin-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-admin-text-muted">{helperText}</p>
      )}
    </div>
  );
}

// AdminSelect Component
interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
}

export function AdminSelect({
  label,
  error,
  helperText,
  options,
  fullWidth = true,
  className,
  ...props
}: AdminSelectProps) {
  return (
    <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-admin-text-primary">
          {label}
          {props.required && <span className="text-admin-error ml-1">*</span>}
        </label>
      )}
      <select
        className={cn(
          'w-full px-4 py-2 border rounded-admin',
          'text-admin-text-primary',
          'bg-admin-surface',
          'transition-all admin-transition',
          'focus:outline-none focus:ring-2 focus:ring-kaduna-navy focus:border-kaduna-navy',
          'disabled:bg-admin-surface-hover disabled:cursor-not-allowed',
          error
            ? 'border-admin-error focus:ring-admin-error focus:border-admin-error'
            : 'border-admin-border hover:border-admin-border-hover',
          className
        )}
        {...props}
      >
        {props.placeholder && (
          <option value="" disabled>
            {props.placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-admin-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-admin-text-muted">{helperText}</p>
      )}
    </div>
  );
}

// AdminTable Component
interface AdminTableProps {
  headers: Array<{ key: string; label: string; className?: string }>;
  data: Array<Record<string, ReactNode>>;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function AdminTable({ 
  headers, 
  data, 
  loading = false, 
  emptyMessage = 'No data available',
  className 
}: AdminTableProps) {
  if (loading) {
    return (
      <div className="bg-admin-surface rounded-admin-md border border-admin-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-admin-surface-hover">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className={cn(
                      'px-4 py-3 text-left font-medium text-admin-text-secondary',
                      header.className
                    )}
                  >
                    <div className="h-4 admin-skeleton rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {headers.map((header) => (
                    <td key={header.key} className="px-4 py-3">
                      <div className="h-4 admin-skeleton rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-admin-surface rounded-admin-md border border-admin-border p-12 text-center">
        <p className="text-admin-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-admin-surface rounded-admin-md border border-admin-border overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-admin-surface-hover">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className={cn(
                    'px-4 py-3 text-left font-medium text-admin-text-secondary',
                    header.className
                  )}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border">
            {data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-admin-surface-hover transition-colors admin-transition"
              >
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className={cn(
                      'px-4 py-3 text-admin-text-primary',
                      header.className
                    )}
                  >
                    {row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// AdminBadge Component
interface AdminBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md';
}

export function AdminBadge({ 
  variant = 'default', 
  size = 'md',
  children,
  className,
  ...props 
}: AdminBadgeProps) {
  const variantClasses = {
    success: 'bg-admin-success-light text-admin-success-dark',
    warning: 'bg-admin-warning-light text-admin-warning-dark',
    error: 'bg-admin-error-light text-admin-error-dark',
    info: 'bg-admin-info-light text-admin-info-dark',
    default: 'bg-admin-surface-hover text-admin-text-secondary',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// AdminEmptyState Component
interface AdminEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function AdminEmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && (
        <div className="mb-4 p-3 rounded-full bg-admin-surface-hover">
          <Icon size={32} className="text-admin-text-muted" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-admin-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-admin-text-secondary max-w-md mb-4">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

// AdminPageHeader Component
interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function AdminPageHeader({ 
  title, 
  description, 
  action,
  breadcrumbs 
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 animate-admin-fade-in">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4 flex items-center gap-2 text-sm text-admin-text-muted">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-admin-text-primary transition-colors admin-transition"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className={index === breadcrumbs.length - 1 ? 'text-admin-text-primary' : ''}>
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-admin-text-primary">{title}</h1>
          {description && (
            <p className="text-sm text-admin-text-secondary mt-1">{description}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}

