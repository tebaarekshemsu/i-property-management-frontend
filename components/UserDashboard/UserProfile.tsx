"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

export function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    invitation_code: "",
    phone_no: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [token, setToken] = useState<string | null>(null); // Initially null

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res);

        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        setIsEditing(false);
        setUser(data);
        // Success toast with 5-second delay
        toast.success("Profile updated successfully!", {
          autoClose: 3000, // Toast will stay for 5 seconds
          pauseOnHover: true, // Pause on hover
          draggable: true, // Allow drag
        });
      } else {
        toast.error(data.message || "Failed to update profile.", {
          autoClose: 5000, // Toast will stay for 5 seconds
          pauseOnHover: true, // Pause on hover
          draggable: true, // Allow drag
        });
        console.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating profile.", {
        autoClose: 5000, // Toast will stay for 5 seconds
        pauseOnHover: true, // Pause on hover
        draggable: true, // Allow drag
      });
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="invitation_code"
              className="block text-sm font-medium text-gray-700"
            >
              Invitation Code
            </label>
            <input
              type="text"
              id="invitation_code"
              value={user.invitation_code}
              onChange={(e) =>
                setUser({ ...user, invitation_code: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={user.phone_no}
              onChange={(e) => setUser({ ...user, phone_no: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Invitation Code:</strong> {user.invitation_code}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone_no}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}
      {/* Add ToastContainer here */}
      <ToastContainer />
    </div>
  );
}
