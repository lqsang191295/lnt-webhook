import { rootRouter } from '@/trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: rootRouter,
    createContext: () => ({  })
  });
}
export { handler as GET, handler as POST };