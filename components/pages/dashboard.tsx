'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toRupee } from "@/lib/currency-formater"
import { DashboardData } from "@/types/dashboard"
import { ArrowRightCircle, ListOrdered, Package2, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BarChart, LineChart, PieChart } from "recharts"

export function Dashboard({ data }: { data: DashboardData }) {
    const {
        totalSales,
        newOrders,
        topSellingProducts,
        newCustomers,
        recentOrders,
        newProducts,
        recentCustomers,
        salesByCategory,
    } = data;

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <p>Total Sales</p>
                            <CardDescription>Last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="text-lg font-bold">{toRupee(totalSales)}</div>
                            <div className="flex items-center gap-1 text-green-500">
                                <Package2 className="h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <p>New Orders</p>
                            <CardDescription>Last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="text-lg font-bold">{newOrders}</div>
                            <div className="flex items-center gap-1 text-red-500">
                                <ListOrdered className="h-4 w-4" />

                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <p className="w-full">Top selling  Products</p>
                            <CardDescription>Last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="text-lg font-bold">{topSellingProducts.length}</div>
                            <div className="flex items-center gap-1 text-green-500">
                                <Package2 className="h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <p>New Customers</p>
                            <CardDescription>Last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="text-lg font-bold">{newCustomers}</div>
                            <div className="flex items-center gap-1 text-green-500">
                                <Users className="h-4 w-4" />

                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <p>Customer Analytics</p>
                        </CardHeader>
                        <CardContent>
                            <LineChart className="w-full aspect-[4/3]" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <p>Sales by Product Category</p>
                        </CardHeader>
                        <CardContent>
                            <PieChart
                                data={salesByCategory.map((category) => ({
                                    id: category.name,
                                    value: category.products.reduce(
                                        (sum, product) =>
                                            sum + product.orders.reduce((orderSum, order) => orderSum + order.totalPrice, 0),
                                        0
                                    ),
                                }))}
                                className="w-full aspect-square"
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <p>Top Performing Channels</p>
                        </CardHeader>
                        <CardContent>
                            <BarChart className="w-full aspect-[4/3]" />
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <p>Recent Orders</p>
                            <CardDescription>
                                <Link href="/admin/orders" className="text-primary">
                                    View all
                                </Link>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <Link href={`/admin/orders/${order.id}`} className="font-medium">
                                                    #{order.id.slice(0, 8)}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{order.user.name}</TableCell>
                                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={order.status === 'DELIVERED' ? 'secondary' : 'outline'}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{toRupee(order.totalPrice)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <p>New Products</p>
                            <CardDescription>
                                <Link href="/admin/products" className="text-primary">
                                    View all
                                </Link>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {newProducts.map((product) => (
                                    <li key={product.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={product.image[0]?.url}
                                                width={40}
                                                height={40}
                                                alt={product.name}
                                                className="rounded-md"
                                                style={{ aspectRatio: "40/40", objectFit: "cover" }}
                                            />
                                            <div>
                                                <div className="font-medium">{product.name}</div>
                                                <div className="text-sm text-muted-foreground">{toRupee(product.price)}</div>
                                            </div>
                                        </div>
                                        <Link href={'/admin/products/new'}>
                                            <Button variant="outline" size="sm">
                                                Add
                                            </Button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <p>Recent Customers</p>
                            <CardDescription>
                                <Link href="/admin/accounts" className="text-primary">
                                    View all
                                </Link>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {recentCustomers.map((customer) => (
                                    <li key={customer.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-6 h-6 border">
                                                {customer.image && <AvatarImage src={customer.image} alt={customer.name} />}
                                                <AvatarFallback>{customer.name.slice(0, 1).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Link href={`/admin/accounts/${customer.id}`} className="font-medium">{customer.name}</Link>
                                                <div className="text-[12px] text-muted-foreground">{customer.email}</div>
                                            </div>
                                        </div>
                                        <Link href={`/admin/accounts/${customer.id}`}>
                                            <ArrowRightCircle className="w-4 h-4" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}