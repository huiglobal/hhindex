import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  success,
  helperText,
  fullWidth = false,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = 'px-3 py-2 border rounded-xl text-base transition-colors duration-base focus-ring disabled:bg-navy-light disabled:cursor-not-allowed bg-navy text-foreground';
  
  const stateStyles = error
    ? 'border-error focus:border-error'
    : success
    ? 'border-success focus:border-success'
    : 'border-border focus:border-saffron';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${stateStyles} ${widthStyles} ${className}`;
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          className={combinedClassName}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : success ? `${inputId}-success` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <AlertCircle className="text-error" size={20} />
          </div>
        )}
        
        {success && !error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <CheckCircle className="text-success" size={20} />
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-error flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      
      {success && !error && (
        <p id={`${inputId}-success`} className="mt-1 text-sm text-success flex items-center gap-1">
          <CheckCircle size={14} />
          {success}
        </p>
      )}
      
      {helperText && !error && !success && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-foreground-muted">
          {helperText}
        </p>
      )}
    </div>
  );
}
