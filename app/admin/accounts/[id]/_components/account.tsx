"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/actions/updateProfile";
import { User } from "@prisma/client";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";


import { Badge } from "@/components/ui/badge";
import { avatar } from "@/constants/images";
import Link from "next/link";
import { DeleteDialogBox } from "@/components/shared/delete-confirmation-dialog";

type Props = {
    user: User;
};
export default function AccountComponent({ user }: Props) {
    if (!user) return null;
    return (
        <section className=" flex flex-col gap-4">
            <Card className="w-full">
                <CardHeader className="flex flex-col items-center justify-center  space-y-2 md:space-y-0 md:space-x-4">
                    <div className="p-3">
                        <Image
                            src={user.image || avatar}
                            width={70}
                            height={70}
                            alt="Profile"
                            className="w-[100px] h-[100px] rounded-full"
                        />
                    </div>
                    <div className="flex flex-col space-y-1 text-center">
                        <CardTitle>{user.name}</CardTitle>
                        <div>

                            <Badge>  {user.role} {" "}{user.id}</Badge>

                        </div>
                        <CardDescription>{user.email}</CardDescription>
                    </div>

                </CardHeader>
                <CardContent className=" w-full space-y-3 ">
                    <form action={updateProfile}>
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Account Detail Information
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="grid md:grid-cols-2 gap-5 ">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        disabled

                                        required
                                        minLength={2}
                                        defaultValue={user.name}
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        disabled

                                        required
                                        minLength={2}
                                        name="email"
                                        defaultValue={user.email}
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        required
                                        name="phone"
                                        disabled
                                        defaultValue={user.phone || ""}
                                        placeholder="Enter your Phone Number"
                                        type="text"
                                        pattern="^(09|07|\+2519)\d{8}$|^(\+91|91)?[7-9]\d{9}"
                                        title="Invalid phone number format. Please enter a valid Ethiopian | Indian phone number "
                                    />
                                </div>


                            </CardContent>
                            <CardFooter className="flex flex-col gap-7 md:flex-row items-center">
                                <Link href={`/admin/accounts/edit/${user.id}`} className="my-2">
                                    <Button><Edit className="mr-2 w-4 h-4" /> Edit account</Button>
                                </Link>
                                <DeleteDialogBox
                                    endpoint={`/api/accounts`}
                                    id={user.id}
                                    title={user.name}>
                                    <Button
                                        variant={'destructive'}
                                    ><Trash2 className="mr-2 w-4 h-4" /> Delete account</Button>
                                </DeleteDialogBox>
                            </CardFooter>
                        </Card>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
