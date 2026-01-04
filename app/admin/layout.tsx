import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-admin-bg">
      <AdminSidebar />
      
      <div className="lg:pl-64 transition-all admin-transition-slow">
        <AdminHeader />
        <main className="p-4 lg:p-6 animate-admin-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}

