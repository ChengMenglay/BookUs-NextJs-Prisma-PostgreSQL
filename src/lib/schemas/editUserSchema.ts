import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  image: z.string().min(1).optional().or(z.literal("")),
  phoneNumber: z.string().min(1).optional().or(z.literal("")),
  gender: z.string().min(1).optional().or(z.literal("")),
  address: z.string().min(1).optional().or(z.literal("")),
});
export type UserFormSchema = z.infer<typeof userFormSchema>;
