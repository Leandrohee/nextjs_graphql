/**
 * This file is where i set up the useQuery from tanStack
 *
 * The ApiProvider works with axios to fetch data. Check out utils/axios.ts
 */

'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function TanStackProvider({ children }: { children: any }) {
  //Creating the client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2 * 60 * 1000, //Data is considered "fresh" for 2 minute
            gcTime: 10 * 60 * 1000, //Data will be remove from cash if not used for 10 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
