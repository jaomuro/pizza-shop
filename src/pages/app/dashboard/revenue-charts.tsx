import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDaylyRevenueInPeriod } from '@/api/get-dayly-revenue-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dataDailyRenevue } = useQuery({
    queryKey: ['metrics', 'dayly-revenue-in-period', dateRange],
    queryFn: () =>
      getDaylyRevenueInPeriod({ from: dateRange?.from, to: dateRange?.to }),
  })

  const chartData = useMemo(() => {
    return dataDailyRenevue?.map((item) => {
      return {
        date: item.date,
        receipt: item.receipt / 100,
      }
    })
  }, [dataDailyRenevue])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row  items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {dataDailyRenevue ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              ></YAxis>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={16}
              ></XAxis>
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet['500']}
              ></Line>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex w-full items-center justify-center">
            <Loader2 size={30} className="h-[240px] animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
