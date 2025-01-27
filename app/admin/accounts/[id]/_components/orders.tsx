import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Order } from "@prisma/client";

type Props = {
    userOrders: Order[]
}
export default function MyOrders({ userOrders }: Props) {
    const orders = [
        { id: 1, date: "2023-09-23", status: "Delivered", total: "$45.99" },
        { id: 2, date: "2023-09-20", status: "Processing", total: "$32.50" },
        { id: 3, date: "2023-09-15", status: "Shipped", total: "$78.25" },
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>View and manage your order history.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-md p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Order #{order.id}</span>
                                <span className="text-sm text-gray-500">Date: {order.date}</span>
                            </div>
                            <div className="text-sm text-gray-600">Status: {order.status}</div>
                            <div className="text-sm text-gray-600">Total: {order.total}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}