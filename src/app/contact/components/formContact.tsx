"use client";

import React from "react";
import InputForm from "@/components/inputs/inputForm";
import TextAreaForm from "@/components/textAreas/textAreaForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Text } from "@radix-ui/themes";
import { InsertContactForm, insertContactFormSchema } from "@/db/schemas";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { createContactFormAction } from "@/actions/contactForm";

const FormContact = () => {
  const showToast = useToastStore((state) => state.show);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InsertContactForm>({
    defaultValues: {},
    resolver: zodResolver(insertContactFormSchema),
  });

  const onSubmit = async (data: InsertContactForm) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("title", data.title);
    formData.append("message", data.message);
    formData.append("email", data.email);
    console.log("data", data);
    await createContactFormAction(formData)
      .then((res) => {
        if (res.success) {
          showToast(
            "ส่งข้อมูลติดต่อสำเร็จ",
            "",
            new Date(),
            typeStatusTaost.success
          );
          reset();
        } else {
          console.error("Error create contact form:", res.message);
        }
      })
      .catch((err) => {
        console.error("Error create contact form:", err.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" w-full flex gap-3 flex-col"
    >
      <Text className=" font-bold text-2xl text-white text-center">
        กรอกข้อมูลติดต่อ
      </Text>
      <InputForm
        placeholder={"ชื่อ"}
        register={{ ...register("name") }}
        msgError={errors.name?.message}
      />
      <InputForm
        placeholder={"อีเมล"}
        register={{ ...register("email") }}
        type="email"
        msgError={errors.email?.message}
      />
      <InputForm
        placeholder={"เบอร์โทรศัพท์"}
        type="number"
        register={{ ...register("phone") }}
        msgError={errors.phone?.message}
      />
      <InputForm
        placeholder={"หัวข้อ"}
        register={{ ...register("title") }}
        msgError={errors.title?.message}
      />
      <TextAreaForm
        placeholder={"ข้อความ"}
        register={{ ...register("message") }}
        msgError={errors.message?.message}
      />
      <Button variant="solid">ส่งข้อความ</Button>
    </form>
  );
};

export default FormContact;
