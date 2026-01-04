import { Metadata } from 'next';
import { getLGAs } from '@/actions/get-lgas';
import { getCategories } from '@/actions/get-categories';
import RegisterForm from '@/components/register-form';
import Link from 'next/link';
import Logo from '@/components/logo';
import { generateMetadata as generateBaseMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Register Business',
  description: 'Register your business in the official Kaduna State directory. Join thousands of verified businesses and get discovered by customers across Kaduna State, Nigeria.',
  keywords: [
    'register business',
    'business registration',
    'Kaduna State',
    'Nigeria',
    'business directory',
    'add business',
    'list business',
  ],
  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/register`,
});

export default async function RegisterPage() {
  const [lgas, categories] = await Promise.all([
    getLGAs(),
    getCategories(),
  ]);

  return (
    <main className="h-screen overflow-y-auto bg-gradient-to-b from-slate-50 to-white relative">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230D7B5D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Sticky Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 md:px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link 
                href="/" 
                className="group flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-kaduna-emerald transition-colors"
            >
                <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-kaduna-emerald/10 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 group-hover:text-kaduna-emerald transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </div>
                <span className="hidden sm:inline">Back to Directory</span>
            </Link>
            <Logo variant="default" orientation="horizontal" className="scale-[0.8] origin-right" />
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-kaduna-emerald/10 text-kaduna-emerald text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Registration
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Register Your Business
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Join the official Kaduna State business directory and get discovered by thousands of customers.
            </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* Card Header Accent */}
            <div className="h-1.5 bg-gradient-to-r from-kaduna-emerald via-kaduna-gold to-kaduna-navy" />
            
            {/* Form Content */}
            <div className="p-6 md:p-10 lg:p-12">
                <RegisterForm lgas={lgas} categories={categories} />
            </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 mt-8">
            By registering, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </main>
  );
}
