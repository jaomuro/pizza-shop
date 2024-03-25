import { api } from '@/lib/axios'

interface GetDaylyRevenueInPeriodParams {
  from?: Date
  to?: Date
}

type GetDaylyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDaylyRevenueInPeriod({
  from,
  to,
}: GetDaylyRevenueInPeriodParams) {
  const response = await api.get<GetDaylyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
