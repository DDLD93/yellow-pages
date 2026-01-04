'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function registerBusiness(formData: FormData) {
  const rawData = {
    businessName: formData.get('businessName') as string,
    businessRegCatType: formData.get('businessRegCatType') as string,
    businessLGA: formData.get('businessLGA') as string,
    businessWard: formData.get('businessWard') as string,
    businessAddress: formData.get('businessAddress') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    ownerFirstName: formData.get('ownerFirstName') as string,
    ownerSurname: formData.get('ownerSurname') as string,
  };

  // Basic validation
  if (!rawData.businessName || !rawData.businessLGA || !rawData.phone) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  try {
    await db.businessRegistration.create({
      data: {
        businessName: rawData.businessName,
        businessRegCatType: rawData.businessRegCatType,
        businessLGA: rawData.businessLGA,
        businessWard: rawData.businessWard || null,
        businessAddress: rawData.businessAddress || null,
        phone: rawData.phone,
        email: rawData.email || null,
        ownerFirstName: rawData.ownerFirstName || null,
        ownerSurname: rawData.ownerSurname || null,
        status: 'Pending',
      },
    });

    revalidatePath('/');
    return { success: true, message: 'Registration submitted successfully!' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Failed to submit registration. Please try again.' };
  }
}
