import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { RootRouter } from "./server";

export const trpc = createTRPCReact<RootRouter>({});
export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: "/api/trpc" })],
});
