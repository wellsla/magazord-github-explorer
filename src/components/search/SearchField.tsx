"use client";

import { Input } from "@/ui/input";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchField = ({ value, onChange, placeholder = "Search..." }: Props) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#989898]" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 text-[#262626] border-[#E5E7EB] focus:ring-[#0587FF]"
      />
    </div>
  );
};

export default SearchField;
