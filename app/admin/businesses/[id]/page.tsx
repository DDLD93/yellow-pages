'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBusinessById, updateBusiness, createBusiness } from '@/actions/admin/businesses';
import { getLGAs } from '@/actions/get-lgas';
import { getCategories } from '@/actions/get-categories';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { AdminPageHeader, AdminInput, AdminSelect, AdminButton, AdminCard } from '@/components/admin/ui';

export default function BusinessFormPage({ params }: { params: { id?: string } }) {
  const router = useRouter();
  const isEdit = !!params.id;
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [lgas, setLgas] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    businessName: '',
    businessRegCatType: '',
    businessLGA: '',
    businessWard: '',
    businessAddress: '',
    phone: '',
    email: '',
    website: '',
    status: 'Pending',
    latitude: '',
    longitude: '',
    ownerAtBusinessPhotoUrl: '',
  });

  useEffect(() => {
    const loadData = async () => {
      const [lgaList, catList] = await Promise.all([getLGAs(), getCategories()]);
      setLgas(lgaList);
      setCategories(catList);

      if (isEdit && params.id) {
        const business = await getBusinessById(params.id);
        if (business) {
          setFormData({
            businessName: business.businessName || '',
            businessRegCatType: business.businessRegCatType || '',
            businessLGA: business.businessLGA || '',
            businessWard: business.businessWard || '',
            businessAddress: business.businessAddress || '',
            phone: business.phone || '',
            email: business.email || '',
            website: business.website || '',
            status: business.status || 'Pending',
            latitude: business.latitude?.toString() || '',
            longitude: business.longitude?.toString() || '',
            ownerAtBusinessPhotoUrl: business.ownerAtBusinessPhotoUrl || '',
          });
        }
        setLoading(false);
      }
    };
    loadData();
  }, [isEdit, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const data = {
      ...formData,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
    };

    try {
      if (isEdit && params.id) {
        await updateBusiness(params.id, data);
      } else {
        await createBusiness(data);
      }
      router.push('/admin/businesses');
    } catch (error) {
      console.error('Error saving business:', error);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-kaduna-navy" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={isEdit ? 'Edit Business' : 'Create New Business'}
        description={isEdit ? 'Update business information' : 'Add a new business to the system'}
        action={
          <Link href="/admin/businesses">
            <AdminButton variant="secondary" icon={ArrowLeft} iconPosition="left">
              Back
            </AdminButton>
          </Link>
        }
      />

      <form onSubmit={handleSubmit}>
        <AdminCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput
              label="Business Name"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />

            <AdminSelect
              label="Category"
              required
              value={formData.businessRegCatType}
              onChange={(e) => setFormData({ ...formData, businessRegCatType: e.target.value })}
              options={[
                { value: '', label: 'Select category' },
                ...categories.map((cat) => ({ value: cat, label: cat })),
              ]}
            />

            <AdminSelect
              label="LGA"
              required
              value={formData.businessLGA}
              onChange={(e) => setFormData({ ...formData, businessLGA: e.target.value })}
              options={[
                { value: '', label: 'Select LGA' },
                ...lgas.map((lga) => ({ value: lga, label: lga })),
              ]}
            />

            <AdminInput
              label="Ward"
              value={formData.businessWard}
              onChange={(e) => setFormData({ ...formData, businessWard: e.target.value })}
            />

            <div className="md:col-span-2">
              <AdminInput
                label="Address"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
              />
            </div>

            <AdminInput
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <AdminInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <AdminInput
              label="Website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />

            <AdminSelect
              label="Status"
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Eligible', label: 'Eligible' },
                { value: 'Disbursed', label: 'Disbursed' },
                { value: 'Rejected', label: 'Rejected' },
              ]}
            />

            <AdminInput
              label="Photo URL"
              type="url"
              value={formData.ownerAtBusinessPhotoUrl}
              onChange={(e) => setFormData({ ...formData, ownerAtBusinessPhotoUrl: e.target.value })}
            />

            <AdminInput
              label="Latitude"
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            />

            <AdminInput
              label="Longitude"
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-admin-border">
            <Link href="/admin/businesses">
              <AdminButton variant="secondary" type="button">
                Cancel
              </AdminButton>
            </Link>
            <AdminButton
              type="submit"
              icon={Save}
              iconPosition="left"
              loading={submitting}
            >
              {isEdit ? 'Update Business' : 'Create Business'}
            </AdminButton>
          </div>
        </AdminCard>
      </form>
    </div>
  );
}
