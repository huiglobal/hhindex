import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Large slow-moving orb - top right */}
        <div 
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 153, 51, 0.15) 0%, rgba(255, 153, 51, 0.05) 40%, transparent 70%)',
            animation: 'float-slow 25s ease-in-out infinite',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Medium orb - bottom left */}
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(128, 0, 32, 0.12) 0%, rgba(128, 0, 32, 0.04) 40%, transparent 70%)',
            animation: 'float-slow-reverse 28s ease-in-out infinite',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Small orb - center right */}
        <div 
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(44, 62, 107, 0.18) 0%, rgba(44, 62, 107, 0.06) 40%, transparent 70%)',
            animation: 'pulse-subtle 20s ease-in-out infinite',
            filter: 'blur(35px)',
          }}
        />
        
        {/* Additional accent orb - middle left */}
        <div 
          className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 153, 51, 0.1) 0%, rgba(255, 153, 51, 0.03) 40%, transparent 70%)',
            animation: 'float-diagonal 30s ease-in-out infinite',
            filter: 'blur(30px)',
          }}
        />
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 153, 51, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 153, 51, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-drift 50s linear infinite',
        }}
      />
    </div>
  );
}
