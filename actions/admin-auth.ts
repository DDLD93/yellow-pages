'use server';

import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return { error: 'Please enter both username and password.' };
  }

  if (username === adminUser && password === adminPass) {
    await createSession(username);
    redirect('/admin');
  }

  return { error: 'Invalid credentials.' };
}

export async function logout() {
  await deleteSession();
  redirect('/admin/login');
}

