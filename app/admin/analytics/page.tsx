'use client'

import { Button, Card, Table, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns'; // For date formatting

// Reusable DataTable Component
const DataTable = ({ data, columns, loading }) => {
    return (
        <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
            className="rounded-lg"
        />
    );
};

// Utility function to format createdAt
const formatDate = (dateString) => {
    return format(new Date(dateString), 'yyyy-MM-dd');
};

export default function AnalyticsPage() {
    const [activeTable, setActiveTable] = useState<string>('');
    const [tableData, setTableData] = useState<any[]>([]);
    const [data, setData] = useState({
        orders: [],
        customers: [],
        products: [],
    });
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading
                const ordersResponse = await axios.get('/api/orders');
                const ordersData = ordersResponse.data.orders;
                const customersResponse = await axios.get('/api/users/all');
                const customersData = customersResponse.data.users;
                const productsResponse = await axios.get('/api/products');
                const productsData = productsResponse.data.products;

                setData({
                    orders: ordersData,
                    customers: customersData,
                    products: productsData,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    const showTable = (title: string, data: any[]) => {
        setActiveTable(title);
        setTableData(data);
    };

    const handleDownload = (data: any[], fileName: string) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    // Define columns for each table
    const getColumns = (title: string) => {
        const baseColumns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (text) => formatDate(text) },
        ];

        switch (title) {
            case 'Total Orders':
                return [
                    ...baseColumns,
                    { title: 'Order Details', dataIndex: 'details', key: 'details' },
                ];
            case 'Total Customers':
                return [
                    ...baseColumns,
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Email', dataIndex: 'email', key: 'email' },
                ];
            case 'Total Products':
                return [
                    ...baseColumns,
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                ];
            default:
                return baseColumns;
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
                    className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => showTable('Total Orders', data.orders)}
                >
                    <div className="flex flex-col items-center justify-center p-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Orders</h2>
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={(e) => { e.stopPropagation(); handleDownload(data.orders, 'Total_Orders'); }}
                            className="flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Download Excel
                        </Button>
                    </div>
                </Card>

                <Card
                    className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => showTable('Total Customers', data.customers)}
                >
                    <div className="flex flex-col items-center justify-center p-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Customers</h2>
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={(e) => { e.stopPropagation(); handleDownload(data.customers, 'Total_Customers'); }}
                            className="flex items-center justify-center bg-green-500 text-white hover:bg-green-600"
                        >
                            Download Excel
                        </Button>
                    </div>
                </Card>

                <Card
                    className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => showTable('Total Products', data.products)}
                >
                    <div className="flex flex-col items-center justify-center p-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Products</h2>
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={(e) => { e.stopPropagation(); handleDownload(data.products, 'Total_Products'); }}
                            className="flex items-center justify-center bg-purple-500 text-white hover:bg-purple-600"
                        >
                            Download Excel
                        </Button>
                    </div>
                </Card>
                <Card
                    className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="flex flex-col items-center justify-center p-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Download DB Backup</h2>
                        <Button
                            icon={<DownloadOutlined />}
                            className="flex items-center justify-center bg-yellow-500 text-white hover:bg-yellow-600"
                        >
                            Download Backup
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Display the table below the cards */}
            {activeTable && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">{activeTable}</h2>
                    <DataTable
                        data={tableData}
                        columns={getColumns(activeTable)}
                        loading={loading}
                    />
                </div>
            )}

            {/* Show loading spinner when data is being fetched */}
            {loading && (
                <div className="flex justify-center items-center mt-6">
                    <Spin size="large" />
                </div>
            )}
        </div>
    );
}