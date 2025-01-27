export default function Page() {
    return (
        <main>

        </main>
    );
}
// "use client";

// import PageLoader from "@/components/shared/loaders/overlay-loader";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { toRupee } from "@/lib/currency-formater";
// import { deleteOrder, getOrder, updateOrderStatus } from "@/services/order-service";
// import { Order, OrderItem } from "@/types/order";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";


// export default function OrderDetailPage() {
//     const { id } = useParams<{ id: string }>();
//     const [order, setOrder] = useState<Order | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const router = useRouter();

//     useEffect(() => {
//         const loadOrder = async () => {
//             setLoading(true);
//             try {
//                 const orderData = await getOrder(id);
//                 console.log("ORDER", orderData)
//                 setOrder(orderData);
//             } catch (error) {
//                 console.error("Error loading order:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadOrder();
//     }, []);

//     const handleUpdateStatus = async (newStatus: Order['status']) => {
//         if (order) {
//             try {
//                 setLoading(true);
//                 await updateOrderStatus(order.id, newStatus);
//                 setOrder({ ...order, status: newStatus });
//             } catch (error) {
//                 console.error("Error updating status:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     const handleDeleteOrder = async () => {
//         if (order) {
//             try {
//                 setLoading(true);
//                 await deleteOrder(order.id);
//                 router.push("/admin/orders");
//             } catch (error) {
//                 console.error("Error deleting order:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return null

//     // return (
//     //     // <Card>
//     //     //     <PageLoader visible={loading} />
//     //     //     <CardHeader>
//     //     //         <CardTitle>Order Details</CardTitle>
//     //     //         <CardDescription>Details of the order #{order?.id}</CardDescription>
//     //     //     </CardHeader>
//     //     //     <CardContent>
//     //     //         <div className="mb-4">
//     //     //             <h3 className="text-lg font-semibold">Order Items</h3>
//     //     //             <ul className="list-disc pl-5">
//     //     //                 {order.map((item: OrderItem) => (
//     //     //                     <li key={item?.id}>
//     //     //                         <div className="flex justify-between">
//     //     //                             <span>{item.product}</span>
//     //     //                             <span>{item.quantity} x</span>
//     //     //                         </div>
//     //     //                     </li>
//     //     //                 ))}
//     //     //             </ul>
//     //     //         </div>
//     //     //         <div className="mb-4">
//     //     //             <h3 className="text-lg font-semibold">Order Summary</h3>
//     //     //             <p>Total: {toRupee(order.total)}</p>
//     //     //             <p>Status: {order.status}</p>
//     //     //             <p>Ordered by: {order.user}</p>
//     //     //             <p>Ordered at: {new Date(order.createdAt).toLocaleString()}</p>
//     //     //         </div>
//     //     //         <div className="flex space-x-4">
//     //     //             <Button
//     //     //             // variant={order'?'default'}
//     //     //             // onClick={() => handleUpdateStatus("delivered")}
//     //     //             // disabled={order.status === "delivered"}
//     //     //             >
//     //     //                 Mark as Delivered
//     //     //             </Button>
//     //     //             <Button
//     //     //                 // variant="pending"
//     //     //                 onClick={() => handleUpdateStatus("pending")}
//     //     //                 disabled={order.status === "pending"}
//     //     //             >
//     //     //                 Mark as Pending
//     //     //             </Button>
//     //     //             <Button
//     //     //                 // variant="warn"
//     //     //                 onClick={() => handleUpdateStatus("canceled")}
//     //     //                 disabled={order.status === "canceled"}
//     //     //             >
//     //     //                 Cancel Order
//     //     //             </Button>
//     //     //             <Button
//     //     //                 variant="destructive"
//     //     //                 onClick={handleDeleteOrder}
//     //     //             >
//     //     //                 Delete Order
//     //     //             </Button>
//     //     //         </div>
//     //     //     </CardContent>
//     //     // </Card>
//     // );
// }
