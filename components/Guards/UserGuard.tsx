"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Paths from "@/lib/path";

interface UserGuardProps {
  children: React.ReactNode;
}

export function UserGuard({ children }: UserGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authPath = Paths.authPath(); // Get the login path

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    if (!token && currentPath !== authPath) {
      // If no token and not already on the login page, store the current path
      localStorage.setItem("redirectAfterLogin", currentPath);
      router.push(authPath); // Redirect to login
      setIsLoading(false);
      return;
    } else if (!token && currentPath === authPath) {
      // If no token and already on the login page, no need to redirect again
      setIsLoading(false);
      return;
    }

    try {
      const decodedToken: { role?: string } = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString("utf-8")
      );

      if (decodedToken?.role !== "user") {
        router.push("/auth"); // Redirect if role is not "user"
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token"); // Clear invalid token
      router.push("Paths.authPath()");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [router, authPath]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAuthenticated) {
    return null; // Or a specific "Not Authenticated" message if you prefer
  }

  return <>{children}</>;
}

function UnauthorizedPage() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link href="/user">Go back to home</Link>
    </div>
  );
}

// You can export this as well if you want to use it directly as a page
export { UnauthorizedPage };
