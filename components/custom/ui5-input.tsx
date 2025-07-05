import React from "react";
import { Input } from "@ui5/webcomponents-react";

interface Ui5InputProps {
  type: "Text" | "Password" | "Email" | "Number" | "Tel" | "Search";
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export default function Ui5Input({
  type,
  icon,
  placeholder,
  className,
}: Ui5InputProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      icon={icon ? <span>{icon}</span> : undefined}
      className={`h-7 ${className || ""}`}
    />
  );
}
