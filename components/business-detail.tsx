'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PublicBusinessProfile } from '@/types/public-business';

interface BusinessDetailProps {
  business: PublicBusinessProfile;
}

export default function BusinessDetail({ business }: BusinessDetailProps) {
  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: `Check out ${business.name} in ${business.location.lga}`,
          url,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header Bar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 shadow-sm z-30">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-kaduna-navy transition-colors"
            >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Search
            </Link>
            
            <div className="text-sm font-bold text-kaduna-emerald">
                Kaduna Business Connect
            </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 sm:px-6 lg:px-8 w-full flex-1">
        {/* Hero Section */}
        <div className="mb-6 md:mb-8 overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="relative h-[250px] md:h-[400px] w-full bg-slate-100">
            <Image
                src={business.media.heroImage}
                alt={business.name}
                fill
                className="object-cover"
                priority
                sizes="100vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            {business.metadata.isVerified && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-kaduna-emerald px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold text-white shadow-sm border border-white/20 backdrop-blur-md">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    VERIFIED
                                </span>
                            )}
                            <span className="text-[10px] md:text-sm font-medium text-white/90 bg-white/20 px-2 md:px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                                {business.category}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 tracking-tight leading-tight">{business.name}</h1>
                        <p className="text-white/80 flex items-center gap-2 text-sm md:text-base">
                            <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {business.location.lga}, Kaduna State
                        </p>
                    </div>

                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center md:justify-start gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-all active:scale-95 w-full md:w-auto"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                    </button>
                 </div>
            </div>
            </div>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-100">
                <h2 className="mb-4 text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-kaduna-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About This Business
                </h2>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg">{business.description}</p>
            </div>

            {/* Location */}
            <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-100">
                <h2 className="mb-6 text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-kaduna-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7m0 0L9.553 4.553" />
                    </svg>
                    Location & Directions
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                         <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                         <p className="text-slate-600">{business.location.address}</p>
                         <p className="text-slate-500 text-sm mt-1">{business.location.ward}, {business.location.lga}</p>
                    </div>
                    
                    {/* Placeholder for coordinate-based actions */}
                    <div className="flex flex-col gap-3">
                         <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name} ${business.location.address} ${business.location.lga} Kaduna`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors">
                            <img src="/google.svg" alt="" className="w-5 h-5" /> {/* Use fallback if no icon */}
                            Open in Google Maps
                         </a>
                    </div>
                </div>

                {business.location.coordinates && (
                    <div className="mt-6 h-64 rounded-xl bg-slate-100 overflow-hidden relative group">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Interactive Map View
                            </span>
                        </div>
                    </div>
                )}
            </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Contact Info</h2>
                <div className="space-y-4">
                {business.contact.phone && (
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                            <a href={`tel:${business.contact.phone}`} className="text-lg font-semibold text-slate-900 hover:text-kaduna-emerald">
                                {business.contact.phone}
                            </a>
                        </div>
                    </div>
                )}
                
                {business.contact.email && (
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0 text-purple-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                            <a href={`mailto:${business.contact.email}`} className="text-base font-semibold text-slate-900 hover:text-kaduna-emerald truncate block">
                                {business.contact.email}
                            </a>
                        </div>
                    </div>
                )}

                {business.contact.website && (
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Website</p>
                            <a href={business.contact.website} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-kaduna-emerald hover:underline truncate block">
                                Visit Website
                            </a>
                        </div>
                    </div>
                )}
                </div>
            </div>

            {/* Business Status Card */}
            <div className="rounded-2xl bg-kaduna-navy p-6 shadow-md text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    Business Status
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-white/60 text-sm">Status</span>
                        <span className="font-semibold text-emerald-300">Active</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-white/60 text-sm">Years Active</span>
                        <span className="font-semibold">{business.metadata.yearsActive} Years</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-white/60 text-sm">Member Since</span>
                        <span className="font-semibold">{formatDate(business.metadata.memberSince)}</span>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50 text-center">
                    Registration ID: #{business.id.slice(0, 8).toUpperCase()}
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
