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
import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Props {
  variant: "type" | "language";
  options?: string[];
}

const FilterBar = ({ variant, options = [] }: Props) => {
  const { filters, setFilters } = useUiStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allOptions = ["all", ...options];

  const displayName = variant === "type" ? "Type" : "Language";
  const currentValue =
    variant === "type" ? filters.type : filters.language || "all";

  const capitalize = (str: string) => {
    if (str === "all") return "All";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    setFilters({ [variant]: option });
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop: Dropdown */}
      <div className="hidden md:block relative" ref={dropdownRef}>
        <Button
          variant="outline"
          className="gap-2 border-[#0587FF] text-[#0587FF] hover:bg-[#0587FF]/5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {displayName} <ChevronDown className="h-4 w-4" />
        </Button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E5E7EB] rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto">
            <div className="p-2">
              <div className="px-3 py-2 text-sm font-semibold text-[#262626] border-b border-[#E5E7EB] mb-2">
                Select {displayName}
              </div>
              {allOptions.map((option) => (
                <button
                  key={option}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#262626] hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  <span>{capitalize(option)}</span>
                  {currentValue === option && (
                    <Check className="h-4 w-4 text-[#0587FF]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Sheet */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="outline"
            className="gap-2 border-[#0587FF] text-[#0587FF] cursor-pointer"
          >
            {displayName} <ChevronDown className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[70vh]">
          <SheetHeader>
            <SheetTitle className="text-[#262626] text-center">
              Select {displayName}
            </SheetTitle>
          </SheetHeader>
          <div className="pt-4 pb-6 px-4 overflow-y-auto max-h-[calc(70vh-80px)]">
            {allOptions.map((option) => (
              <button
                key={option}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-md mb-2 transition-colors cursor-pointer ${
                  currentValue === option
                    ? "bg-[#0587FF] text-white"
                    : "bg-gray-50 text-[#262626] hover:bg-gray-100"
                }`}
                onClick={() => {
                  setFilters({ [variant]: option });
                }}
              >
                <span>{capitalize(option)}</span>
                {currentValue === option && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FilterBar;
