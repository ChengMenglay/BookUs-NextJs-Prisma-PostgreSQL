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
import { Type } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/Image-upload";
import { Separator } from "@/components/ui/separator";
type BusFormProps = {
  initialData: Type | null;
};

const formSchema = z.object({
  type: z.string().min(1),
  image: z.string().min(1),
});

type BusTypeFormValues = z.infer<typeof formSchema>;
export default function BusTypeForm({ initialData }: BusFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<BusTypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: initialData?.type,
      image: initialData?.image,
    },
  });
  const title = initialData ? "Update type" : "Create type";
  const subtitle = initialData ? "Edit an bus type" : "Add a new type of bus";
  const message = initialData ? "Updated successfully" : "Created successfully";
  const action = initialData ? "Update" : "Create";
  const onSubmitted = async (data: BusTypeFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        console.log(data);
        await axios.patch(`/api/bus-type/${initialData.id}`, data);
      } else {
        await axios.post("/api/bus-type", data);
      }
      toast.success(message);
      router.push("/dashboard/bus-type");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/bus-type/${initialData?.id}`);
      toast.success("Delete successfully");
      router.push("/dashboard/bus-type");
      router.refresh();
    } catch (error) {
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []} // Ensure value is an array of image URLs
                    disable={isLoading}
                    onChange={(url) => {
                      field.onChange(url);
                    }}
                    onDelete={(url) => {
                      // Remove image from the list
                      field.onChange("");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 my-4 space-x-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Bus type"
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
