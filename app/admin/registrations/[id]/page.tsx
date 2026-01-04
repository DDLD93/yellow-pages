'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getRegistrationById, convertToBusiness, updateRegistrationStatus } from '@/actions/admin/registrations';
import { getLGAs } from '@/actions/get-lgas';
import { getCategories } from '@/actions/get-categories';
import { ArrowLeft, CheckCircle, XCircle, Save, Loader2, AlertCircle } from 'lucide-react';
import { AdminPageHeader, AdminCard, AdminBadge, AdminButton, AdminInput, AdminSelect } from '@/components/admin/ui';

export default function RegistrationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [registration, setRegistration] = useState<any>(null);
  const [lgas, setLgas] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showConvertForm, setShowConvertForm] = useState(false);
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessRegCatType: '',
    businessLGA: '',
    businessWard: '',
    businessAddress: '',
    phone: '',
    email: '',
    website: '',
    status: 'Eligible',
    latitude: '',
    longitude: '',
    ownerAtBusinessPhotoUrl: '',
  });

  useEffect(() => {
    const loadData = async () => {
      const [reg, lgaList, catList] = await Promise.all([
        getRegistrationById(params.id),
        getLGAs(),
        getCategories(),
      ]);

      if (reg) {
        setRegistration(reg);
        setBusinessData({
          businessName: reg.businessName || '',
          businessRegCatType: reg.businessRegCatType || '',
          businessLGA: reg.businessLGA || '',
          businessWard: reg.businessWard || '',
          businessAddress: reg.businessAddress || '',
          phone: reg.phone || '',
          email: reg.email || '',
          website: '',
          status: 'Eligible',
          latitude: '',
          longitude: '',
          ownerAtBusinessPhotoUrl: '',
        });
      }
      setLgas(lgaList);
      setCategories(catList);
      setLoading(false);
    };
    loadData();
  }, [params.id]);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const data = {
      ...businessData,
      latitude: businessData.latitude ? parseFloat(businessData.latitude) : null,
      longitude: businessData.longitude ? parseFloat(businessData.longitude) : null,
    };
    try {
      await convertToBusiness(params.id, data);
      router.push('/admin/registrations');
    } catch (error) {
      console.error('Error converting registration:', error);
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    await updateRegistrationStatus(params.id, status);
    router.push('/admin/registrations');
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    if (status === 'Approved') return 'success';
    if (status === 'Rejected') return 'error';
    if (status === 'Reviewed') return 'info';
    return 'warning';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-kaduna-navy" />
      </div>
    );
  }

  if (!registration) {
    return (
      <AdminCard>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="w-12 h-12 text-admin-error mb-4" />
          <h3 className="text-lg font-semibold text-admin-text-primary mb-2">Registration not found</h3>
          <p className="text-sm text-admin-text-secondary mb-4">The registration you're looking for doesn't exist.</p>
          <Link href="/admin/registrations">
            <AdminButton variant="secondary" icon={ArrowLeft} iconPosition="left">
              Back to Registrations
            </AdminButton>
          </Link>
        </div>
      </AdminCard>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Registration Details"
        description="Review and convert to business"
        action={
          <Link href="/admin/registrations">
            <AdminButton variant="secondary" icon={ArrowLeft} iconPosition="left">
              Back
            </AdminButton>
          </Link>
        }
      />

      {/* Registration Info */}
      <AdminCard title="Registration Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Business Name</p>
            <p className="font-medium text-admin-text-primary">{registration.businessName}</p>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Category</p>
            <p className="font-medium text-admin-text-primary">{registration.businessRegCatType}</p>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">LGA</p>
            <p className="font-medium text-admin-text-primary">{registration.businessLGA}</p>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Ward</p>
            <p className="font-medium text-admin-text-primary">{registration.businessWard || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Address</p>
            <p className="font-medium text-admin-text-primary">{registration.businessAddress || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Phone</p>
            <p className="font-medium text-admin-text-primary">{registration.phone}</p>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Email</p>
            <p className="font-medium text-admin-text-primary">{registration.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Owner Name</p>
            <p className="font-medium text-admin-text-primary">
              {registration.ownerFirstName && registration.ownerSurname
                ? `${registration.ownerFirstName} ${registration.ownerSurname}`
                : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Status</p>
            <AdminBadge variant={getStatusVariant(registration.status)}>{registration.status}</AdminBadge>
          </div>
          <div>
            <p className="text-sm text-admin-text-secondary mb-1">Submitted</p>
            <p className="font-medium text-admin-text-primary">{new Date(registration.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </AdminCard>

      {/* Actions */}
      {registration.status === 'Pending' && (
        <AdminCard title="Actions">
          <div className="flex flex-wrap gap-3">
            <AdminButton
              variant="primary"
              icon={CheckCircle}
              iconPosition="left"
              onClick={() => handleStatusChange('Reviewed')}
            >
              Mark as Reviewed
            </AdminButton>
            <AdminButton
              variant="danger"
              icon={XCircle}
              iconPosition="left"
              onClick={() => handleStatusChange('Rejected')}
            >
              Reject
            </AdminButton>
            <AdminButton
              icon={CheckCircle}
              iconPosition="left"
              onClick={() => setShowConvertForm(true)}
            >
              Convert to Business
            </AdminButton>
          </div>
        </AdminCard>
      )}

      {/* Convert Form */}
      {showConvertForm && (
        <form onSubmit={handleConvert}>
          <AdminCard
            title="Convert to Business"
            description="Fill in the remaining required fields to create the business."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminInput
                label="Business Name"
                required
                value={businessData.businessName}
                onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
              />

              <AdminSelect
                label="Category"
                required
                value={businessData.businessRegCatType}
                onChange={(e) => setBusinessData({ ...businessData, businessRegCatType: e.target.value })}
                options={[
                  { value: '', label: 'Select category' },
                  ...categories.map((cat) => ({ value: cat, label: cat })),
                ]}
              />

              <AdminSelect
                label="LGA"
                required
                value={businessData.businessLGA}
                onChange={(e) => setBusinessData({ ...businessData, businessLGA: e.target.value })}
                options={[
                  { value: '', label: 'Select LGA' },
                  ...lgas.map((lga) => ({ value: lga, label: lga })),
                ]}
              />

              <AdminSelect
                label="Status"
                required
                value={businessData.status}
                onChange={(e) => setBusinessData({ ...businessData, status: e.target.value })}
                options={[
                  { value: 'Eligible', label: 'Eligible' },
                  { value: 'Disbursed', label: 'Disbursed' },
                  { value: 'Pending', label: 'Pending' },
                ]}
              />

              <AdminInput
                label="Latitude"
                type="number"
                step="any"
                value={businessData.latitude}
                onChange={(e) => setBusinessData({ ...businessData, latitude: e.target.value })}
              />

              <AdminInput
                label="Longitude"
                type="number"
                step="any"
                value={businessData.longitude}
                onChange={(e) => setBusinessData({ ...businessData, longitude: e.target.value })}
              />

              <AdminInput
                label="Website"
                type="url"
                value={businessData.website}
                onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
              />

              <AdminInput
                label="Photo URL"
                type="url"
                value={businessData.ownerAtBusinessPhotoUrl}
                onChange={(e) => setBusinessData({ ...businessData, ownerAtBusinessPhotoUrl: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-admin-border">
              <AdminButton
                type="button"
                variant="secondary"
                onClick={() => setShowConvertForm(false)}
              >
                Cancel
              </AdminButton>
              <AdminButton
                type="submit"
                icon={Save}
                iconPosition="left"
                loading={submitting}
              >
                Convert to Business
              </AdminButton>
            </div>
          </AdminCard>
        </form>
      )}
    </div>
  );
}
