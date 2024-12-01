"use client";

import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { ListMenu } from "../footers/ListMenu";
import useScreenSize from "@/hooks/useScreenSize";
import {
  SelectCategoryIncludeProduct,
  SelectTypeProductIncludeProduct,
} from "@/db/schemas";
import { useSession } from "next-auth/react";
import { ROLE } from "@/types/role";

export const NavbarMenuMobile = (props: {
  category: SelectCategoryIncludeProduct[];
  typeProduct: SelectTypeProductIncludeProduct[];
}) => {
  const { category, typeProduct } = props;
  const [openMenu, setOpenMenu] = useState(false);

  const { width } = useScreenSize();
  const { data: session } = useSession();

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
      <MenuToggle openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
      <div
        className={` shadow-xl  bg-main absolute top-[48px] transition-all duration-300 opacity-0 p-4 ${
          openMenu ? "opacity-100 z-[51] w-[100vw]" : "opacity-0 z-0 w-[0]"
        }`}
      >
        <ListMenu
          category={category}
          typeProduct={typeProduct}
          isAdmin={
            session &&
            (session.user.role === ROLE[0] || session.user.role === ROLE[1])
          }
        />
      </div>
    </>
  );
};

const MenuToggle = ({
  openMenu,
  handleOpenMenu,
}: {
  openMenu: boolean;
  handleOpenMenu: () => void;
}) => {
  return (
    <div
      className="h-full sm:hidden flex items-center justify-center px-8 w-24 text-white cursor-pointer"
      onClick={handleOpenMenu}
    >
      {openMenu ? <IoClose size={"20px"} /> : <GiHamburgerMenu size={"20px"} />}
    </div>
  );
};
