"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { RegisterUser } from "../actions/authAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleFormServerErrors } from "@/lib/utils";

export default function RegisterForm() {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  const onSubmitted = async (data: RegisterSchema) => {
    const result = await RegisterUser(data);
    if (result.status === "success") {
      toast.success("Register successfully");
      router.push("/");
      router.refresh();
    } else {
      handleFormServerErrors(result, form.setError);
      toast.error(result.error as string);
    }
  };
  return (
    <Card className="lg:w-1/2 md:w-2/3 sm:w-3/4 w-full">
      <CardTitle className="mt-5 text-2xl font-bold text-center">
        Sign up
      </CardTitle>
      <CardDescription className="text-gray-500 text-center my-1 font-semibold">
        Start register a new account
      </CardDescription>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitted)}
            className="space-y-4 my-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
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
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-10">
              Register
            </Button>
          </form>
        </Form>
        <CardDescription className="text-center">
          Already have an account?
          <Link href={"/login"} className="underline text-blue-600 ml-2">
            Sign in
          </Link>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
