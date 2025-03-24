"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/react";

interface ComboboxProps {
  onSelected: (value: string) => void;
  editor: Editor | null;
  children: (props: {
    onSelect: (value: string) => void;
    value: string;
  }) => React.ReactNode;
}

export function ComboboxCustom({
  editor,
  onSelected,
  children,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  if (!editor) return;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between">
          Select...
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No found.</CommandEmpty>
            <CommandGroup>
              {children({
                onSelect: (currentValue: string) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onSelected(currentValue);
                },
                value,
              })}
              {/* {data.map((d) => (
                <CommandItem
                  key={d.value}
                  value={d.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelected(currentValue);
                  }}>
                  <d.icon />
                  {d.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === d.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))} */}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
