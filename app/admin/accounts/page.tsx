import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { DeleteDialogBox } from "@/components/shared/delete-confirmation-dialog";
import { avatar } from "@/constants/images";

export default async function AccountPage() {
    const currentUser = await getCurrentUser();
    const users = await prisma.user.findMany({
        where: {
            NOT: {
                id: currentUser?.id,
            },
        },
        take: 7,
        orderBy: {
            createdAt: "desc",
        },
    });



    return (
        <main className="flex flex-col  min-h-screen">

            <section className="flex-1  p-4 md:p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/4">Profile</TableHead>
                            <TableHead className="w-1/4">Name</TableHead>
                            <TableHead className="w-1/4">Email</TableHead>
                            <TableHead className="w-1/4">Phone</TableHead>
                            <TableHead className="hidden sm:table-cell">Role</TableHead>
                            <TableHead className="hidden sm:table-cell">Actons</TableHead>
                        </TableRow>
                    </TableHeader>
                    {users.length < 1 && (
                        <div className="mx-auto flex flex-1">No users found!</div>
                    )}
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="rounded-sm">
                                <TableCell>
                                    <Image
                                        src={user.image || avatar}
                                        alt={user.name}
                                        width={30}
                                        height={30}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Link href={`/admin/accounts/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant="secondary">{user.role}</Badge>
                                </TableCell>
                                <TableCell className='flex items-center text-right'>
                                    <Link href={`/admin/accounts/edit/${user.id}`}>
                                        <Button size="icon" variant="ghost">
                                            <Edit className="h-4 w-4 text-[#C5CEE0]" />
                                        </Button>
                                    </Link>
                                    <DeleteDialogBox

                                        id={user.id}
                                        title={user.name}
                                        endpoint="/api/accounts"
                                    >
                                        <Button size="icon" variant="ghost">
                                            <Trash2 className="h-4 w-4 text-[#C5CEE0]" />
                                        </Button>
                                    </DeleteDialogBox>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </main>
    );
}
