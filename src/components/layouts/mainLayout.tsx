import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import MainFooter from "../footers/mainFooter";
import { Box } from "@radix-ui/themes";
import BubbleContact from "@/app/(homepage)/components/bubbleContact";
import { getContactIsActive } from "@/services/contact";
import CookieAccept from "../notifications/cookieAccept";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const contact = await getContactIsActive();

  return (
    <div className=" ">
      <MainNavbar />
      <Box width={"100%"} position={"relative"}>
        {children}
        <BubbleContact contact={contact}/>
        <CookieAccept />
      </Box>

      <MainFooter />
    </div>
  );
};

export default MainLayout;
