"use client";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRef } from "react";
import { Button } from "../ui/button";
import { UploadIcon } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type UploadResponse = {
  data: any;
};

const useFileUpload = () => {
  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      toast({ description: "Uploading..." });
      const response: AxiosResponse<UploadResponse> = await axios.post(
        "/api/upload/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        variant: "default",
        title: "Success",
        description: "Profile picture updated successfully",
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data.message || "Upload failed.",
        });
      }
    }
  };

  return { uploadFile };
};

export const UploadButton = () => {
  const router = useRouter();
  const { uploadFile } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadFile(file);
        event.target.value = "";
        router.refresh();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Upload failed:",
        });
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <label className="inline-flex items-center">
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
        ref={fileInputRef}
      />
      <Button size="sm" variant="outline" onClick={handleButtonClick}>
        <UploadIcon className="mr-2 h-4 w-4" />
        Update profile
      </Button>
    </label>
  );
};
