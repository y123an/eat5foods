"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";
import PendingSpinner from "../loaders/pending-spinner";

const DeleteAccountForm = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/users/${id}`);
      toast({
        variant: "default",
        description: "Your account has been deleted successfully",
      });
      signOut();
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with Deleting your account .",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <PendingSpinner
      action={handleSubmit}
      busy={loading}
      style="hover:bg-red-700"
      idle="Delete account"
    />
  );
};

export default DeleteAccountForm;
