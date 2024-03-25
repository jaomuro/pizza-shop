import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthOrdersAmountCard() {
  const { data: dataMonthOrderAmout } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      {dataMonthOrderAmout && (
        <CardContent>
          <span className="text-2xl font-bold tracking-tight">
            {dataMonthOrderAmout?.amount.toLocaleString('pt-BR')}
          </span>
          <p className="text-sm text-muted-foreground">
            {dataMonthOrderAmout?.diffFromLastMonth >= 0 ? (
              <>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{dataMonthOrderAmout.diffFromLastMonth}%
                </span>{' '}
                em relação ao mês anterior
              </>
            ) : (
              <>
                <span className="text-rose-500 dark:text-rose-400">
                  {dataMonthOrderAmout.diffFromLastMonth}%
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
