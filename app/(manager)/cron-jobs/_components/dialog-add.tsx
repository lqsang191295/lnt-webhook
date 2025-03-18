import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypeJob } from "@/store/types/task";
import { ChevronsUpDown, CirclePlus } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastError, ToastSuccess } from "@/lib/toast";
import { post } from "@/api/client";

const valueStatus = [
  {
    value: "0",
    label: "Stop",
  },
  {
    value: "1",
    label: "Run",
  },
];

export function DialogAdd({ onRefresh }: { onRefresh: () => void }) {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<TypeJob>({
    name: "",
    func: "",
    status: false,
    time: "",
  });

  const save = async () => {
    try {
      console.log("aaaaaaaaa ", model);
      const result = await post("/module/HT_CronJobs/add", {
        ...model,
      });

      if (result.status === "success") {
        ToastSuccess("Thêm cron job thành công");

        setOpen(false);

        if (onRefresh) onRefresh();
      } else if (result.status === "error") {
        ToastError("Thêm cron job thất bại");
      }
    } catch (ex) {
      console.log("ex = ", ex);
      ToastError("Có lỗi xảy ra!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2 cursor-pointer">
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
          <DialogDescription>Add Cron Job</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={model?.name}
              className="col-span-3"
              onChange={(e) =>
                setModel((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="func" className="text-right">
              Func
            </Label>
            <Input
              id="func"
              value={model?.func}
              className="col-span-3"
              onChange={(e) =>
                setModel((prev) => ({ ...prev, func: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              value={model?.time}
              className="col-span-3"
              onChange={(e) =>
                setModel((prev) => ({ ...prev, time: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between">
                  {
                    valueStatus.find(
                      (v) => v.value === (model.status ? "1" : "0")
                    )?.label
                  }
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {valueStatus.map((v) => (
                        <CommandItem
                          key={v.value}
                          value={v.value}
                          onSelect={(currentValue) => {
                            setModel((prev) => ({
                              ...prev,
                              status: currentValue === "0" ? false : true,
                            }));
                            setOpen(false);
                          }}>
                          {v.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={save}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
