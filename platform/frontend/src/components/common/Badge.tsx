import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'severity-low' | 'severity-medium' | 'severity-high';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl shadow-dark';
  
  const variantStyles = {
    default: 'bg-gradient-to-br from-navy-light/70 to-navy-light/50 text-foreground border border-navy-light/30',
    success: 'bg-gradient-to-br from-green-600/80 to-green-700/60 text-white border border-green-500/30',
    warning: 'bg-gradient-to-br from-yellow-600/80 to-yellow-700/60 text-white border border-yellow-500/30',
    error: 'bg-gradient-to-br from-red-600/80 to-red-700/60 text-white border border-red-500/30',
    info: 'bg-gradient-to-br from-blue-600/80 to-blue-700/60 text-white border border-blue-500/30',
    'severity-low': 'bg-gradient-to-br from-green-600/80 to-green-700/60 text-white border border-green-500/30',
    'severity-medium': 'bg-gradient-to-br from-yellow-600/80 to-yellow-700/60 text-white border border-yellow-500/30',
    'severity-high': 'bg-gradient-to-br from-red-600/80 to-red-700/60 text-white border border-red-500/30',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
}
