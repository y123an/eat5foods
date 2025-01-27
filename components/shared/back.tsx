"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Back = () => {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.back()}
        >Go back</Button>
    );
};

export default Back;
