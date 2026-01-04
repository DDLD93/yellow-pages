'use client';

import { useActionState } from 'react';
import { login } from '@/actions/admin-auth';
import { AdminInput, AdminButton, AdminCard } from '@/components/admin/ui';
import Logo from '@/components/logo';

export default function AdminLogin() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-admin-bg p-4">
      <div className="w-full max-w-md animate-admin-scale-in">
        <AdminCard padding="lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo variant="default" orientation="vertical" />
            </div>
            <h1 className="text-2xl font-bold text-admin-text-primary mt-4">Admin Login</h1>
            <p className="text-admin-text-secondary text-sm mt-2">Kaduna Business Connect Dashboard</p>
          </div>

          <form action={action} className="space-y-6">
            <AdminInput
              label="Username"
              name="username"
              type="text"
              required
              placeholder="Enter admin username"
            />

            <AdminInput
              label="Password"
              name="password"
              type="password"
              required
              placeholder="Enter admin password"
            />

            {state?.error && (
              <div className="p-3 text-sm text-admin-error bg-admin-error-light rounded-admin border border-admin-error/20">
                {state.error}
              </div>
            )}

            <AdminButton
              type="submit"
              disabled={isPending}
              loading={isPending}
              className="w-full"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </AdminButton>
          </form>
        </AdminCard>
      </div>
    </div>
  );
}

