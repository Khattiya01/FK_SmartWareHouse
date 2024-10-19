import { getUsers } from "@/services/users";
import FormCreateUser from "./components/formCreateUser";
import RowUser from "./components/rowUser";
import FormCreateLogos from "./components/formCreateLogo";
import RowLogo from "./components/rowLogos";
import { getLogos } from "@/services/logo";
import { getHomeDetail } from "@/services/homeDetail";
import FormCreateHomeDetail from "./components/formCreateHomeDetail";
import RowHomePageDetail from "./components/rowHomePageDetail";
import FormCreateCategory from "./components/formCreateCategory";
import { getCategory } from "@/services/category";
import RowCategory from "./components/rowCategory";
import FormCreateProduct from "./components/formCreateProduct";
import FormCreateContact from "./components/formContact";
import { SecurePage } from "@/utils/secure-page";
import ButtonLogout from "./components/buttonLogout";
import { ROLE } from "@/types/role";
import { redirect } from "next/navigation";

export default async function Adminpage() {
  await SecurePage({ role: ROLE.admin });

  await redirect("/admin//manage-home-detail");

  const users = await getUsers();
  const logos = await getLogos();
  const homePageDetail = await getHomeDetail();
  const category = await getCategory();

  return (
    <>
      <ButtonLogout />
      <div>
        users list
        <hr />
        <div className=" flex flex-col gap-4">
          {users &&
            users?.length > 0 &&
            users?.map((user) => <RowUser key={user.id} user={user} />)}
        </div>
      </div>

      <hr />
      <FormCreateUser />

      <hr className=" my-4" />
      <div>
        logo list
        <hr />
        <div className=" flex flex-col gap-4">
          {logos &&
            logos?.length > 0 &&
            logos?.map((logo) => <RowLogo key={logo.id} data={logo} />)}
        </div>
      </div>
      <hr />
      <FormCreateLogos />

      <hr className=" my-4" />
      <div>
        home page detail list
        <hr />
        <div className=" flex flex-col gap-4">
          {homePageDetail &&
            homePageDetail?.length > 0 &&
            homePageDetail?.map((item) => (
              <RowHomePageDetail key={item.id} data={item} />
            ))}
        </div>
      </div>
      <hr />
      <FormCreateHomeDetail />
      <hr />
      <div>
        Category list
        <hr />
        <div className=" flex flex-col gap-4">
          {category &&
            category?.length > 0 &&
            category?.map((item) => <RowCategory key={item.id} data={item} />)}
        </div>
      </div>
      <hr />
      <FormCreateCategory />
      <hr />
      <div>
        products list
        <hr />
        <div className=" flex flex-col gap-4"></div>
      </div>
      <FormCreateProduct />
      <hr />
      <div>
        contact list
        <hr />
        <div className=" flex flex-col gap-4"></div>
      </div>
      <FormCreateContact />
    </>
  );
}
