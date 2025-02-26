"use client"

import { useState, useEffect } from "react"

interface Activity {
  id: string
  type: "house_posted" | "visit_requested" | "house_sold" | "house_rented"
  description: string
  date: string
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Fetch activities from your API
    // This is a mock implementation
    const mockActivities: Activity[] = [
      { id: "1", type: "house_posted", description: "You posted a new house: Modern Apartment", date: "2023-06-10" },
      { id: "2", type: "visit_requested", description: "Alice requested a visit to Cozy Cottage", date: "2023-06-12" },
      { id: "3", type: "house_sold", description: "Your house Luxury Villa was sold", date: "2023-06-15" },
      { id: "4", type: "house_rented", description: "Your apartment City View was rented", date: "2023-06-18" },
    ]
    setActivities(mockActivities)
  }, [])

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "house_posted":
        return "🏠"
      case "visit_requested":
        return "👀"
      case "house_sold":
        return "💰"
      case "house_rented":
        return "🔑"
      default:
        return "📝"
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{getActivityIcon(activity.type)}</span>
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}