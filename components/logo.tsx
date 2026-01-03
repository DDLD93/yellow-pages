import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'large';
  orientation?: 'vertical' | 'horizontal';
}

export default function Logo({ className = '', variant = 'default', orientation = 'vertical' }: LogoProps) {
  const sizeClasses = variant === 'large' ? 'w-20 h-20' : 'w-10 h-10';
  const textClasses = variant === 'large' ? 'text-2xl' : 'text-lg';
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`flex ${isHorizontal ? 'flex-row text-left' : 'flex-col text-center'} items-center justify-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses} shrink-0`}>
         <Image
            src="/logo.png"
            alt="Kaduna State Coat of Arms"
            fill
            className="object-contain"
            priority
         />
      </div>
      
      <div className={isHorizontal ? 'text-left' : 'text-center'}>
        <h1 className={`font-bold text-kaduna-navy tracking-tight leading-none ${textClasses}`}>
          Kaduna Business Connect
        </h1>
        {variant === 'large' && (
          <p className="text-kaduna-emerald font-medium text-xs mt-1">
            Trusted businesses, verify instantly.
          </p>
        )}
      </div>
    </div>
  );
}
