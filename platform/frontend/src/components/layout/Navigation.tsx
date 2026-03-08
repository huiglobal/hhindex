import { NavLink } from 'react-router-dom';

export interface NavigationProps {
  mobile?: boolean;
  onNavigate?: () => void;
  className?: string;
}

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Heatmap', path: '/heatmap' },
  { name: 'Leaderboards', path: '/leaderboards' },
  { name: 'Data Explorer', path: '/data-explorer' },
  { name: 'Articles', path: '/articles' },
  { name: 'About', path: '/about' },
  { name: 'Alerts', path: '/alerts' },
];

export function Navigation({ mobile = false, onNavigate, className = '' }: NavigationProps) {
  const baseStyles = mobile
    ? 'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-base'
    : 'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-base';

  const activeStyles = mobile
    ? 'bg-gradient-to-br from-saffron/20 to-maroon/20 text-saffron border-l-4 border-saffron'
    : 'text-saffron';

  const inactiveStyles = mobile
    ? 'text-foreground/70 hover:bg-navy-light hover:text-saffron border-l-4 border-transparent'
    : 'text-foreground/70 hover:text-saffron';

  const containerStyles = mobile
    ? `flex flex-col space-y-1 ${className}`
    : `flex items-center space-x-1 ${className}`;

  return (
    <nav className={containerStyles} aria-label="Main navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
