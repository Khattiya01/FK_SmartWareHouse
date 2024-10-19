"use client";

import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

export const SidebarItemLogout = () => {
  const handleLogout = async () => {
    signOut({ redirect: true, callbackUrl: "/login" });
  };
  return (
    <div
      onClick={handleLogout}
      className={`sm:w-[256px] w-[60px] h-[64px] border-l-4 border-white p-4 flex gap-2 items-center hover:bg-bg_main  active:text-text_main_blue  cursor-pointer`}
    >
      <IoIosLogOut style={{ width: "24px", height: "24px" }} />
      <div className=" text-4 leading-6 font-normal  hidden sm:block">ออกจากระบบ</div>
    </div>
  );
};
