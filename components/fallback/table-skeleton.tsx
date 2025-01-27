
import { Skeleton } from "@/components/ui/skeleton"
import { TableHead, TableRow, TableHeader, TableBody, Table, TableCell } from "@/components/ui/table"
export default function TableSkeleton() {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40 rounded" />
                <div className="flex space-x-2">
                    <Skeleton className="h-10 w-32 rounded-md" />
                    <Skeleton className="h-10 wy-24 rounded-md" />
                </div>
            </div>
            <div className="flex justify-between space-x-4">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Skeleton className="h-4 w-24 rounded" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-24 rounded" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-24 rounded" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <TableBody key={index}>
                            <TableRow>
                                <TableCell>
                                    <Skeleton className="h-4 w-24 rounded" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-24 rounded" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-24 rounded" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}

                </Table>
            </div>
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24 rounded" />
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-24 rounded" />
                    <Skeleton className="h-6 w-24 rounded" />
                    <Skeleton className="h-6 w-24 rounded" />
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-6 w-24 rounded" />
                </div>
            </div>
        </div>
    )
}
