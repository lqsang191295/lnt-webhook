'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface HeaderItem {
  key: string;
  title: string;
}

interface CustomDropdownTableProps {
  value: string;
  onValueChange: (val: string) => void;
  data?: Record<string, unknown>[];
  headers: HeaderItem[];
  keyValue: string;
  getLabel?: (val: string) => string;
  placeholder?: string;
}

export default function CustomDropdownTable({
  value,
  onValueChange,
  data,
  headers,
  keyValue,
  getLabel,
  placeholder = 'Chọn...',
}: CustomDropdownTableProps) {
  const [open, setOpen] = useState(false);

  if (!data) return null;

  const label = getLabel
    ? getLabel(value)
    : (data.find((d) => d[keyValue] === value)?.[headers[0].key] as string) ||
      placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-60 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableHead key={h.key} className="whitespace-nowrap">
                  {h.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={(item[keyValue] as string) || index}
                className="cursor-pointer hover:bg-accent"
                onClick={() => {
                  onValueChange(item[keyValue] as string);
                  setOpen(false);
                }}
              >
                {headers.map((h) => (
                  <TableCell
                    key={h.key}
                    className="px-2 py-1 whitespace-nowrap"
                  >
                    {String(item[h.key] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}
