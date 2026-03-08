import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Theme = 'light' | 'dark';

export interface UIState {
  // UI state
  sidebarOpen: boolean;
  filterPanelOpen: boolean;
  theme: Theme;
  mobileMenuOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleFilterPanel: () => void;
  setFilterPanelOpen: (open: boolean) => void;
  setTheme: (theme: Theme) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      sidebarOpen: true,
      filterPanelOpen: true,
      theme: 'light',
      mobileMenuOpen: false,

      // Actions
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),

      setSidebarOpen: (open) =>
        set({ sidebarOpen: open }, false, 'setSidebarOpen'),

      toggleFilterPanel: () =>
        set(
          (state) => ({ filterPanelOpen: !state.filterPanelOpen }),
          false,
          'toggleFilterPanel'
        ),

      setFilterPanelOpen: (open) =>
        set({ filterPanelOpen: open }, false, 'setFilterPanelOpen'),

      setTheme: (theme) => set({ theme }, false, 'setTheme'),

      toggleMobileMenu: () =>
        set(
          (state) => ({ mobileMenuOpen: !state.mobileMenuOpen }),
          false,
          'toggleMobileMenu'
        ),

      setMobileMenuOpen: (open) =>
        set({ mobileMenuOpen: open }, false, 'setMobileMenuOpen'),
    }),
    {
      name: 'ui-store',
      enabled: import.meta.env.DEV,
    }
  )
);
