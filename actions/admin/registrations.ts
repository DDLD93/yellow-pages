'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getAllRegistrations(page = 1, limit = 10, status = 'Pending') {
  const skip = (page - 1) * limit;
  const where = status === 'All' ? {} : { status };

  const [registrations, total] = await Promise.all([
    db.businessRegistration.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    db.businessRegistration.count({ where }),
  ]);

  return { registrations, total, totalPages: Math.ceil(total / limit) };
}

export async function getRegistrationById(id: string) {
  return db.businessRegistration.findUnique({
    where: { id },
  });
}

export async function updateRegistrationStatus(id: string, status: string) {
  try {
    await db.businessRegistration.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/registrations');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update status' };
  }
}

export async function convertToBusiness(registrationId: string, businessData: any) {
  try {
    // 1. Create the business
    await db.business.create({
      data: {
        ...businessData,
        status: 'Eligible', // Default status for converted businesses
      },
    });

    // 2. Mark registration as Approved
    await db.businessRegistration.update({
      where: { id: registrationId },
      data: { status: 'Approved' },
    });

    revalidatePath('/admin/registrations');
    revalidatePath('/admin/businesses');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to convert registration' };
  }
}

