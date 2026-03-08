import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export function Select({
  label,
  error,
  helperText,
  options,
  placeholder,
  fullWidth = false,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = 'px-3 py-2 pr-10 border rounded-xl text-base transition-colors duration-base focus-ring disabled:bg-navy-light disabled:cursor-not-allowed appearance-none bg-navy text-foreground';
  
  const stateStyles = error
    ? 'border-error focus:border-error'
    : 'border-border focus:border-saffron';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${stateStyles} ${widthStyles} ${className}`;
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-foreground mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          className={combinedClassName}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="text-foreground-muted" size={20} />
        </div>
      </div>
      
      {error && (
        <p id={`${selectId}-error`} className="mt-1 text-sm text-error flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${selectId}-helper`} className="mt-1 text-sm text-foreground-muted">
          {helperText}
        </p>
      )}
    </div>
  );
}
