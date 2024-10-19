import { IoHomeOutline } from "react-icons/io5";
import { SidebarItem } from "./sidebarItem";
import { SidebarItemLogout } from "./sidebarItemLogout";

const AdminSidebar = () => {
  // states
  const ListSidebarItems: {
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
      icon: <></>,
      name: "จัดการโลโก้",
      path: `/admin/manage-logo`,
    },
    {
      icon: <></>,
      name: "จัดการหมวดหมู่",
      path: `/admin/manage-category`,
    },
    {
      icon: <></>,
      name: "จัดการผลิตภัณฑ์",
      path: `/admin/manage-product`,
    },
    {
      icon: <></>,
      name: "จัดการการติดต่อ",
      path: `/admin/manage-contact`,
    },
    {
      icon: <></>,
      name: "จัดการแบบฟอร์มการติดต่อ",
      path: `/admin/manage-contact-form`,
    },
    {
      icon: <></>,
      name: "จัดการผู้ใช้",
      path: `/admin/manage-users`,
    },
    {
      icon: <></>,
      name: "จัดการนโยบายและความเป็นส่วนตัว",
      path: `/admin/manage-privacy-policy`,
    },
    // {
    //   icon: <></>,
    //   name: 'Chat',
    //   path: `/chat`,
    //   disabled: true,
    // },
  ];

  return (
    <section
      style={{ boxShadow: "4px 2px 12px 0px #0A0A100F" }}
      className=" sm:w-[256px] w-[64px] h-[calc(100vh-80px)] relative z-10"
    >
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

      <div className=" fixed bottom-4 border-t-[1px] border-[#f6f7f9]">
        <SidebarItemLogout />
      </div>
    </section>
  );
};

export default AdminSidebar;
