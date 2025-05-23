"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormInput } from "./reusable/FormInput";
import { useAuth } from "@/lib/hooks/useAuth";

export function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    isLogin,
    setIsLogin,
    identifier,
    setIdentifier,
    password,
    setPassword,
    name,
    setName,
    invitationCode,
    setInvitationCode,
    error,
    handleSubmit: originalHandleSubmit,
  } = useAuth();

  const handleBack = () => {
    router.push("/user");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await originalHandleSubmit(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          disabled={isLoading}
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back to homepage</span>
        </button>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <>
                <FormInput
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Full Name"
                  disabled={isLoading}
                />
                <FormInput
                  id="invitation_code"
                  name="invitation_code"
                  type="text"
                  label="Invitation Code (Optional)"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  placeholder="Invitation Code"
                  disabled={isLoading}
                />
              </>
            )}
            <FormInput
              id="identifier"
              name="identifier"
              type="text"
              label="Phone Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder="Enter your phone number"
              disabled={isLoading}
            />
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Password"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="mr-2 h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  {isLogin ? "Signing in..." : "Signing up..."}
                </>
              ) : (
                isLogin ? "Sign in" : "Sign up"
              )}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
