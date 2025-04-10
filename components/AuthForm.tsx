"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

type DecodedToken = {
  role: "user" | "admin" | "super-admin";
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password || (!isLogin && !name)) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      if (isLogin) {
        const body = new URLSearchParams();
        body.append("username", identifier);
        body.append("password", password);

        const res = await fetch("http://127.0.0.1:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        });

        const data = await res.json();

        if (!res.ok || !data.access_token) {
          throw new Error(data.detail || "Authentication failed");
        }

        const token = data.access_token;
        localStorage.setItem("token", token);

        const decoded = jwtDecode<DecodedToken>(token);

        console.log("Decoded token:", decoded); // Debugging line
        if (decoded.role === "admin") {
          router.push("/admin");
        } else if (decoded.role === "super-admin") {
          router.push("/super-admin");
        } else {
          router.push("/user");
        }
      } else {
        const res = await fetch("http://127.0.0.1:8000/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_no: identifier,
            name,
            password,
            invitation_code: invitationCode || "",
            invited_by: 0,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.status !== "ok") {
          throw new Error(data.msg || "Signup failed");
        }

        toast.success("Signup successful. Please log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        {isLogin ? "Sign in to your account" : "Create a new account"}
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          {!isLogin && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label
                  htmlFor="invitation_code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Invitation Code (Optional)
                </label>
                <input
                  id="invitation_code"
                  name="invitation_code"
                  type="text"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Invitation Code"
                />
              </div>
            </>
          )}
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
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
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isLogin
                ? "Need an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
