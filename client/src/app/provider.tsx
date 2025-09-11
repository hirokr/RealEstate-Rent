"use client";

import StoreProvider from "@/state/redux";
import AuthProvider from "./(auth)/authProvider";
import { Toaster } from "@/components/ui/sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider >
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </StoreProvider>
  );
};

export default Provider;