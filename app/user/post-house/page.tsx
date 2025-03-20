import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PostHouseForm from "./post-house-form"

export default function PostHousePage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Post a New Property</CardTitle>
          <CardDescription>
            Fill out the form below to list your property on I Property Solution Marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostHouseForm />
        </CardContent>
      </Card>
    </div>
  )
}

