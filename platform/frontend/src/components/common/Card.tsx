import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  className = '',
  style,
}: CardProps) {
  const baseStyles = 'rounded-xl transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-gradient-to-br from-navy-light/80 to-navy-light/60 border border-navy-light',
    outlined: 'bg-gradient-to-br from-navy-light/80 to-navy-light/60 border-2 border-navy-light',
    elevated: 'bg-gradient-to-br from-navy-light/80 to-navy-light/60',
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const hoverStyles = hoverable ? 'cursor-pointer hover:from-navy-light/90 hover:to-navy-light/70 hover:scale-105' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${clickableStyles} ${className}`;
  
  // Inline shadow styles for raised effect
  const shadowStyle = {
    boxShadow: variant === 'elevated' 
      ? '0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3)'
      : '0 15px 40px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.25)'
  };
  
  // Merge custom style with default shadow style
  const mergedStyle = { ...shadowStyle, ...style };
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      className={combinedClassName}
      style={mergedStyle}
      onClick={onClick}
      {...(onClick && { type: 'button' })}
    >
      {children}
    </Component>
  );
}
