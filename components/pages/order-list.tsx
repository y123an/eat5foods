'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Order, Product, TransactionLog, User, OrderStatus } from "@prisma/client"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { updateOrderStatus } from "@/lib/actions/order-action"
import { toast } from "@/components/ui/use-toast"

type OrderWithDetails = Order & {
    user: Pick<User, 'name' | 'email'>
    product: Pick<Product, 'name'>
    TransactionLog: TransactionLog | null
}

export default function OrdersList({
    initialOrders,
    totalPages,
    currentPage
}: {
    initialOrders: OrderWithDetails[],
    totalPages: number,
    currentPage: number
}) {
    const [orders, setOrders] = useState(initialOrders)
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleStatusChange = (status: string) => {
        const params = new URLSearchParams(searchParams)
        if (status === "ALL") {
            params.delete('status')
        } else {
            params.set('status', status)
        }
        params.set('page', '1')
        router.push(`/admin/orders?${params.toString()}`)
    }

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(`/admin/orders?${params.toString()}`)
    }

    const handleOrderStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
        const result = await updateOrderStatus(orderId, newStatus)
        if (result.success) {
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ))
            toast({
                title: "Order status updated",
                description: `Order ${orderId} status changed to ${newStatus}`,
            })
        } else {
            toast({
                title: "Failed to update order status",
                description: result.error,
                variant: "destructive",
            })
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="px-4 flex  flex-col md:flex-row md:justify-between md:items-center" >
                <CardTitle>Orders Management</CardTitle>
                <div className="flex justify-between items-center">
                    <Select
                        onValueChange={handleStatusChange}
                        defaultValue={searchParams.get('status') || 'ALL'}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Statuses</SelectItem>
                            <SelectItem value="NOT_DELIVERED">Not Delivered</SelectItem>
                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total Price</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>...{order.id.slice(-3)}</TableCell>
                                <TableCell>{order.user.name}</TableCell>
                                <TableCell>{order.product.name}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>₹{order.totalPrice.toFixed(2)}</TableCell>
                                <TableCell>{format(new Date(order.createdAt), 'PP')}</TableCell>
                                <TableCell>
                                    <Select
                                        onValueChange={(newStatus) => handleOrderStatusUpdate(order.id, newStatus as OrderStatus)}
                                        defaultValue={order.status}
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Update status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NOT_DELIVERED">Not Delivered</SelectItem>
                                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {orders.length > 0 && <div className="flex items-center justify-end space-x-2 py-4 px-4"> {/* Added padding */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <span className="text-sm"> {currentPage} of {totalPages}</span> {/* Added page count */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>}
            </CardContent>
        </Card>
    )
}