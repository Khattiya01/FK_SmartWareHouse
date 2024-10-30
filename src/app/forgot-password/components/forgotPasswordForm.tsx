"use client";

import InputFormLogin from "@/app/login/components/inputFormLogin";
import { Box, Spinner, Text } from "@radix-ui/themes";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { forgotPasswordType } from "@/types/requests/forgotPassword";
import { forgotPasswordSchema } from "@/schemas/forgotPassword";
import { postForgotPassword } from "@/api/forgot-password/forgot-password";

const ForgotPasswordForm = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("error");

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordType>({
    defaultValues: {},
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: forgotPasswordType) => {
    setIsLoadingLogin(true);
    await postForgotPassword({email:data.email })
      .then(() => {
        setIsLoadingLogin(false);
      })
      .catch(() => {
        setIsLoadingLogin(false);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className=" bg-[#00337d] max-w-[406px] sm:mt-[80px] mt-[40px] rounded-lg text-white p-4"
      >
        <Image
          src={"/images/logo_sr_estate2.jpg"}
          alt="branding_axons_logo"
          width={270}
          height={120}
          className=" mt-8"
        />
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "16px",
          }}
        >
          ลืมรหัสผ่าน
        </Text>
        <Text
          style={{
            fontSize: "14px",
          }}
        >
          กรุณายืนยันอีเมลของคุณ เราจะส่งคำแนะนำ
        </Text>
        <Box
          style={{
            width: "100%",
            maxWidth: "406px",
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {search === "not-found-email" && (
            <Text
              style={{
                fontSize: "14px",
                color: "red",
              }}
            >
              อีเมลที่คุณป้อนไม่ถูกต้อง
            </Text>
          )}
          <InputFormLogin
            placeholder="ที่อยู่อีเมล"
            iconLeft={
              <FaUserCircle size={"22px"} className=" text-[#00337d]" />
            }
            onChange={(value) => {
              setValue("email", value);
            }}
            value={watch("email")}
            errorMessage={errors.email?.message}
          />
          <Box className=" text-end">
            <Link href={"/forgot-poassword"}>
              <Text className=" text-sm">ลืมรหัสผ่านของคุณ?</Text>
            </Link>
          </Box>

          <Box className="">
            <Link href={"/login"} className=" flex gap-2 items-center">
              <FaAngleLeft size={"12px"} />
              <Text className=" text-sm">กลับไปที่ หน้าล็อกอิน</Text>
            </Link>
          </Box>

          <button
            disabled={isLoadingLogin}
            type="submit"
            className=" bg-[#3e63dd] hover:bg-[#3e63ddcf] px-[12px] py-[8px] rounded-md cursor-pointer text-center mt-8 flex gap-2 justify-center items-center"
          >
            {isLoadingLogin && <Spinner />}
            <Text>ส่งอีเมล</Text>
          </button>
        </Box>
      </form>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Text>Version 1.00</Text>
        <Text>© Copyright 2024 by FK-SWH.com</Text>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
