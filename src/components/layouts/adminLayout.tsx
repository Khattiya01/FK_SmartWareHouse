import React from "react";
import AdminNavbar from "../navbars/adminNavbar";
import AdminSidebar from "../sidebars/adminSidebar";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" relative w-screen h-screen">
      <AdminNavbar />
      <div className=" flex pt-[48px] w-full h-full">
        <AdminSidebar />
        <div className=" bg-bg_main overflow-auto w-full sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
