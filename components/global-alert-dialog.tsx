"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

type AlertDialogContextType = {
  showAlert: (
    title: string,
    description: string,
    onConfirm?: () => void
  ) => void;
};

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined
);

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "useAlertDialog must be used within an AlertDialogProvider"
    );
  }
  return context;
};

export const GloabalAlertDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(
    undefined
  );

  const showAlert = (
    title: string,
    description: string,
    onConfirm?: () => void
  ) => {
    setTitle(title);
    setDescription(description);
    setOnConfirm(() => onConfirm);
    setIsOpen(true);
  };

  return (
    <AlertDialogContext.Provider value={{ showAlert }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onConfirm?.();
                setIsOpen(false);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
};
