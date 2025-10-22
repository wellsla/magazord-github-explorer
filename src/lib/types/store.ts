import type { RepoType, SortBy } from "@/lib/types/repo";

export type UiState = {
  username: string;
  searchText: string;
  filters: {
    language: string | "All";
    type: RepoType;
    sort: SortBy;
  };
  modals: {
    typeOpen: boolean;
    languageOpen: boolean;
  };
  setUsername: (u: string) => void;
  setSearchText: (t: string) => void;
  setFilters: (p: Partial<UiState["filters"]>) => void;
  toggleModal: (name: keyof UiState["modals"], open?: boolean) => void;
  resetFilters: () => void;
};
