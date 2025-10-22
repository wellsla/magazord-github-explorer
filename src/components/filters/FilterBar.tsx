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
  options?: string[];
}

const FilterBar = ({ variant, options }: Props) => {
  const { filters, setFilters } = useUiStore();

  let allOptions: string[] = ["all"];
  if (options) {
    allOptions = [...allOptions, ...options];
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">
            {variant === "type" ? "Tipo" : "Linguagem"}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[70vh]">
          <SheetHeader>
            <SheetTitle>{variant === "type" ? "Tipo" : "Linguagem"}</SheetTitle>
          </SheetHeader>
          <div className="grid gap-2 pt-4">
            {allOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <Input
                  type="radio"
                  name={variant}
                  checked={filters[variant] === option}
                  onChange={() => setFilters({ [variant]: option as RepoType })}
                />
                <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
              </label>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterBar;
