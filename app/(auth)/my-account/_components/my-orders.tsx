'use client'

import { Order, Product, TransactionLog } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Package } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

type OrderWithDetails = Order & {
    product: Product;
    TransactionLog: TransactionLog | null;
}

export default function MyOrders({ orders }: { orders: OrderWithDetails[] }) {
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
                <CardDescription>View and manage your order history.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-3">
                                    <Package className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-lg">Order #{order.id}</span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Product</p>
                                    <p className="mt-1">{order.product.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Quantity</p>
                                    <p className="mt-1">{order.quantity}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Price</p>
                                    <p className="mt-1">₹{order.totalPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <Badge className="mt-1 capitalize">{order.status.toLowerCase().replace('_', ' ')}</Badge>
                                </div>
                            </div>
                            {order.TransactionLog && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm font-medium text-gray-500">Transaction ID</p>
                                    <p className="mt-1">{order.TransactionLog.transactionId}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}