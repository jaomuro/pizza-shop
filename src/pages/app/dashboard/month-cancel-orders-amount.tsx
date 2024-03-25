import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthCancelOrdersAmountCard() {
  const { data: dataMonthCancelOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-cancelded-order-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      {dataMonthCancelOrdersAmount && (
        <CardContent>
          <span className="text-2xl font-bold tracking-tight">
            {dataMonthCancelOrdersAmount?.amount.toLocaleString('pt-BR')}
          </span>
          <p className="text-sm text-muted-foreground">
            {dataMonthCancelOrdersAmount?.diffFromLastMonth <= 0 ? (
              <>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{dataMonthCancelOrdersAmount.diffFromLastMonth}%
                </span>{' '}
                em relação ao mês anterior
              </>
            ) : (
              <>
                <span className="text-rose-500 dark:text-rose-400">
                  {dataMonthCancelOrdersAmount.diffFromLastMonth}%
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
