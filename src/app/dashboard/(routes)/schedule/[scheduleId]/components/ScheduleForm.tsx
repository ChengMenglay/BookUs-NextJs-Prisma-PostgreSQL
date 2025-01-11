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
import { Bus, Route, Schedule } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CalendarIcon, Trash } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
type BusWithOperator = Bus & {
  operator: {
    name: string;
  };
};
type ScheduleFormProps = {
  initialData: Schedule | null;
  bus: BusWithOperator[] | null;
  route: Route[] | null;
};

const formSchema = z.object({
  busId: z.string().min(1),
  routeId: z.string().min(1),
  departure_time: z.preprocess((value) => new Date(value as string), z.date()),
  arrival_time: z.preprocess((value) => new Date(value as string), z.date()),
  boarding_point: z.string().min(1),
  boarding_url: z.string().min(1),
  dropping_point: z.string().min(1),
  dropping_url: z.string().min(1),
  price: z.coerce.number(),
  frequency: z.string().min(1),
  status: z.string().min(1),
});

type ScheduleFormValue = z.infer<typeof formSchema>;
export default function ScheduleForm({
  initialData,
  bus,
  route,
}: ScheduleFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<ScheduleFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData?.price)) }
      : {
          busId: "",
          routeId: "",
          departure_time: undefined,
          arrival_time: undefined,
          boarding_point: "",
          boarding_url: "",
          dropping_point: "",
          dropping_url: "",
          price: 0,
          frequency: "",
          status: "",
        },
  });
  const title = initialData ? "Update schedule" : "Create schedule";
  const subtitle = initialData ? "Edit an schedule" : "Add a new schedule";
  const message = initialData ? "Updated successfully" : "Created successfully";
  const action = initialData ? "Update" : "Create";
  const onSubmitted = async (data: ScheduleFormValue) => {
    try {
      setIsLoading(true);
      const { data: bus } = await axios.get(`/api/bus/${data.busId}`);
      const parseData = {
        ...data,
        price: parseFloat(String(data.price)),
        available_seat: bus?.seat,
      };
      if (initialData) {
        await axios.patch(`/api/schedule/${initialData.id}`, parseData);
      } else {
        await axios.post("/api/schedule", parseData);
      }
      toast.success(message);
      router.push("/dashboard/schedule");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/schedule/${initialData?.id}`);
      toast.success("Delete successfully");
      router.push("/dashboard/schedule");
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
              name="busId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bus</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select a bus"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Bus</SelectLabel>
                        {bus?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.number + " - " + item.operator.name}
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
              name="routeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select route"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Route</SelectLabel>
                        {route?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.origin + " - " + item.destination}
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
              name="boarding_point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Boarding Point</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Boarding point"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boarding_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Boarding Url</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Boarding url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropping_point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropping Point</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Dropping point"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropping_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropping Url</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="dropping_url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departure_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "HH:mm a")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Input
                          type="time"
                          defaultValue={
                            field.value ? format(field.value, "HH:mm") : ""
                          }
                          onChange={(e) => {
                            const date = field.value || new Date();
                            const [hours, minutes] = e.target.value
                              .split(":")
                              .map(Number);
                            const updatedDate = new Date(
                              date.setHours(hours, minutes, 0, 0)
                            );
                            field.onChange(updatedDate);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arrival_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "HH:mm a")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Input
                          type="time"
                          defaultValue={
                            field.value ? format(field.value, "HH:mm") : ""
                          }
                          onChange={(e) => {
                            const date = field.value || new Date();
                            const [hours, minutes] = e.target.value
                              .split(":")
                              .map(Number);
                            const updatedDate = new Date(
                              date.setHours(hours, minutes, 0, 0)
                            );
                            field.onChange(updatedDate);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="number"
                      placeholder="Ticket price"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select frequency"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Frequency</SelectLabel>
                        <SelectItem value={"daily"}>Daily</SelectItem>
                        <SelectItem value={"weekly"}>Weekly</SelectItem>
                        <SelectItem value={"monthly"}>Monthly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                        <SelectItem value={"Active"}>Active</SelectItem>
                        <SelectItem value={"Archived"}>Archived</SelectItem>
                        <SelectItem value={"Canceled"}>Canceled</SelectItem>
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
