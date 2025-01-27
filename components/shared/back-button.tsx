"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <ArrowLeft
      className="w-6 h-6 cursor-pointer rounded  mr-3 hover:bg-slate-400/45"
      size="icon"
      onClick={() => router.back()}
    />
  );
};

export default BackButton;
