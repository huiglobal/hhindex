import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnimatedBackground } from './AnimatedBackground';

export interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl';
  noPadding?: boolean;
  fullHeight?: boolean;
  noFooter?: boolean;
}

export function PageLayout({ 
  children, 
  className = '',
  maxWidth = '7xl',
  noPadding = false,
  fullHeight = false,
  noFooter = false,
}: PageLayoutProps) {
  const maxWidthStyles = {
    full: 'max-w-full',
    '7xl': 'max-w-7xl',
    '6xl': 'max-w-6xl',
    '5xl': 'max-w-5xl',
  };

  const paddingStyles = noPadding ? '' : 'px-4 sm:px-6 lg:px-8 py-6';

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main 
        id="main-content" 
        className={`flex-1 ${fullHeight ? 'flex flex-col' : ''} ${className}`}
        role="main"
      >
        {fullHeight ? (
          <div className="flex-1 relative">
            {children}
          </div>
        ) : (
          <div className={`${maxWidthStyles[maxWidth]} mx-auto ${paddingStyles}`}>
            {children}
          </div>
        )}
      </main>

      {/* Footer */}
      {!noFooter && <Footer />}
    </div>
  );
}
