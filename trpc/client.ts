import { createTRPCReact } from "@trpc/react-query";
import { RootRouter } from "./server";

export const trpc = createTRPCReact<RootRouter>({});
  