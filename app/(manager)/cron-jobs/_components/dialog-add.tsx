import { Button } from "@/components/ui/button";
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
import { ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastError, ToastSuccess } from "@/lib/toast";
import { post } from "@/api/client";
import DialogCommon from "@/components/dialog-common";
import { useDialogStore } from "@/store/DialogStore";

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
  const model = (useDialogStore((state) => state.data) || {
    name: "",
    func: "",
    status: false,
    time: "",
  }) as TypeJob;
  const mode = useDialogStore((state) => state.mode);
  const setModel = useDialogStore((state) => state.setData);
  // const [model, setModel] = useState<TypeJob>(
  //   data || {
  //     name: "",
  //     func: "",
  //     status: false,
  //     time: "",
  //   }
  // );

  console.log("data ============ ", model);

  const save = async () => {
    let endpoint: string = "";

    switch (mode) {
      case "add":
        endpoint = "/module/HT_CronJobs/add";
        break;
      case "edit":
        endpoint = "/module/HT_CronJobs/update";
        break;
    }

    try {
      console.log("aaaaaaaaa ", model);
      const result = await post(endpoint, {
        ...model,
      });

      if (result.status === "success") {
        ToastSuccess(result.message);

        if (onRefresh) onRefresh();
      } else if (result.status === "error") {
        ToastError(result.message);
      }
    } catch (ex) {
      console.log("ex = ", ex);
      ToastError("Có lỗi xảy ra!");
    }
  };

  return (
    <DialogCommon onSave={save}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={model?.name}
            className="col-span-3"
            onChange={(e) => setModel({ name: e.target.value })}
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
            onChange={(e) => setModel({ func: e.target.value })}
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
            onChange={(e) => setModel({ time: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between">
                {
                  valueStatus.find(
                    (v) => v.value === (model?.status ? "1" : "0")
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
                          setModel({
                            status: currentValue === "0" ? false : true,
                          });
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
    </DialogCommon>
  );
}
