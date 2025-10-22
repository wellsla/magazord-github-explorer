"use client";

import { Button } from "@/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";
import { useUiStore } from "@/features/stores/useUiStore";
import { Input } from "@/ui/input";
import { RepoType } from "@/lib/types/repo";

interface Props {
  variant: "type" | "language";
  languages?: string[];
}

const FilterBar = ({ variant, languages }: Props) => {
  const { filters, setFilters } = useUiStore();

  const typeOptions: RepoType[] = [
    "all",
    "sources",
    "forks",
    "archived",
    "mirrors",
  ];

  let languageOptions: string[] = ["all"];
  if (languages) {
    languageOptions = [...languageOptions, ...languages];
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">Tipo</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[70vh]">
          <SheetHeader>
            <SheetTitle>Tipo</SheetTitle>
          </SheetHeader>
          <div className="grid gap-2 pt-4">
            {variant === "type" &&
              typeOptions.map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="type"
                    checked={filters.type === type}
                    onChange={() => setFilters({ type: type })}
                  />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </label>
              ))}
            {variant === "language" &&
              languageOptions.map((lang) => (
                <label key={lang} className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="language"
                    checked={
                      filters.language.toLowerCase() === lang.toLowerCase()
                    }
                    onChange={() => setFilters({ language: lang })}
                  />
                  <span>{lang.charAt(0).toUpperCase() + lang.slice(1)}</span>
                </label>
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterBar;
