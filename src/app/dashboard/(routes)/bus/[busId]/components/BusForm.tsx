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
import { Bus, Operator, Type } from "@prisma/client";
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
import { Separator } from "@/components/ui/separator";
type BusFormProps = {
  initialData: Bus | null;
  operator: Operator[] | null;
  type: Type[] | null;
};

const formSchema = z.object({
  number: z.string().min(1),
  operatorId: z.string().min(1),
  typeId: z.string().min(1),
  seat: z.preprocess((value) => Number(value), z.number()),
  status: z.string().min(1),
});

type BusFormValues = z.infer<typeof formSchema>;
export default function BusForm({ initialData, operator, type }: BusFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<BusFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: initialData?.number,
      operatorId: initialData?.operatorId,
      typeId: initialData?.typeId,
      seat: initialData?.seat,
      status: initialData?.status,
    },
  });
  const title = initialData ? "Update bus" : "Create bus";
  const subtitle = initialData ? "Edit an bus" : "Add a new bus";
  const message = initialData ? "Updated successfully" : "Created successfully";
  const action = initialData ? "Update" : "Create";
  const onSubmitted = async (data: BusFormValues) => {
    try {
      setIsLoading(true);
      const parseData = {
        ...data,
        seat: parseInt(data.seat as unknown as string),
      };
      if (initialData) {
        await axios.patch(`/api/bus/${initialData.id}`, parseData);
      } else {
        await axios.post("/api/bus", parseData);
      }
      toast.success(message);
      router.push("/dashboard/bus");
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
      await axios.delete(`/api/bus/${initialData?.id}`);
      toast.success("Delete successfully");
      router.push("/dashboard/bus");
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
          <div className="grid grid-cols-3 my-4 gap-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Bus number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operatorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select an operator"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Operator</SelectLabel>
                        {operator?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
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
              name="typeId"
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
                        placeholder={"Select an type"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        {type?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.type}
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
              name="seat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seat</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Bus seat"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select status"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value={"Available"}>Available</SelectItem>
                        <SelectItem value={"Unavailable"}>
                          Unavailable
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
