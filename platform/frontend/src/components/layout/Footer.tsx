import { Link } from 'react-router-dom';

export interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gradient-to-r from-navy to-navy-light border-t border-navy-light shadow-dark ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3 className="text-sm font-semibold text-saffron uppercase tracking-wider mb-3">
              About
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              The Hindu Hate Index tracks and analyzes incidents of hate speech, discrimination, 
              and violence targeting Hindu communities worldwide.
            </p>
          </div>

          {/* Data Metadata Section */}
          <div>
            <h3 className="text-sm font-semibold text-saffron uppercase tracking-wider mb-3">
              Data Information
            </h3>
            <dl className="space-y-2 text-sm text-foreground/80">
              <div>
                <dt className="inline font-medium text-foreground">Data Source: </dt>
                <dd className="inline">Multi-source aggregation with AI verification</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Time Period: </dt>
                <dd className="inline">2020 - Present</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Last Updated: </dt>
                <dd className="inline">{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</dd>
              </div>
            </dl>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-sm font-semibold text-saffron uppercase tracking-wider mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-foreground/80 hover:text-saffron transition-colors no-underline">
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-foreground/80 hover:text-saffron transition-colors no-underline">
                  Alerts & Notifications
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:contact@hinduhatindex.org" 
                  className="text-foreground/80 hover:text-saffron transition-colors no-underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-foreground/80 hover:text-saffron transition-colors no-underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-navy-light">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-foreground/60">
              © {currentYear} Hindu Hate Index. All rights reserved.
            </p>
            <p className="text-xs text-foreground/60">
              Data updated daily • Powered by AI-assisted verification
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
