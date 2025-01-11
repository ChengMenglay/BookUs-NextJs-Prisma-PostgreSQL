"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Province } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";

type searchDestinationProps = {
  province: Province[] | null;
  origin?: string;
  destination?: string;
  departure_date?: Date | null | undefined;
};
const formSchema = z.object({
  origin: z.string().min(1, "Origin is required."),
  destination: z.string().min(1, "Destination is required."),
  departure_date: z.preprocess((value) => new Date(value as string), z.date()),
});
type searchDestinationSchema = z.infer<typeof formSchema>;
export default function SearchDestination({
  province,
  origin,
  destination,
  departure_date,
}: searchDestinationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<searchDestinationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: origin ? origin : "",
      destination: destination ? destination : "",
      departure_date: departure_date ? departure_date : undefined,
    },
  });
  const router = useRouter();
  const { control } = form;
  const Origin = useWatch({ control, name: "origin" });
  const Destination = useWatch({ control, name: "destination" });
  const onSearch = async (data: searchDestinationSchema) => {
    try {
      setIsLoading(false);
      const formattedData = format(data.departure_date, "dd-MM-yyyy");
      router.push(
        `/transport/${data.origin.split(" ").join("-")}/${data.destination
          .split(" ")
          .join("-")}/${formattedData}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <Card className={`min-h-[100px] bg-white px-4`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearch)}>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 my-4 gap-4">
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
                        {province
                          ?.filter((item) => item.name !== Destination)
                          .map((item) => (
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
                        {province
                          ?.filter((item) => item.name !== Origin)
                          .map((item) => (
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
              name="departure_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Date</FormLabel>
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
                            format(field.value, "dd MMMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border shadow"
                          disabled={(date) =>
                            date.getTime() < new Date().setHours(0, 0, 0, 0)
                          }
                        />
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => field.onChange(null)}
                        >
                          Clear
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="self-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-700 text-white w-full"
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}
