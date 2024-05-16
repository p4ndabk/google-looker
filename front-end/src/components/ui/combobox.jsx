import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

export function ComboBox({ values, placeholder, field }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateUrl = (selectedValues) => {
    searchParams.set(field, selectedValues.join(","));
    setSearchParams(searchParams, { replace: true });
  };

  React.useEffect(() => {
    const selected = searchParams.get(field);
    if (selected) {
      setSelectedValues(selected.split(","));
    }
  }, [searchParams, field]);

  React.useEffect(() => {
    if (!selectedValues.length) {
      searchParams.delete(field);
      setSearchParams(searchParams, { replace: true });
      return;
    }
    updateUrl(selectedValues);
  }, [selectedValues]);

  const toggleValue = (currentValue) => {
    const newSelectedValues = selectedValues.includes(currentValue)
      ? selectedValues.filter((value) => value !== currentValue)
      : [...selectedValues, currentValue];
    setSelectedValues(newSelectedValues);
  };

  const selectedLabels = selectedValues
    .map((value) => values.find((item) => item === value))
    .filter(Boolean)
    .join(", ");

  const sortedValues = [...values].sort((a, b) => {
    const aSelected = selectedValues.includes(a);
    const bSelected = selectedValues.includes(b);
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-32 justify-between bg-[#394053] border-[#ffffff33] hover:bg-[#51596c] h-max px-2 py-1 rounded-[2px]"
          title={selectedLabels.length > 0 ? selectedLabels : placeholder}
        >
          <span className="w-full truncate">
            {selectedLabels.length > 0 ? selectedLabels : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0 rounded-none">
        <Command className=" max-h-96">
          <CommandInput placeholder="Search items..." className="h-9" />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup className="commandCustomScroll overflow-auto">
            {sortedValues.map((item) => (
              <CommandItem
                key={`${field}-${item}`}
                value={item}
                onSelect={() => {
                  toggleValue(item);
                }}
              >
                {item}

                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedValues.includes(item) ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
