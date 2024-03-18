import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthCancelOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold tracking-tight">32</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-2%</span> em
          relação ao mês anterior
        </p>
      </CardContent>
    </Card>
  )
}
