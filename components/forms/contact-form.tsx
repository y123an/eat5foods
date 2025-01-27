"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Spinner from "../shared/spinner";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/contact", formData);
      toast({
        description: "Message sent successfully!",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction onClick={() => handleSubmit(e)} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto py-7 md:py-12 max-w-sm space-y-6 md:max-w-md lg:max-w-lg"
    >
      <div className="space-y-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Contact us</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            disabled={loading}
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={loading}
            id="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            disabled={loading}
            id="subject"
            placeholder="Enter the subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            className="min-h-[100px]"
            disabled={loading}
            id="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <Button className="my-2" type="submit">
          {loading && <Spinner />}
          {loading ? "Submitting..." : "    Send message"}
        </Button>
      </div>
    </form>
  );
}
