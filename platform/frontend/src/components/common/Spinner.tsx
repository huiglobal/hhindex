import React from 'react';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export function Spinner({
  size = 'md',
  className = '',
  label,
}: SpinnerProps) {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  };
  
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <Loader2
        className="animate-spin text-saffron"
        size={sizeMap[size]}
        aria-label={label || 'Loading'}
      />
      {label && (
        <p className="text-sm text-foreground/70">{label}</p>
      )}
    </div>
  );
}

export interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  label?: string;
}

export function LoadingOverlay({
  isLoading,
  children,
  label,
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-navy/75 flex items-center justify-center z-10 rounded-xl">
          <Spinner size="lg" label={label} />
        </div>
      )}
    </div>
  );
}
