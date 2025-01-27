"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { WithTextLoader } from "../loaders/loader";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";

interface Props {

    id: string | number;
    title?: string;
    children: ReactNode;
    endpoint: string

}

export function DeleteDialogBox({
    id,
    title,
    children,
    endpoint,
}: Props) {
    const router = useRouter();

    const handleContinue = async () => {
        try {

            toast({
                description: (
                    <div>
                        <WithTextLoader text="Deleting..." />
                    </div>
                ),
            });
            const result = await axios.delete(`${endpoint}/${id}`);
            console.log(result)
            toast({
                description: `Your ${title} has been deleted successfully.`,
            });
            router.refresh();
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    variant: "destructive",
                    title: `Unable to delete ${title}.`,
                    description: error.message,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            }
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center">
                        <AlertDialogTitle>
                            Are you absolutely sure you want to delete {title}?
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the server and all associated data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="border bg-red-400 hover:bg-red-600 text-white p-3"
                        onClick={handleContinue}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
