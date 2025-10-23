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
import { ChevronDown } from "lucide-react";

interface Props {
  variant: "type" | "language";
  options?: string[];
}

const FilterBar = ({ variant, options = [] }: Props) => {
  const { filters, setFilters } = useUiStore();

  const allOptions = ["all", ...options];

  const displayName = variant === "type" ? "Type" : "Language";
  const currentValue =
    variant === "type" ? filters.type : filters.language || "all";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          {displayName}: {currentValue === "all" ? "All" : currentValue}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Select {displayName}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-2 pt-4">
          {allOptions.map((option) => (
            <Button
              key={option}
              variant={currentValue === option ? "default" : "outline"}
              className="justify-start"
              onClick={() => setFilters({ [variant]: option })}
            >
              {option === "all" ? "All" : option}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterBar;
