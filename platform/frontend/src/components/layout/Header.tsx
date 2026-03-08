import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Navigation } from './Navigation';

export interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`relative bg-navy border-b border-navy-light sticky top-0 z-[9999] shadow-dark ${className}`} style={{ backgroundColor: '#0F1829' }}>
      {/* Solid background overlay to ensure complete opacity */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy-light" style={{ backgroundColor: '#0F1829' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Platform Name */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 no-underline">
              <div className="text-2xl font-bold text-saffron">
                Hindu Hate Index
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-foreground/70 hover:text-saffron hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-saffron"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-navy-light bg-gradient-to-br from-navy to-navy-light rounded-b-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Navigation mobile onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
