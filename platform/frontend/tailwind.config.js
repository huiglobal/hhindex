/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors based on executive summary
        saffron: {
          DEFAULT: '#FF9933',
          dark: '#E07800',
          light: '#FFF3E0',
        },
        maroon: {
          DEFAULT: '#800020',
          deep: '#5C0015',
        },
        navy: {
          DEFAULT: '#1B2A4A',
          light: '#2C3E6B',
          dark: '#0F1829',
        },
        ivory: {
          DEFAULT: '#FDFAF5',
          warm: '#F5F0EA',
        },
        // Dark theme specific
        background: {
          DEFAULT: '#0F1829', // Darker than navy-dark
          secondary: '#1B2A4A', // navy
          tertiary: '#2C3E6B', // navy-light
        },
        foreground: {
          DEFAULT: '#FDFAF5', // ivory
          secondary: '#E8E0D6',
          muted: '#A8A29E',
        },
        border: {
          DEFAULT: '#2C3E6B',
          light: '#3D4E7A',
          accent: '#D4A574',
        },
        // Neutral palette (adjusted for dark theme)
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Primary colors (saffron-based)
        primary: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9933', // saffron
          600: '#E07800', // saffron-dark
          700: '#C66900',
          800: '#AD5A00',
          900: '#944B00',
        },
        // Semantic colors (adjusted for dark theme)
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // Severity colors
        severity: {
          low: '#10B981',
          medium: '#F59E0B',
          high: '#EF4444',
        },
        // Heatmap colors (colorblind-accessible)
        heatmap: {
          low: '#FEF3C7',
          medium: '#FCD34D',
          high: '#F59E0B',
          extreme: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Source Sans 3', 'Helvetica Neue', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      spacing: {
        0: '0',
        1: '0.5rem',
        2: '1rem',
        3: '1.5rem',
        4: '2rem',
        5: '2.5rem',
        6: '3rem',
        8: '4rem',
        10: '5rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(27, 42, 74, 0.08)',
        md: '0 4px 12px rgba(27, 42, 74, 0.10)',
        lg: '0 8px 30px rgba(27, 42, 74, 0.12)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
    },
  },
  plugins: [],
}
