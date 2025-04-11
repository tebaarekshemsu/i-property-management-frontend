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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(Paths.authPath()); // Redirect to login if no token
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
      router.push(Paths.authPath());
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAuthenticated) {
    return null; // Or a specific "Not Authenticated" message if you prefer
  }

  return <>{children}</>;
}

// Optional: Create a basic Unauthorized page if you haven't already
function UnauthorizedPage() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link href="/user">Go back to home</Link>
    </div>
  );
}
export { UnauthorizedPage };
