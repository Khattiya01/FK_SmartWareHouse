"use client";

import { postTerm } from "@/api/term/term";
import { SelectprivacyAndPolicy } from "@/db/schemas";
import { AcceptPrivacySchema } from "@/schemas/acceptPrivacy";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaAngleLeft } from "react-icons/fa";

const TermContent = ({
  privacyAndPolicy,
}: {
  privacyAndPolicy: SelectprivacyAndPolicy | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, update } = useSession();

  const { register, watch, handleSubmit } = useForm<{ accept: boolean }>({
    defaultValues: {
      accept: false,
    },
    resolver: zodResolver(AcceptPrivacySchema),
  });

  const onSubmit = async (data: { accept: boolean }) => {
    setIsLoading(true);
    await postTerm({
      accept: data.accept,
      token: session?.accessToken as string,
    })
      .then(() => {
        update({
          ...session,
          user: {
            role: session?.user.role,
            term: true,
          },
        }).then(() => {
          router.push("/admin");
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className=" max-w-[606px] rounded-lgp-4 "
    >
      <div className=" flex flex-col gap-2">
        <div className=" text-2xl font-bold">ข้อกำหนดและเงื่อนไข</div>
        <div className=" text-sm  ">
          โปรดตรวจสอบและยอมรับเงื่อนไขเพื่อเปิดใช้งานบริการ
        </div>
      </div>
      <div className=" custom-pre h-[calc(100vh-275px)] w-full overflow-auto py-2 text-sm">
        {privacyAndPolicy?.privacy_policy}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-2">
        <label className=" text-sm flex gap-2 py-2">
          <input type="checkbox" {...register("accept")} />
          ฉันยอมรับข้อกำหนดและเงื่อนไข
        </label>
        <button
          disabled={watch("accept") === false || isLoading}
          type="submit"
          className={`${
            watch("accept")
              ? "bg-[#3e63dd] hover:bg-[#3e63ddcf] text-white  cursor-pointer"
              : "bg-[#e5e5e5] text-[#b5b5b5]"
          }  font-bold  px-[12px] py-[8px] rounded-md text-center flex gap-2  justify-center items-center`}
        >
          ยอมรับ
        </button>

        <Link
          href={"/login"}
          className=" flex gap-2 items-center justify-between w-full text-blue-600 h-11"
        >
          <FaAngleLeft size={"14px"} />
          <Text className=" text-sm underline">กลับ</Text>
          <div></div>
        </Link>
      </form>
    </div>
  );
};

export default TermContent;
