import { useDialogStore } from "@/store/states/dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface DialogCommonProps {
  children: ReactNode;
  onSave: () => void;
}

const DialogCommon = ({ children, onSave }: DialogCommonProps) => {
  const { open, closeDialog } = useDialogStore();

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
          <DialogDescription>Add Cron Job</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit" onClick={onSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCommon;
