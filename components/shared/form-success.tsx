import { BadgeCheck } from "lucide-react";

interface SuccessProps {
    message?: string;
};

export const SuccessMessage = ({
    message,
}: SuccessProps) => {
    if (!message) return null;

    return (
        <div className="bg-emerald-600/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-600">
            <BadgeCheck className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
};