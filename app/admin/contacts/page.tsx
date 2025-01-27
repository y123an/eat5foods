
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Button } from "@/components/ui/button"

const prisma = new PrismaClient()

async function getMessages() {
    return await prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export default async function MessageListPage() {
    const messages = await getMessages()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {messages.map((message) => (
                            <tr key={message.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{message.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/admin/contacts/${message.id}`} passHref>
                                        <Button variant="outline" size="sm">View</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}