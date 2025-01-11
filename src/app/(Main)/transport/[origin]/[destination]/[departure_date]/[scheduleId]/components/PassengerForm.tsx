"use client";
import { Button } from "@/components/ui/button";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSeatSelection } from "@/context/SeatSelectionContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

type PassengerFormProps = {
  currentUser: User | null;
  scheduleId: string;
  handleBackToSeat: () => void;
};
const formSchema = z.object({
  nationality: z.string().min(1, "Nationality is required"),
  fullName: z.string().min(3, "Name is required"),
  gender: z.string().min(1, "Gender is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  telegramNumber: z.string().min(1, "Telegram is required"),
  email: z.string().email(),
});
type PassengerFormValue = z.infer<typeof formSchema>;
type Country = {
  name: {
    common: string;
  };
};
export default function PassengerForm({
  scheduleId,
  currentUser,
  handleBackToSeat,
}: PassengerFormProps) {
  const { selectedSeats } = useSeatSelection();
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const form = useForm<PassengerFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationality: "",
      fullName: "",
      gender: "",
      phoneNumber: currentUser ? (currentUser.phoneNumber as string) : "",
      email: currentUser ? (currentUser.email as string) : "",
      telegramNumber: "",
    },
  });

  useEffect(() => {
    getCountryData();
  }, []);
  const getCountryData = async () => {
    const response = await axios.get<Country[]>(
      "https://restcountries.com/v3.1/all"
    );
    const countries = response.data
      .map((country) => country.name.common)
      .sort();
    setCountries(countries);
  };
  const onSubmitted = async (data: PassengerFormValue) => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        "http://localhost:3000/api/checkout",
        {
          scheduleId,
          userId: currentUser?.id,
          origin: params.origin,
          destination: params.destination,
          departure_date: params.departure_date,
          phoneNumber: data.phoneNumber,
          email: data.email,
          passenger_name: data.fullName,
          nationality: data.nationality,
          gender: data.gender,
          seatNumber: selectedSeats.map((seat) => JSON.stringify(seat)),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      window.location = result.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Server Error!: ");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitted)}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Total Seat</TableHead>
                <TableHead>Seat Number</TableHead>
                <TableHead>Nationality*</TableHead>
                <TableHead>Full Name*</TableHead>
                <TableHead>Gender*</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {selectedSeats.length}
                </TableCell>
                <TableCell className="font-medium">
                  {selectedSeats.map((seat) => seat).join(", ")}
                </TableCell>
                <TableCell className="font-medium">
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Nationality" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((item, idx) => (
                              <SelectItem value={item} key={idx}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <Input placeholder="Full Name" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <h1 className="font-bold text-lg">Contact Detail</h1>
          <div className="grid grid-cols-3 my-4 gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telegramNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram</FormLabel>
                  <FormControl>
                    <Input placeholder="Telegram" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6 flex justify-end	text-right space-x-2">
            <Button variant={"outline"} onClick={handleBackToSeat}>
              Back
            </Button>
            <Button
              type="submit"
              className="bg-purple-500 text-white px-6 py-2 flex items-center justify-center space-x-2"
            >
              {isLoading && <CgSpinnerTwoAlt className="animate-spin" />}
              <span>{isLoading ? "Loading..." : "Checkout"}</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
