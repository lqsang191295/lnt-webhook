import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useComboboxStore } from "@/store/ComboboxStore";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogCommonProps {
  data: Record<string, string>[];
  children: React.ReactNode;
}

const CommonCombobox = ({ data, children }: DialogCommonProps) => {
  const { open, selectedValue, setOpen, setSelectedValue } = useComboboxStore();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((d) => (
                <CommandItem
                  key={d.key}
                  value={d.value}
                  onSelect={() => {
                    setSelectedValue(d);
                    setOpen(false);
                  }}>
                  {d.value}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValue?.value === d.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CommonCombobox;
