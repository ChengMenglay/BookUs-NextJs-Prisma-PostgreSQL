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
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SignInUser } from "../actions/authAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  const onSubmitted = async (data: LoginSchema) => {
    const result = await SignInUser(data);
    if (result.status === "success") {
      toast.success(result.data);
      router.push("/");
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };
  return (
    <>
      <Card className="lg:w-1/2 md:w-2/3 sm:w-3/4 w-full">
        <CardTitle className="mt-5 text-2xl font-bold text-center">
          Sign in
        </CardTitle>
        <CardDescription className="text-gray-500 text-center my-1 font-semibold">
          Start sign in a account
        </CardDescription>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitted)}
              className="space-y-4 my-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        type="email"
                        {...field}
                      />
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
                Sign in
              </Button>
            </form>
          </Form>
          <CardDescription className="text-center">
            Don't have an account?
            <Link href={"/register"} className="underline text-blue-600 ml-2">
              Sign up
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
}
