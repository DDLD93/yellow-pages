'use client';

import { useState } from 'react';
import { registerBusiness } from '@/actions/register-business';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface RegisterFormProps {
  lgas: string[];
  categories: string[];
}

export default function RegisterForm({ lgas, categories }: RegisterFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    const result = await registerBusiness(formData);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    setIsSubmitting(false);
  }

  const inputStyles = "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-kaduna-emerald focus:ring-2 focus:ring-kaduna-emerald/20 focus:outline-none transition-all duration-200";
  
  const selectStyles = "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-kaduna-emerald focus:ring-2 focus:ring-kaduna-emerald/20 focus:outline-none transition-all duration-200 appearance-none cursor-pointer";

  return (
    <form action={handleSubmit} className="space-y-10">
      {/* Status Message */}
      {message && (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${
                message.type === 'success' 
                    ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-kaduna-emerald border border-emerald-200' 
                    : 'bg-gradient-to-r from-red-50 to-red-100/50 text-red-600 border border-red-200'
            }`}
        >
          {message.type === 'success' ? (
              <div className="w-8 h-8 rounded-full bg-kaduna-emerald/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
              </div>
          ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </div>
          )}
          {message.text}
        </motion.div>
      )}

      {/* Section 1: Business Information */}
      <section className="space-y-6">
        <SectionHeader 
            icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            }
            title="Business Information"
            subtitle="Basic details about your business"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="md:col-span-2">
                <label htmlFor="businessName" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Business Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    required
                    placeholder="e.g. Kaduna Textiles Ltd"
                    className={inputStyles}
                />
            </div>

            <div className="md:col-span-2">
                <label htmlFor="businessRegCatType" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Business Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        name="businessRegCatType"
                        id="businessRegCatType"
                        required
                        className={selectStyles}
                    >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-dashed border-slate-200" />

      {/* Section 2: Location */}
      <section className="space-y-6">
        <SectionHeader 
            icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            }
            title="Location"
            subtitle="Where your business is located"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
                <label htmlFor="businessLGA" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Local Government Area <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        name="businessLGA"
                        id="businessLGA"
                        required
                        className={selectStyles}
                    >
                        <option value="">Select LGA</option>
                        {lgas.map(lga => (
                            <option key={lga} value={lga}>{lga}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="businessWard" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Ward <span className="text-slate-300">(Optional)</span>
                </label>
                <input
                    type="text"
                    name="businessWard"
                    id="businessWard"
                    placeholder="Enter ward name"
                    className={inputStyles}
                />
            </div>

            <div className="md:col-span-2">
                <label htmlFor="businessAddress" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Full Address <span className="text-slate-300">(Optional)</span>
                </label>
                <textarea
                    name="businessAddress"
                    id="businessAddress"
                    rows={3}
                    placeholder="Street address, building number, landmark..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-kaduna-emerald focus:ring-2 focus:ring-kaduna-emerald/20 focus:outline-none transition-all duration-200 resize-none"
                />
            </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-dashed border-slate-200" />

      {/* Section 3: Owner & Contact */}
      <section className="space-y-6">
        <SectionHeader 
            icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            }
            title="Owner & Contact"
            subtitle="How we can reach you"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
                <label htmlFor="ownerFirstName" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    First Name <span className="text-slate-300">(Optional)</span>
                </label>
                <input
                    type="text"
                    name="ownerFirstName"
                    id="ownerFirstName"
                    placeholder="Your first name"
                    className={inputStyles}
                />
            </div>

            <div>
                <label htmlFor="ownerSurname" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Surname <span className="text-slate-300">(Optional)</span>
                </label>
                <input
                    type="text"
                    name="ownerSurname"
                    id="ownerSurname"
                    placeholder="Your surname"
                    className={inputStyles}
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    placeholder="080 XXX XXXX"
                    className={inputStyles}
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Email Address <span className="text-slate-300">(Optional)</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    className={inputStyles}
                />
            </div>
        </div>
      </section>

      {/* Submit Area */}
      <div className="pt-8 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 text-center sm:text-left">
                <span className="text-red-500">*</span> Required fields must be completed
            </p>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px] h-14 px-8 bg-gradient-to-r from-kaduna-emerald to-emerald-600 text-white font-bold rounded-xl hover:from-kaduna-navy hover:to-kaduna-navy transition-all duration-300 shadow-lg shadow-kaduna-emerald/25 hover:shadow-xl hover:shadow-kaduna-navy/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-3 transform active:scale-[0.98]"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting...</span>
                    </>
                ) : (
                    <>
                        <span>Register Business</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </>
                )}
            </button>
        </div>
      </div>
    </form>
  );
}

// Section Header Component
function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kaduna-emerald/10 to-kaduna-emerald/5 border border-kaduna-emerald/20 flex items-center justify-center text-kaduna-emerald flex-shrink-0">
                {icon}
            </div>
            <div className="pt-1">
                <h3 className="text-base font-bold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
            </div>
        </div>
    );
}
