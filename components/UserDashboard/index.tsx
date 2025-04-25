"use client";

import { useState } from "react";
import { UserProfile } from "./UserProfile";
import { PostedHouses } from "./Houses";
import { VisitRequests } from "./VisitRequests";

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "posted", label: "Posted Houses" },
    { id: "visits", label: "Visit Requests" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="flex flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`mr-2 mb-2 px-4 py-2 rounded ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === "profile" && <UserProfile />}
        {activeTab === "posted" && <PostedHouses />}
        {activeTab === "visits" && <VisitRequests />}
      </div>
    </div>
  );
}
