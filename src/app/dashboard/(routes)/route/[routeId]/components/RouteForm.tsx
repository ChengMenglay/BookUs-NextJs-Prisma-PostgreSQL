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
import { Province, Route } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import ImageUpload from "@/components/ui/Image-upload";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type RouteFormProps = {
  initialData: Route | null;
  province: Province[] | null;
};

const formSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  image_url: z.string().min(1),
  distance_km: z.string().min(1),
  type: z.string().min(1),
});

type RouteFormValues = z.infer<typeof formSchema>;
export default function RouteForm({ initialData, province }: RouteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<RouteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: initialData?.origin,
      destination: initialData?.destination,
      image_url: initialData?.image_url,
      distance_km: initialData?.distance_km,
      type: initialData?.type,
    },
  });
  const title = initialData ? "Update route" : "Create route";
  const subtitle = initialData ? "Edit an route" : "Add a new route";
  const message = initialData ? "Updated successfully" : "Created successfully";
  const action = initialData ? "Update" : "Create";
  const onSubmitted = async (data: RouteFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        console.log(data);
        await axios.patch(`/api/route/${initialData.id}`, data);
      } else {
        await axios.post("/api/route", data);
      }
      toast.success(message);
      router.push("/dashboard/route");
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
      await axios.delete(`/api/route/${initialData?.id}`);
      toast.success("Delete successfully");
      router.push("/dashboard/route");
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
          <FormField
            control={form.control}
            name="image_url"
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
                    onDelete={() => {
                      // Remove image from the list
                      field.onChange("");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 my-4 gap-4">
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select origin"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Origin</SelectLabel>
                        {province?.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select destination"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Destination</SelectLabel>
                        {province?.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select type"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value={"Popular"}>Popular</SelectItem>
                        <SelectItem value={"Normal"}>Normal</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distance_km"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Total distance"
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
