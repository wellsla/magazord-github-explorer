"use client";

import { Input } from "@/ui/input";
import { useUiStore } from "@/features/stores/useUiStore";
import { Search } from "lucide-react";

interface Props {
  placeholder?: string;
}

const SearchField = ({ placeholder }: Props) => {
  const { searchText, setSearchText } = useUiStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleEnterKey}
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
        <Search className="h-4 w-4" />
      </span>
    </div>
  );
};

export default SearchField;
