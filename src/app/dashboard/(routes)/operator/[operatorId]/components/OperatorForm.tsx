"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Operator } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
type OperatorFormProps = {
  initialData: Operator | null;
};

const formSchema = z.object({
  name: z.string().min(1),
  contact: z.string().min(1),
  address: z.string().min(1),
});

type OperatorFormValues = z.infer<typeof formSchema>;
export default function OperatorForm({ initialData }: OperatorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<OperatorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name,
      contact: initialData?.contact,
      address: initialData?.address,
    },
  });
  const title = initialData ? "Update operator" : "Create operator";
  const subtitle = initialData ? "Edit an operator" : "Add a new operator";
  const message = initialData ? "Updated successfully" : "Created successfully";
  const action = initialData ? "Update" : "Create";
  const onSubmitted = async (data: OperatorFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        console.log(data);
        await axios.patch(`/api/operator/${initialData.id}`, data);
      } else {
        await axios.post("/api/operator", data);
      }
      toast.success(message);
      router.push("/dashboard/operator");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/operator/${initialData?.id}`);
      toast.success("Delete successfully");
      router.push("/dashboard/operator");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Heading title={title} subtitle={subtitle} />
        {initialData && (
          <Button variant={"destructive"} size={"icon"} onClick={onDelete}>
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitted)}>
          <div className="grid grid-cols-3 my-4 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Operator name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Operator contact"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Operator address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
