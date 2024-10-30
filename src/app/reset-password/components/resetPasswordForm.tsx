"use client";

import { Box, Spinner, Text } from "@radix-ui/themes";
import Image from "next/image";
import InputFormPassword from "./inputFormPassword";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordType } from "@/types/requests/resetPassword";
import { resetPasswordSchema } from "@/schemas/resetPassword";
import { postResetPassword } from "@/api/reset-password/reset-password";

const ResetPasswordForm = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("error");
  const token = searchParams.get("token");

  if (!token) router.push("/login");

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordType>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: resetPasswordType) => {
    setIsLoadingLogin(true);

    if (token) {
      await postResetPassword({ password: data.password, token: token })
        .then(() => {
          setIsLoadingLogin(false);
          router.push("/login")
        })
        .catch(() => {
          setIsLoadingLogin(false);
        });
    }
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
          รีเซ็ตรหัสผ่าน
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
          {search === "not-found-user" && (
            <Text
              style={{
                fontSize: "14px",
                color: "red",
              }}
            >
              ชื่อผู้ใช้ที่คุณป้อนไม่ถูกต้อง
            </Text>
          )}
          <InputFormPassword
            placeholder="รหัสผ่านใหม่"
            onChange={(value) => {
              setValue("password", value);
            }}
            value={watch("password")}
            errorMessage={errors.password?.message}
            showIconRight={false}
          />
          <InputFormPassword
            placeholder="ยืนยันรหัสผ่านใหม่"
            onChange={(value) => {
              setValue("confirmPassword", value);
            }}
            value={watch("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
            showIconRight={false}
          />

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
            <Text>ยืนยัน</Text>
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

export default ResetPasswordForm;
