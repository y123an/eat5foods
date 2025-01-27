import { Skeleton } from "../ui/skeleton";

export default function ProductListSkeleton() {
    return (
        <main className="my-10 w-full grid md:grid-cols-3">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="container mx-auto p-4 mb-6">
                    <div className="flex items-center flex-col">
                        <div className="w-[300px]">
                            <Skeleton className="h-60 w-full my-2 rounded-lg" />
                            <div className="w-full py-2 flex items-center justify-center space-x-1">
                                <Skeleton className="w-20 h-6 rounded" />
                                <Skeleton className="h-6 rounded w-1/2" />
                            </div>
                        </div>
                        <div className="flex flex-col  mx-auto  space-y-2">
                            <div className="flex space-x-3 justify-center">
                                <Skeleton className="h-6 rounded w-1/4" />
                                <Skeleton className="h-6 rounded w-1/4" />
                                <Skeleton className="h-6 rounded w-1/4" />
                            </div>

                            <Skeleton className="h-10 rounded w-[300px]" />
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}
