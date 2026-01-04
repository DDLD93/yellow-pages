import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import { verifySession } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  const isAuthenticated = session !== null;

  // If not authenticated, render children without sidebar/header
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-admin-bg">
        {children}
      </div>
    );
  }

  // If authenticated, render with sidebar and header
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

