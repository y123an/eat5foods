'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import Papa from "papaparse"
import * as XLSX from "xlsx"
import PageLoader from "../loaders/overlay-loader"


type Transaction = {
    id: string
    transactionId: string
    status: 'PENDING' | 'SUCCESS' | 'FAILED'
    amount: number
    orderId: string
    createdAt: string
    updatedAt: string
    payment: {
        id: string
        userId: string
        amount: number
        paymentDate: string
        paymentMethod: string
        user: {
            name: string
            email: string
        }
    }
    order: {
        id: string
        productId: string
        userId: string
        quantity: number
        status: 'DELIVERED' | 'NOT_DELIVERED' | 'SHIPPED'
        totalPrice: number
        product: {
            name: string
        }
        user: {
            name: string
            email: string
        }
    }
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 10

    useEffect(() => {
        fetchTransactions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    const fetchTransactions = async () => {
        setLoading(true)
        try {
            // Replace this with your actual API call
            const response = await fetch(`/api/transactions?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await response.json()
            setTransactions(data.transactions)
            setTotalPages(Math.ceil(data.total / itemsPerPage))
        } catch (error) {
            console.error("Error fetching transactions:", error)
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    const exportToCSV = () => {
        const csvData = transactions.map((transaction) => ({
            TransactionID: transaction.transactionId,
            Status: transaction.status,
            Amount: transaction.amount,
            OrderID: transaction.orderId,
            PaymentMethod: transaction.payment.paymentMethod,
            PaymentDate: new Date(transaction.payment.paymentDate).toLocaleString(),
            Buyer: transaction.order.user.name,
            BuyerEmail: transaction.order.user.email,
            Product: transaction.order.product.name,
            Quantity: transaction.order.quantity,
            TotalPrice: transaction.order.totalPrice,
            OrderStatus: transaction.order.status,
            CreatedAt: new Date(transaction.createdAt).toLocaleString(),
            UpdatedAt: new Date(transaction.updatedAt).toLocaleString(),
        }))

        const csv = Papa.unparse(csvData)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `transactions_${new Date().toISOString()}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const exportToExcel = () => {
        const excelData = transactions.map((transaction) => ({
            TransactionID: transaction.transactionId,
            Status: transaction.status,
            Amount: transaction.amount,
            OrderID: transaction.orderId,
            PaymentMethod: transaction.payment.paymentMethod,
            PaymentDate: new Date(transaction.payment.paymentDate).toLocaleString(),
            Buyer: transaction.order.user.name,
            BuyerEmail: transaction.order.user.email,
            Product: transaction.order.product.name,
            Quantity: transaction.order.quantity,
            TotalPrice: transaction.order.totalPrice,
            OrderStatus: transaction.order.status,
            CreatedAt: new Date(transaction.createdAt).toLocaleString(),
            UpdatedAt: new Date(transaction.updatedAt).toLocaleString(),
        }))

        const worksheet = XLSX.utils.json_to_sheet(excelData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions")
        XLSX.writeFile(workbook, `transactions_${new Date().toISOString()}.xlsx`)
    }

    return (
        <div className=" mx-auto p-6 max-w-full">
            <PageLoader visible={loading} />
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-primary">Transaction History</h2>
                <div className="flex items-center space-x-3">
                    <Button onClick={exportToCSV} variant="outline" className="w-full sm:w-auto">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                    <Button onClick={exportToExcel} variant="outline" className="w-full sm:w-auto">
                        <Download className="w-4 h-4 mr-2" />
                        Export Excel
                    </Button>
                </div>
            </div>
            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>

                                <TableHead>Amount</TableHead>
                                <TableHead>Buyer</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">{transaction.transactionId}</TableCell>

                                        <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                                        <TableCell>{transaction.order.user.name}</TableCell>
                                        <TableCell>{transaction.order.product.name}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                transaction.order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {transaction.order.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{transaction.payment.paymentMethod}</TableCell>
                                        <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">No transactions found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {totalPages > 1 && (
                    <div className="p-4 flex justify-between items-center border-t">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}