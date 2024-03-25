import { api } from '@/lib/axios'

type PopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const response = await api.get<PopularProductsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
