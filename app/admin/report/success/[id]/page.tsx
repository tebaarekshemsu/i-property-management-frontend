import { SuccessReportForm } from "@/components/Admin/SuccessReportForm"

export default function SuccessReportPage({ params }: { params: { id: string } }) {
  return <SuccessReportForm houseId={params.id} />
}

