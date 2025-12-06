"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactUs, ContactUsFormSchema } from "../../../schemas/contact";
import { CustomInput } from "../custom-input";

export const CustomForm = () => {
  const { register, handleSubmit, reset } = useForm<ContactUs>({
    resolver: zodResolver(ContactUsFormSchema),
  });

  const onContactFormSubmit = (data: ContactUs) => {
    const formData = new FormData();

    formData.append("form-name", "contact-us");
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    if (data.phoneNumber !== undefined) {
      formData.append("phoneNumber", data.phoneNumber);
    }
    formData.append("projectDescription", data.projectDescription);

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        console.log("then", formData);
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
