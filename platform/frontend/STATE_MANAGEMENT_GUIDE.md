# State Management Guide

This document explains the state management architecture for the Hindu Hate Index platform.

## Overview

The application uses a hybrid state management approach:

1. **Server State**: TanStack Query for API data caching and synchronization
2. **Client State**: Zustand for UI state and user preferences
3. **Local State**: React hooks (useState, useReducer) for component-specific state

## Zustand Stores

### 1. Filter Store (`filterStore.ts`)

Manages all filter state for data exploration across the application.

**State:**
- `dateRange`: Time range filter
- `selectedRegions`: Array of region IDs
- `selectedIncidentTypes`: Array of incident types
- `selectedTaxonomyCategories`: Array of taxonomy categories
- `severityRange`: Tuple [min, max] for severity filtering
- `verificationStatus`: Array of verification statuses
- `escalationRisk`: Array of escalation risk levels
- `searchQuery`: Full-text search query

**Actions:**
- `setDateRange(range)`: Update date range
- `setSelectedRegions(regions)`: Update selected regions
- `setSelectedIncidentTypes(types)`: Update incident types
- `setSelectedTaxonomyCategories(categories)`: Update taxonomy categories
- `setSeverityRange(range)`: Update severity range
- `setVerificationStatus(statuses)`: Update verification statuses
- `setEscalationRisk(risks)`: Update escalation risks
- `setSearchQuery(query)`: Update search query
- `resetFilters()`: Reset all filters to defaults

**Usage:**
```typescript
import { useFilterStore } from '@/store';

function FilterPanel() {
  const { dateRange, setDateRange, resetFilters } = useFilterStore();
  
  return (
    <div>
      <DateRangePicker value={dateRange} onChange={setDateRange} />
      <button onClick={resetFilters}>Reset</button>
    </div>
  );
}
```

### 2. UI Store (`uiStore.ts`)

Manages UI-specific state like sidebar visibility and theme.

**State:**
- `sidebarOpen`: Boolean for sidebar visibility
- `filterPanelOpen`: Boolean for filter panel visibility
- `theme`: 'light' | 'dark'
- `mobileMenuOpen`: Boolean for mobile menu visibility

**Actions:**
- `toggleSidebar()`: Toggle sidebar
- `setSidebarOpen(open)`: Set sidebar state
- `toggleFilterPanel()`: Toggle filter panel
- `setFilterPanelOpen(open)`: Set filter panel state
- `setTheme(theme)`: Set theme
- `toggleMobileMenu()`: Toggle mobile menu
- `setMobileMenuOpen(open)`: Set mobile menu state

**Usage:**
```typescript
import { useUIStore } from '@/store';

function Header() {
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();
  
  return (
    <header>
      <button onClick={toggleMobileMenu}>Menu</button>
      {mobileMenuOpen && <MobileMenu />}
    </header>
  );
}
```

### 3. User Preferences Store (`userPreferencesStore.ts`)

Manages user preferences with localStorage persistence.

**State:**
- `savedViews`: Array of saved filter configurations
- `favoriteRegions`: Array of favorite region IDs
- `chartPreferences`: Chart display preferences

**Actions:**
- `addSavedView(view)`: Save a new view
- `updateSavedView(id, updates)`: Update existing view
- `removeSavedView(viewId)`: Delete a saved view
- `getSavedView(viewId)`: Retrieve a saved view
- `addFavoriteRegion(regionId)`: Add region to favorites
- `removeFavoriteRegion(regionId)`: Remove region from favorites
- `updateChartPreferences(prefs)`: Update chart preferences
- `clearAllPreferences()`: Clear all preferences

**Persistence:**
Data is automatically persisted to localStorage under the key `user-preferences-storage`.

**Usage:**
```typescript
import { useUserPreferencesStore } from '@/store';

function SaveViewButton() {
  const { addSavedView } = useUserPreferencesStore();
  const filters = useFilterStore();
  
  const handleSave = () => {
    addSavedView({
      name: 'My Custom View',
      description: 'Incidents in India from 2024',
      filters: {
        dateRange: filters.dateRange,
        regions: filters.selectedRegions,
        // ... other filters
      },
    });
  };
  
  return <button onClick={handleSave}>Save View</button>;
}
```

## TanStack Query

### Configuration

The QueryClient is configured in `config/queryClient.ts` with:
- 5-minute stale time
- 10-minute garbage collection time
- 3 retry attempts with exponential backoff
- No refetch on window focus
- Refetch on reconnect and mount

### Query Keys

Query keys are centralized in `config/queryKeys.ts` following a hierarchical structure:

```typescript
import { queryKeys } from '@/config/queryKeys';

// Examples:
queryKeys.incidents.all              // ['incidents']
queryKeys.incidents.list(filters)    // ['incidents', 'list', { filters }]
queryKeys.incidents.detail(id)       // ['incidents', 'detail', id]
```

**Benefits:**
- Type-safe query keys
- Easy cache invalidation
- Consistent key structure
- Hierarchical organization

### Usage Example

```typescript
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryKeys';
import { fetchIncidents } from '@/api/mockApi';

function IncidentList() {
  const filters = useFilterStore();
  
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.incidents.list(filters, { page: 1, pageSize: 20 }),
    queryFn: () => fetchIncidents(filters, { page: 1, pageSize: 20 }),
  });
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  
  return <div>{/* Render incidents */}</div>;
}
```

### Cache Invalidation

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryKeys';

function RefreshButton() {
  const queryClient = useQueryClient();
  
  const handleRefresh = () => {
    // Invalidate all incident queries
    queryClient.invalidateQueries({ queryKey: queryKeys.incidents.all });
    
    // Or invalidate specific query
    queryClient.invalidateQueries({ 
      queryKey: queryKeys.incidents.detail('incident-123') 
    });
  };
  
  return <button onClick={handleRefresh}>Refresh</button>;
}
```

## DevTools

### Zustand DevTools

All stores are wrapped with the `devtools` middleware, enabled only in development mode.

**Access:**
1. Open browser DevTools
2. Go to Redux DevTools extension
3. View store state and actions

### React Query DevTools

The React Query DevTools are included in `App.tsx` and only render in development.

**Access:**
- Look for the React Query icon in the bottom-left corner of the screen
- Click to open the DevTools panel
- View queries, mutations, and cache state

## Best Practices

### 1. Separate Concerns

- Use Zustand for client-side UI state
- Use TanStack Query for server state
- Use local state for component-specific state

### 2. Query Key Consistency

Always use the `queryKeys` factory:

```typescript
// ✅ Good
queryKey: queryKeys.incidents.list(filters)

// ❌ Bad
queryKey: ['incidents', 'list', filters]
```

### 3. Filter Synchronization

When filters change, queries automatically refetch due to query key changes:

```typescript
function Dashboard() {
  const filters = useFilterStore();
  
  // This query automatically refetches when filters change
  const { data } = useQuery({
    queryKey: queryKeys.incidents.list(filters),
    queryFn: () => fetchIncidents(filters),
  });
}
```

### 4. Optimistic Updates

For mutations, use optimistic updates:

```typescript
const mutation = useMutation({
  mutationFn: updateIncident,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: queryKeys.incidents.detail(id) });
    
    // Snapshot previous value
    const previous = queryClient.getQueryData(queryKeys.incidents.detail(id));
    
    // Optimistically update
    queryClient.setQueryData(queryKeys.incidents.detail(id), newData);
    
    return { previous };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(queryKeys.incidents.detail(id), context.previous);
  },
  onSettled: () => {
    // Refetch after mutation
    queryClient.invalidateQueries({ queryKey: queryKeys.incidents.detail(id) });
  },
});
```

### 5. Persistence

Only persist user preferences, not UI state or filters:

```typescript
// ✅ Persisted (userPreferencesStore)
- Saved views
- Favorite regions
- Chart preferences

// ❌ Not persisted (filterStore, uiStore)
- Current filters
- Sidebar state
- Mobile menu state
```

## Testing

### Testing Zustand Stores

```typescript
import { renderHook, act } from '@testing-library/react';
import { useFilterStore } from '@/store';

describe('filterStore', () => {
  it('should update date range', () => {
    const { result } = renderHook(() => useFilterStore());
    
    act(() => {
      result.current.setDateRange({ start: '2024-01-01', end: '2024-12-31' });
    });
    
    expect(result.current.dateRange).toEqual({
      start: '2024-01-01',
      end: '2024-12-31',
    });
  });
});
```

### Testing with React Query

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useIncidents', () => {
  it('should fetch incidents', async () => {
    const { result } = renderHook(() => useIncidents(), {
      wrapper: createWrapper(),
    });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});
```

## Troubleshooting

### Store not updating

1. Check if you're using the correct action
2. Verify DevTools to see if action is dispatched
3. Ensure you're not mutating state directly

### Query not refetching

1. Check if query key includes all dependencies
2. Verify staleTime configuration
3. Check if query is enabled
4. Look at React Query DevTools

### Persistence not working

1. Check localStorage in browser DevTools
2. Verify persist middleware is configured
3. Check for localStorage quota errors
4. Ensure storage key is unique

## Performance Tips

1. **Memoize selectors**: Use shallow equality for store selectors
2. **Debounce filters**: Debounce search queries to reduce API calls
3. **Paginate data**: Use pagination for large datasets
4. **Prefetch data**: Prefetch data on hover for better UX
5. **Cache strategically**: Set appropriate staleTime based on data volatility

## Migration Guide

If you need to migrate from another state management solution:

1. Identify server state vs client state
2. Move server state to TanStack Query
3. Move client state to appropriate Zustand store
4. Update components to use new hooks
5. Test thoroughly
6. Remove old state management code

## Resources

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
