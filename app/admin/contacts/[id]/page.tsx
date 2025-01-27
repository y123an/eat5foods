
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import MarkAsReadButton from './mark-as-read-button'

const prisma = new PrismaClient()

async function getMessage(id: string) {
    return await prisma.contact.findUnique({
        where: { id },
    })
}

export default async function MessageDetailPage({ params }: { params: { id: string } }) {
    const message = await getMessage(params.id)

    if (!message) {
        notFound()
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Message Details</h1>
                <div className="space-y-4">
                    <div>
                        <h2 className=" font-semibold">From</h2>
                        <p>{message.name} ({message.email})</p>
                    </div>
                    <div>
                        <h2 className=" font-semibold">Subject</h2>
                        <p>{message.subject}</p>
                    </div>
                    <div>
                        <h2 className=" font-semibold">Message</h2>
                        <p className="whitespace-pre-wrap">{message.message}</p>
                    </div>
                    <div>
                        <h2 className=" font-semibold">Received</h2>
                        <p>{format(message.createdAt, 'PPpp')}</p>
                    </div>
                    <div>
                        <h2 className=" font-semibold">Status</h2>
                        <p>{message.seen ? 'Read' : 'Unread'}</p>
                    </div>
                </div>
                <div className="mt-6 space-x-4">
                    <Link href="/admin/contacts" passHref>
                        <Button variant="outline">Back to List</Button>
                    </Link>
                    <MarkAsReadButton id={message.id} initialSeen={message.seen} />
                </div>
            </div>
        </div>
    )
}