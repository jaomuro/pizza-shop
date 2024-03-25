import { DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { GetOrdersResponse } from '@/api/get-orders'
import { approveOrder } from '@/api/patch-approve-order'
import { cancelOrder } from '@/api/patch-cancel-order'
import { deliverOrder } from '@/api/patch-deliver-order'
import { dispatchOrder } from '@/api/patch-dispatch-order'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const queryClient = useQueryClient()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  function updateOrderStatus(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cachekey, cacheData]) => {
      if (!cacheData) {
        return null
      }
      queryClient.setQueryData<GetOrdersResponse>(cachekey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderfn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, { orderId }) {
        if (orderId) updateOrderStatus(orderId, 'canceled')
      },
    })
  const { mutateAsync: approveOrderfn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_, { orderId }) {
        if (orderId) updateOrderStatus(orderId, 'processing')
      },
    })
  const { mutateAsync: dispatchOrderfn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, { orderId }) {
        if (orderId) updateOrderStatus(orderId, 'delivering')
      },
    })
  const { mutateAsync: deliverOrderfn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_, { orderId }) {
        if (orderId) updateOrderStatus(orderId, 'delivered')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails
            open={isDetailsOpen}
            orderId={order.orderId}
          ></OrderDetails>
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus key={order.orderId} status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            onClick={() => approveOrderfn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            onClick={() => dispatchOrderfn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            onClick={() => deliverOrderfn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderfn({ orderId: order.orderId })}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
