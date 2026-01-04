import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse';
  color?: 'primary' | 'white' | 'muted';
  className?: string;
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const colorClasses = {
  primary: 'text-kaduna-emerald',
  white: 'text-white',
  muted: 'text-slate-400',
};

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'spinner',
  color = 'primary',
  className = '' 
}: LoadingSpinnerProps) {
  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'rounded-full bg-current animate-bounce',
              colorClasses[color],
              size === 'xs' && 'w-1 h-1',
              size === 'sm' && 'w-1.5 h-1.5',
              size === 'md' && 'w-2 h-2',
              size === 'lg' && 'w-2.5 h-2.5',
              size === 'xl' && 'w-3 h-3',
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <span 
          className={cn(
            'absolute inset-0 rounded-full bg-current opacity-75 animate-ping',
            colorClasses[color]
          )} 
        />
        <span 
          className={cn(
            'relative block rounded-full bg-current',
            colorClasses[color],
            sizeClasses[size]
          )} 
        />
      </div>
    );
  }

  // Default: spinner variant
  return (
    <svg 
      className={cn('animate-spin', sizeClasses[size], colorClasses[color], className)} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Named export for convenience
export { LoadingSpinner };

