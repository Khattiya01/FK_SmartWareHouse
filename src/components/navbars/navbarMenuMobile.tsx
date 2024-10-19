"use client";

import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { ListMenu } from "../footers/ListMenu";
import useScreenSize from "@/hooks/useScreenSize";
import { SelectCategoryIncludeProduct } from "@/db/schemas";

export const NavbarMenuMobile = (props: {
  category: SelectCategoryIncludeProduct[];
}) => {
  const { category } = props;
  const [openMenu, setOpenMenu] = useState(false);

  const { width } = useScreenSize();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (width && width >= 639) {
      setOpenMenu(false);
    }
  }, [width]);

  return (
    <>
      <div className="sm:hidden flex items-center mr-8 ">
        <GiHamburgerMenu
          fontSize={"18px"}
          className={`text-white cursor-pointer ${
            openMenu ? "hidden" : "block"
          }`}
          onClick={handleOpenMenu}
        />

        <IoClose
          fontSize={"18px"}
          className={`text-white cursor-pointer ${
            openMenu ? "block" : "hidden"
          }`}
          onClick={handleOpenMenu}
        />
      </div>

      <div
        className={` shadow-xl  bg-main absolute top-[80px] transition-all duration-300 opacity-0 p-4 ${
          openMenu ? "opacity-100 z-[51] w-[100vw]" : "opacity-0 z-0 w-[0]"
        }`}
        // style={{
        //   boxShadow:
        //     "rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
        // }}
      >
        <ListMenu category={category} />
      </div>
    </>
  );
};
