"use client";

import React, { useState } from "react";
import { mockLogin } from "@/lib/auth";
import { useAuth } from "@/app/(auth)/authProvider";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [useMockAuth, setUseMockAuth] = useState(false);
  const [mockRole, setMockRole] = useState<"tenant" | "manager">("tenant");
  const { login } = useAuth();
  const router = useRouter();

  const handleRealLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      // The auth provider will handle the redirect
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter an email for mock login");
      return;
    }

    mockLogin(email, mockRole);
    
    // Redirect based on role
    if (mockRole === "manager") {
      router.push("/managers/properties");
    } else {
      router.push("/search");
    }
    
    // Refresh the page to update auth state
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!useMockAuth}
                  onChange={() => setUseMockAuth(false)}
                  className="mr-2"
                />
                Real Login
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={useMockAuth}
                  onChange={() => setUseMockAuth(true)}
                  className="mr-2"
                />
                Mock Login
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={useMockAuth ? handleMockLogin : handleRealLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {!useMockAuth && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {useMockAuth && (
              <div>
                <label htmlFor="role" className="sr-only">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={mockRole}
                  onChange={(e) => setMockRole(e.target.value as "tenant" | "manager")}
                >
                  <option value="tenant">Tenant</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {!useMockAuth && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Sign up here
                </button>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;