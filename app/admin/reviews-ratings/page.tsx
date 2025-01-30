import PageLoader from "@/components/loaders/overlay-loader";
import { DeleteDialogBox } from "@/components/shared/delete-confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { generateMetadata } from "@/lib/meta-data";
import { prisma } from "@/lib/prisma-client";
import { Edit, Plus, Trash2 } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';



export const metadata = generateMetadata({
    title: "Eat5Foods | Admin | Review and Rating"
})


export default async function ReviewTable() {
    const reviews = await prisma.platformRating.findMany();
    return (
        <div className="w-full flex-1 p-6">
            <PageLoader visible={false} />
            <div className='flex items-center justify-between px-2'>
                <h2 className="text-2xl font-bold mb-4">Rating and Reviews List</h2>
                <Link href={'/admin/reviews-ratings/new'}>
                    <Button className="bg-dark-green">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Rating
                    </Button>
                </Link>
            </div>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">

                            <TableHead className="w-1/4">Name</TableHead>
                            <TableHead className="w-2/3">Description</TableHead>
                            <TableHead className="w-1/4 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        {reviews.map((review) => (
                            <TableRow key={review.id}>
                                <TableCell>
                                    <div className=" flex items-center space-x-3 ">
                                        {review.authorImage.length > 0 ? (
                                            <Image
                                                width={50}
                                                height={50}
                                                src={review.authorImage}
                                                alt={review.author}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                                                No Image
                                            </div>
                                        )}
                                        <Link href={`/admin/categories/${review.id}`}>
                                            <h2>{review.author}</h2>
                                        </Link>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <h2>{review.comment}</h2>
                                </TableCell>
                                <TableCell className='text-right flex '>
                                    <Link href={`/admin/reviews-ratings/edit/${review.id}`}>
                                        <Button size="icon" variant="ghost">
                                            <Edit className="h-4 w-4 text-[#C5CEE0]" />
                                        </Button>
                                    </Link>
                                    <DeleteDialogBox
                                        endpoint="/api/reviews-ratings"
                                        id={review.id}
                                        title={review.author}
                                    >

                                        <Button size="icon" variant="ghost" >
                                            <Trash2 className="h-4 w-4 text-[#C5CEE0]" />
                                        </Button>
                                    </DeleteDialogBox>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
