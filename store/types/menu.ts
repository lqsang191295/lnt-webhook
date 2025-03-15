import { ElementType } from "react";

export type Item = {
  title: string;
  url: string;
  icon?: ElementType;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};
