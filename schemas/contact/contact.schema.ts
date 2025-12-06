import { z } from "zod";

export const ContactUsFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "firstName must be at least 3 characters"),
  lastName: z.string().trim().min(3, "LastName must be at 3 characters"),
  email: z.string().trim(),
  phoneNumber: z.string().optional(),
  projectDescription: z.string().trim(),
});
