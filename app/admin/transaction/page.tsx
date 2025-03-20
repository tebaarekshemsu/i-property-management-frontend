import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Transactions</h2>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Transaction management interface will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

