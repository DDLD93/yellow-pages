'use client';

import { logout } from '@/actions/admin-auth';
import { LogOut, ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function AdminHeader() {
  const pathname = usePathname();
  
  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Admin', href: '/admin' }];
    
    let currentPath = '/admin';
    parts.forEach((part, index) => {
      if (part !== 'admin') {
        currentPath += `/${part}`;
        const label = part
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        breadcrumbs.push({
          label,
          href: index === parts.length - 1 ? undefined : currentPath,
        });
      }
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const currentPage = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard';

  return (
    <header className="h-16 bg-admin-surface border-b border-admin-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-admin-sm backdrop-blur-sm bg-admin-surface/95">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-admin-text-muted min-w-0">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2 min-w-0">
              {index > 0 && (
                <ChevronRight size={14} className="flex-shrink-0 text-admin-text-muted" />
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-admin-text-primary transition-colors admin-transition truncate"
                >
                  {index === 0 ? (
                    <Home size={16} className="flex-shrink-0" />
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </Link>
              ) : (
                <span className={cn(
                  'font-medium truncate',
                  index === breadcrumbs.length - 1 ? 'text-admin-text-primary' : 'text-admin-text-secondary'
                )}>
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
        
        {/* Mobile Title */}
        <h1 className="text-lg md:text-xl font-semibold text-admin-text-primary md:hidden truncate">
          {currentPage}
        </h1>
        
        {/* Desktop Title */}
        <h1 className="hidden md:block text-xl font-semibold text-admin-text-primary">
          {currentPage}
        </h1>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <form action={logout}>
          <button 
            type="submit"
            className={cn(
              'flex items-center gap-2 text-sm font-medium',
              'text-admin-text-secondary hover:text-admin-error',
              'px-3 py-1.5 rounded-admin',
              'hover:bg-admin-error-light transition-all admin-transition',
              'focus:outline-none focus:ring-2 focus:ring-admin-error focus:ring-offset-2'
            )}
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </form>
      </div>
    </header>
  );
}

