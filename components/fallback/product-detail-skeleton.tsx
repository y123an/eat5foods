import { Skeleton } from "../ui/skeleton";

export default function ProductDetailSkeleton() {
    return (
        <div className="w-full mx-auto flex flex-col-reverse md:flex-row justify-around p-10 space-x-3">
            <div className="flex flex-col space-y-4">
                <div className="w-full flex items-center justify-between">
                    <Skeleton className="w-32 h-14 rounded" />
                    <Skeleton className="w-32 h-14 rounded" />
                </div>
                <div>
                    <Skeleton className="w-full h-32 rounded" />
                </div>
                <div className="flex space-x-2">
                    <Skeleton className="w-20 h-6 rounded" />
                    <Skeleton className="w-20 h-6 rounded" />
                    <Skeleton className="w-20 h-6 rounded" />
                    <Skeleton className="w-20 h-6 rounded" />
                </div>
                <div className="my-4 flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                </div>
                <div className="flex  justify-between">
                    <Skeleton className="w-1/3 h-14 rounded" />
                    <Skeleton className="w-1/3 h-14 rounded" />
                </div>
            </div>
            <div className="grid gap-3">
                <Skeleton className="h-64  rounded w-full mt-3" />
                <div className="flex gap-4 items-start  mt-4">
                    <Skeleton className="h-20  rounded w-20" />
                    <Skeleton className="h-20  rounded w-20" />
                    <Skeleton className="h-20  rounded w-20" />
                    <Skeleton className="h-20  rounded w-20" />
                    <Skeleton className="h-20  rounded w-20" />
                </div>
            </div>
        </div>
    );
}