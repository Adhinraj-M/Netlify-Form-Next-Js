"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactUs, ContactUsFormSchema } from "../../../schemas/contact";
import { CustomInput } from "../custom-input";

export const CustomForm = () => {
  const { register, handleSubmit, reset } = useForm<ContactUs>({
    resolver: zodResolver(ContactUsFormSchema),
  });
  const onContactFormSubmit = async (data: ContactUs) => {
    const formFields: Record<string, string> = {
      "form-name": "contact-us",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      projectDescription: data.projectDescription,
    };

    if (data.phoneNumber) {
      formFields.phoneNumber = data.phoneNumber;
    }

    await fetch("/contact-us.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formFields).toString(),
    })
      .then(() => {
        console.log("successfully");
        reset();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <form
        onSubmit={handleSubmit(onContactFormSubmit)}
        name="contact-us"
        method="POST"
        data-netlify="true"
        action={"/"}
        className="flex w-full flex-col gap-6 lg:max-w-238 lg:gap-15"
      >
        <input type="hidden" name="form-name" value="contact-us" />
        <div className="grid lg:grid-cols-2 lg:gap-10">
          <CustomInput
            type="text"
            labelText={"First Name*"}
            {...register("firstName")}
          />
          <CustomInput
            type="text"
            labelText={"Last Name*"}
            {...register("lastName")}
          />
          <CustomInput
            type="email"
            labelText={"Email ID*"}
            {...register("email")}
          />
          <CustomInput
            type="text"
            labelText={"Phone Number"}
            {...register("phoneNumber")}
          />
        </div>
        <CustomInput
          type="text"
          labelText={"Lets know about your project*"}
          {...register("projectDescription")}
        />
        <div>
          <button
            className="text-primary bg-red-400 font-fig-tree hover:from-action-secondary-hover hover:to-action-primary-hover z-40 flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-linear-to-r px-12 py-4"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};
