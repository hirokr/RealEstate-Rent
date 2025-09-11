"use client";

import React, { useEffect, createContext, useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService, AuthUser } from "@/lib/auth";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    role: "tenant" | "manager";
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: loggedInUser } = await authService.login({
        email,
        password,
      });
      setUser(loggedInUser);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    role: "tenant" | "manager";
  }) => {
    try {
      const { user: registeredUser } = await authService.register(data);
      setUser(registeredUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push("/landing");
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const isAuthPage = pathname.match(/^\/(login|register)$/);
  const isDashboardPage =
    pathname.startsWith("/managers") || pathname.startsWith("/tenants");
  const isPublicPage = pathname.startsWith("/search") || pathname === "/";

  // Redirect logic
  useEffect(() => {
    if (isLoading) return;

    // Redirect authenticated users away from auth pages
    if (user && isAuthPage) {
      const redirectPath =
        user.role === "manager" ? "/managers/properties" : "/search";
      router.push(redirectPath);
      return;
    }

    if (!user && isDashboardPage) {
      router.push("/landing");
      return;
    }
  }, [user, isAuthPage, isDashboardPage, isLoading, router]);

  return <>{children}</>;
};

const AuthProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Auth>{children}</Auth>
    </AuthProvider>
  );
};

export default AuthProviderWrapper;
