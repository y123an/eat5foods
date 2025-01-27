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
import { Trash2 } from "lucide-react";
import Image from "next/image";
import DeleteAccountForm from "../forms/delete-account-form";
import ChangePasswordForm from "../forms/passwor-form";
import SavePending from "../shared/save-pending";

import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { avatar } from "@/constants/images";
import { UploadButton } from "../shared/upload-button";
type Props = {
  user: User;
};
export default function ProfileComponent({ user }: Props) {
  if (!user) return null;
  return (
    <section className="p-4 flex flex-col gap-4">
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
              {user.role !== "USER" && (
                <Badge>Eat 5 Foods {user.role.toUpperCase()}</Badge>
              )}
            </div>
            <CardDescription>{user.email}</CardDescription>
          </div>
          <div className="flex space-x-4 my-3 py-4">
            {/* upload profile  */}
            <UploadButton />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <AlertDialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete your account?
                  </DialogTitle>
                  <DialogDescription>
                    This action is not recoverable.
                  </DialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <DialogClose>
                    <Button variant={"ghost"}>Cancel</Button>
                  </DialogClose>
                  <DeleteAccountForm id={user.id} />
                </AlertDialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className=" w-full space-y-3 ">
          <form action={updateProfile}>
            <Card>
              <CardHeader>
                <CardDescription>
                  Update Your Personal Information
                </CardDescription>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-5 ">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
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
                    defaultValue={user.phone || ""}
                    placeholder="Enter your Phone Number"
                    type="text"
                    pattern="^(09|07|\+2519)\d{8}$|^(\+91|91)?[7-9]\d{9}"
                    title="Invalid phone number format. Please enter a valid Ethiopian | Indian phone number "
                  />
                </div>


              </CardContent>
              <CardFooter>
                <div className="my-2">
                  <SavePending />
                </div>
              </CardFooter>
            </Card>
          </form>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </section>
  );
}
