import z from "zod";
import { ContactUsFormSchema } from "./contact.schema";

export type ContactUs = z.infer<typeof ContactUsFormSchema>;
