'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getAllBusinesses(page = 1, limit = 10, search = '') {
  const skip = (page - 1) * limit;
  const where: any = {};

  if (search) {
    where.OR = [
      { businessName: { contains: search, mode: 'insensitive' } },
      { businessRegCatType: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [businesses, total] = await Promise.all([
    db.business.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    db.business.count({ where }),
  ]);

  return { businesses, total, totalPages: Math.ceil(total / limit) };
}

export async function getBusinessById(id: string) {
  return db.business.findUnique({
    where: { id },
  });
}

export async function updateBusiness(id: string, data: any) {
  try {
    await db.business.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/businesses');
    revalidatePath('/admin/businesses/[id]');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update business' };
  }
}

export async function deleteBusiness(id: string) {
  try {
    await db.business.delete({
      where: { id },
    });
    revalidatePath('/admin/businesses');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete business' };
  }
}

export async function createBusiness(data: any) {
    try {
        await db.business.create({
            data,
        });
        revalidatePath('/admin/businesses');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to create business' };
    }
}

