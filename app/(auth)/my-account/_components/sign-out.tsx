"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { signOut } from "next-auth/react";
export default function SignOutComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Out</CardTitle>
                <CardDescription>Are you sure you want to sign out?</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Signing out will end your current session. You&apos;ll need to sign in again to access your account.</p>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => signOut()}
                    variant="destructive">Confirm Sign Out</Button>
            </CardFooter>
        </Card>
    );
}