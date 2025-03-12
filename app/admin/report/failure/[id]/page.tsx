import { FailureReportForm } from "@/components/Admin/FailureReportForm"

export default function FailureReportPage({ params }: { params: { id: string } }) {
  return <FailureReportForm houseId={params.id} />
}

