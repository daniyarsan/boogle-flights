"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { ToastProvider } from "@/providers/ToastProvider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <LoadingProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </LoadingProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
