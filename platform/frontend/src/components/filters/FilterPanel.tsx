import { useState } from 'react';
import { X, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { useFilterStore } from '../../store/filterStore';
import { DateRangeFilter } from './DateRangeFilter';
import { RegionFilter } from './RegionFilter';
import { CategoryFilter } from './CategoryFilter';
import { SeverityFilter } from './SeverityFilter';
import { EscalationRiskFilter } from './EscalationRiskFilter';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dateRange: true,
    region: true,
    category: true,
    severity: true,
    escalation: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleReset = () => {
    resetFilters();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <div className="fixed lg:sticky top-0 left-0 h-screen w-80 bg-gradient-to-br from-navy-light/80 to-navy-light/60 border-r border-navy-light/40 z-50 overflow-y-auto shadow-dark-lg">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-navy-light/90 to-navy-light/70 border-b border-navy-light/40 p-4 flex items-center justify-between backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-saffron">Filters</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-navy-light/50 rounded-xl"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="p-4 space-y-4">
          {/* Date Range Filter */}
          <FilterSection
            title="Date Range"
            isExpanded={expandedSections.dateRange}
            onToggle={() => toggleSection('dateRange')}
          >
            <DateRangeFilter />
          </FilterSection>

          {/* Region Filter */}
          <FilterSection
            title="Region"
            isExpanded={expandedSections.region}
            onToggle={() => toggleSection('region')}
          >
            <RegionFilter />
          </FilterSection>

          {/* Category Filter */}
          <FilterSection
            title="Taxonomy Category"
            isExpanded={expandedSections.category}
            onToggle={() => toggleSection('category')}
          >
            <CategoryFilter />
          </FilterSection>

          {/* Severity Filter */}
          <FilterSection
            title="Severity"
            isExpanded={expandedSections.severity}
            onToggle={() => toggleSection('severity')}
          >
            <SeverityFilter />
          </FilterSection>

          {/* Escalation Risk Filter */}
          <FilterSection
            title="Escalation Risk"
            isExpanded={expandedSections.escalation}
            onToggle={() => toggleSection('escalation')}
          >
            <EscalationRiskFilter />
          </FilterSection>
        </div>

        {/* Footer with Reset Button */}
        <div className="sticky bottom-0 bg-gradient-to-r from-navy-light/90 to-navy-light/70 border-t border-navy-light/40 p-4 backdrop-blur-sm">
          <Button
            variant="outline"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
            className="w-full"
          >
            Reset All Filters
          </Button>
        </div>
      </div>
    </>
  );
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border border-navy-light/40 rounded-xl overflow-hidden shadow-dark bg-gradient-to-br from-navy-light/60 to-navy-light/40">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-br from-navy-light/70 to-navy-light/50 hover:from-navy-light/80 hover:to-navy-light/60 transition-colors"
      >
        <span className="font-medium text-saffron">{title}</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-foreground/60" />
        ) : (
          <ChevronDown className="w-5 h-5 text-foreground/60" />
        )}
      </button>
      {isExpanded && <div className="p-4 bg-gradient-to-br from-navy-light/50 to-navy-light/30">{children}</div>}
    </div>
  );
}
