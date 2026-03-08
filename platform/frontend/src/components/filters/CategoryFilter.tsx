import { useFilterStore } from '../../store/filterStore';
import type { TaxonomyCategory } from '../../types/api';

const TAXONOMY_CATEGORIES: TaxonomyCategory[] = [
  'Religious Persecution',
  'Civilizational Attacks',
  'Cultural Suppression',
  'Indigenous Knowledge Dismissal',
  'Political Weaponization',
  'Anti-India as Anti-Hindu Proxy',
  'Digital and Ideological Warfare',
  'Cultural Appropriation',
];

export function CategoryFilter() {
  const selectedCategories = useFilterStore((state) => state.selectedTaxonomyCategories);
  const setSelectedCategories = useFilterStore((state) => state.setSelectedTaxonomyCategories);

  const handleToggle = (category: TaxonomyCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === TAXONOMY_CATEGORIES.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...TAXONOMY_CATEGORIES]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          {selectedCategories.length} selected
        </span>
        <button
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {selectedCategories.length === TAXONOMY_CATEGORIES.length ? 'Clear All' : 'Select All'}
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {TAXONOMY_CATEGORIES.map((category) => (
          <label
            key={category}
            className="flex items-start gap-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-2"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleToggle(category)}
              className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 leading-tight">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
