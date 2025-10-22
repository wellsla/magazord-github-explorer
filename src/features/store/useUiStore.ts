import { create } from "zustand";
import { UiState } from "@/lib/types/store";

export const useUiStore = create<UiState>((set) => ({
  username: "",
  searchText: "",
  filters: { language: "All", type: "all", sort: "updated" },
  modals: { typeOpen: false, languageOpen: false },
  setUsername: (u) => set({ username: u }),
  setSearchText: (t) => set({ searchText: t }),
  setFilters: (p) => set((s) => ({ filters: { ...s.filters, ...p } })),
  toggleModal: (name, open) =>
    set((state) => ({
      modals: { ...state.modals, [name]: open ?? !state.modals[name] },
    })),
  resetFilters: () =>
    set({ filters: { language: "All", type: "all", sort: "updated" } }),
}));
