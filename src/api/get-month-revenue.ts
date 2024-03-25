import { api } from '@/lib/axios'

export interface GetMonthOrdersAmountResponse {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    '/metrics/month-receipt',
  )

  return response.data
}
