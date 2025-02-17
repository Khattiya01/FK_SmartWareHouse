"use client"

import { IoHomeOutline } from "react-icons/io5";
import { SidebarItem } from "./sidebarItem";
import { SidebarItemLogout } from "./sidebarItemLogout";
import { RiContactsBook3Line, RiProductHuntLine } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa";
import { PiGooglePhotosLogo } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineCategory, MdOutlinePrivacyTip } from "react-icons/md";
import { useSession } from "next-auth/react";
import { ROLE } from "@/types/role";

const AdminSidebar = () => {
  // states
  const { data: session } = useSession();
  let ListSidebarItems: {
    icon: JSX.Element;
    name: string;
    path: string;
    disabled?: boolean;
  }[] = [
    {
      icon: <IoHomeOutline style={{ width: "24px", height: "24px" }} />,
      name: "จัดการรายละเอียดหน้าแรก",
      path: `/admin/manage-home-detail`,
    },
    {
      icon: <PiGooglePhotosLogo style={{ width: "24px", height: "24px" }} />,
      name: "จัดการโลโก้",
      path: `/admin/manage-logo`,
    },
    {
      icon: <BiCategory style={{ width: "24px", height: "24px" }} />,
      name: "จัดการหมวดหมู่",
      path: `/admin/manage-category`,
    },
    {
      icon: <MdOutlineCategory  style={{ width: "24px", height: "24px" }} />,
      name: "จัดการชนิดผลิตภัณฑ์",
      path: `/admin/manage-type-product`,
    },
    {
      icon: <RiProductHuntLine style={{ width: "24px", height: "24px" }} />,
      name: "จัดการผลิตภัณฑ์",
      path: `/admin/manage-product`,
    },
    {
      icon: <RiContactsBook3Line style={{ width: "24px", height: "24px" }} />,
      name: "จัดการการติดต่อ",
      path: `/admin/manage-contact`,
    },
    {
      icon: <FaWpforms style={{ width: "24px", height: "24px" }} />,
      name: "จัดการแบบฟอร์มการติดต่อ",
      path: `/admin/manage-form-contact`,
    },
    {
      icon: <HiOutlineUsers style={{ width: "24px", height: "24px" }} />,
      name: "จัดการผู้ใช้",
      path: `/admin/manage-users`,
    },
    {
      icon: <MdOutlinePrivacyTip style={{ width: "24px", height: "24px" }} />,
      name: "จัดการนโยบายและความเป็นส่วนตัว",
      path: `/admin/manage-privacy-policy`,
    },
  ];
  if (session?.user.role !== ROLE[0]) {
    ListSidebarItems = [
      {
        icon: <RiProductHuntLine style={{ width: "24px", height: "24px" }} />,
        name: "จัดการผลิตภัณฑ์",
        path: `/admin/manage-product`,
      },
    ];
  }

  return (
    <section
      style={{ boxShadow: "4px 2px 12px 0px #0A0A100F" }}
      className=" sm:w-[256px] w-[64px] h-[calc(100vh-48px)] relative z-10 "
    >
      <div className=" sm:w-[260px] w-[64px] h-[calc(100vh-126px)] overflow-y-auto">
        {ListSidebarItems.map((item) => {
          return (
            <SidebarItem
              key={item.name}
              icon={item.icon}
              name={item.name}
              path={item.path}
              disabled={item.disabled}
            />
          );
        })}
      </div>

      <div className=" fixed bottom-4 ">
        <SidebarItemLogout />
      </div>
    </section>
  );
};

export default AdminSidebar;
