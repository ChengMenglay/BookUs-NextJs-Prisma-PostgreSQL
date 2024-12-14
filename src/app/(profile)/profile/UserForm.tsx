"use client";
import { updateUserData } from "@/app/(auth)/actions/authAction";
import SignOut from "@/components/SignOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { userFormSchema, UserFormSchema } from "@/lib/schemas/editUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Province, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type UserFormProps = {
  users: User | null;
  provinces: Province[] | null;
};
export default function UserForm({ users, provinces }: UserFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: users?.name || "",
      email: users?.email || "",
      image: users?.image || "",
      phoneNumber: users?.phoneNumber || "",
      gender: users?.gender || "",
      address: users?.address || "",
    },
  });
  const hasUnsavedChanges = form.formState.isDirty;
  const handleUpdateProfile = async (data: UserFormSchema) => {
    try {
      setIsLoading(true);
      const result = await updateUserData(data);
      if (result.status === "success") {
        toast.success("Update successfully");
        router.push("/");
        router.refresh();
      } else {
        toast.error("Update fail!");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Avatar className="w-[90px] h-[90px]">
            <AvatarImage src={users?.image || "./images/user.png"} />
            <AvatarFallback>profile</AvatarFallback>
          </Avatar>
          <p className="font-semibold mt-3">My profile</p>
        </div>
        <Button>
          <SignOut className="flex space-x-4 items-center " name="Log out" />
        </Button>
      </div>
      <Separator />
      <form onSubmit={form.handleSubmit(handleUpdateProfile)}>
        <Form {...form}>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" disabled={isLoading} {...field} />
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
                    <Input placeholder="" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="" disabled={isLoading} {...field} />
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
                  <Select
                    disabled={isLoading}
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select an address"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Address</SelectLabel>
                        {provinces?.map((item) => (
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    disabled={isLoading}
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={"Select a gender"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value={"Male"}>Male</SelectItem>
                        <SelectItem value={"Female"}>Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
        <Button
          type="submit"
          className="bg-blue-700 text-white"
          disabled={!hasUnsavedChanges || isLoading}
        >
          Edit profile
        </Button>
      </form>
    </div>
  );
}
