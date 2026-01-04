'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Store, 
  FileText, 
  BarChart3, 
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Businesses', href: '/admin/businesses', icon: Store },
  { name: 'Registrations', href: '/admin/registrations', icon: FileText },
  { 
    name: 'Analytics', 
    icon: BarChart3,
    children: [
      { name: 'Business Stats', href: '/admin/analytics/business' },
      { name: 'Search Insights', href: '/admin/analytics/search' },
    ]
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Auto-expand parent items if child is active
  useEffect(() => {
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          child => pathname === child.href || pathname.startsWith(child.href + '/')
        );
        if (hasActiveChild && !expandedItems.includes(item.name)) {
          setExpandedItems([...expandedItems, item.name]);
        }
      }
    });
  }, [pathname]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isItemExpanded = (itemName: string) => expandedItems.includes(itemName);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    if (isMobileOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('aside') && !target.closest('button[aria-label="Toggle sidebar"]')) {
          setIsMobileOpen(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle sidebar"
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-admin-surface rounded-admin shadow-admin-md hover:shadow-admin-lg transition-all admin-transition"
      >
        {isMobileOpen ? <X size={20} className="text-admin-text-primary" /> : <Menu size={20} className="text-admin-text-primary" />}
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 animate-admin-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen bg-kaduna-navy text-white',
          'transition-all admin-transition-slow',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Toggle */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
            {isOpen ? (
              <span className="font-bold text-xl animate-admin-fade-in">KadConnect Admin</span>
            ) : (
              <span className="font-bold text-xl mx-auto">KC</span>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex p-1.5 rounded-admin-sm hover:bg-white/10 transition-colors admin-transition"
              aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <Menu size={18} className={cn('transition-transform admin-transition', !isOpen && 'rotate-180')} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = item.href 
                ? pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                : false;
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = hasChildren && isItemExpanded(item.name);
              const isChildActive = hasChildren && item.children?.some(
                child => pathname === child.href || pathname.startsWith(child.href + '/')
              );

              return (
                <div key={item.name}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        'flex items-center px-3 py-2.5 rounded-lg transition-all admin-transition group relative',
                        'hover:bg-white/10',
                        isActive && 'bg-kaduna-emerald text-white shadow-lg',
                        !isActive && 'text-slate-300 hover:text-white'
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full animate-admin-scale-in" />
                      )}
                      <item.icon className={cn(
                        'w-5 h-5 flex-shrink-0 transition-all admin-transition',
                        isOpen ? 'mr-3' : 'mx-auto'
                      )} />
                      <span className={cn(
                        'font-medium transition-all admin-transition',
                        isOpen ? 'block opacity-100' : 'hidden opacity-0'
                      )}>
                        {item.name}
                      </span>
                      
                      {/* Tooltip for collapsed mode */}
                      {!isOpen && (
                        <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-admin shadow-admin-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity admin-transition">
                          {item.name}
                          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
                        </div>
                      )}
                    </Link>
                  ) : (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className={cn(
                          'w-full flex items-center px-3 py-2 text-slate-400 font-medium text-xs uppercase tracking-wider',
                          'hover:text-white transition-colors admin-transition',
                          !isOpen && 'justify-center'
                        )}
                      >
                        <item.icon className={cn('w-4 h-4 flex-shrink-0', isOpen ? 'mr-2' : '')} />
                        {isOpen && (
                          <>
                            <span className="flex-1 text-left">{item.name}</span>
                            {isExpanded ? (
                              <ChevronDown size={14} className="transition-transform admin-transition" />
                            ) : (
                              <ChevronRight size={14} className="transition-transform admin-transition" />
                            )}
                          </>
                        )}
                      </button>
                      {isOpen && isExpanded && item.children?.map(child => {
                        const isChildActive = pathname === child.href || pathname.startsWith(child.href + '/');
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                              'flex items-center pl-10 pr-3 py-2 rounded-lg text-sm transition-all admin-transition relative',
                              isChildActive
                                ? 'text-kaduna-emerald bg-white/5 font-medium'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            )}
                          >
                            {isChildActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-kaduna-emerald rounded-r-full" />
                            )}
                            <span className="ml-2">{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-white/10">
            <div className={cn(
              'flex items-center transition-all admin-transition',
              isOpen ? 'gap-3' : 'justify-center'
            )}>
              <div className="w-10 h-10 rounded-full bg-kaduna-gold flex items-center justify-center text-kaduna-navy font-bold text-sm flex-shrink-0 shadow-admin-md">
                A
              </div>
              {isOpen && (
                <div className="overflow-hidden animate-admin-fade-in min-w-0">
                  <p className="text-sm font-medium truncate">Administrator</p>
                  <p className="text-xs text-slate-400 truncate">admin@kadconnect.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

