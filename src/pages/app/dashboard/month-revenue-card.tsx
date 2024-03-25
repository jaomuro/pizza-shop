import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthRevenueCard() {
  const { data: dataMonthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      {dataMonthRevenue && (
        <CardContent>
          <span className="text-2xl font-bold tracking-tight">
            R$ {(dataMonthRevenue?.receipt / 100).toLocaleString('pt-BR')}
          </span>
          <p className="text-sm text-muted-foreground">
            {dataMonthRevenue?.diffFromLastMonth >= 0 ? (
              <>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{dataMonthRevenue?.diffFromLastMonth}%
                </span>{' '}
                em relação ao mês anterior
              </>
            ) : (
              <>
                <span className="text-rose-500 dark:text-rose-400">
                  {dataMonthRevenue.diffFromLastMonth}%
                </span>{' '}
                em relação ao mês anterior
              </>
            )}
          </p>
        </CardContent>
      )}
    </Card>
  )
}
