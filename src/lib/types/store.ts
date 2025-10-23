export type UiState = {
  username: string;
  searchText: string;
  filters: {
    language: string;
    type: string;
    sort: string;
  };
  modals: {
    typeOpen: boolean;
    languageOpen: boolean;
  };
  setUsername: (username: string) => void;
  setSearchText: (text: string) => void;
  setFilters: (filters: Partial<UiState["filters"]>) => void;
  toggleModal: (name: keyof UiState["modals"], open?: boolean) => void;
  resetFilters: () => void;
};
