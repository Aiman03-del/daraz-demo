import { Card, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"

export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string | number
  icon: ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold">
            {value}
          </p>
        </div>
        {icon}
      </CardContent>
    </Card>
  )
}
