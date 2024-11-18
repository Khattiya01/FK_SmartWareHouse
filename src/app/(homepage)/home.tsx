import MainLayout from "@/components/layouts/mainLayout";
import Banner from "./components/banner";

import ContentCategory from "./components/contentCategory";
import ContentContactUs from "./components/contentContactUs";
import ContentProduct from "./components/contentProduct";
import ContentDetail1 from "./components/contentDetail1";
import ContentDetail2 from "./components/contentDetail2";
import { getHomeDetailIsActive } from "@/services/homeDetail";
import { getCategoryIsActive } from "@/services/category";
import { getContactIsActive } from "@/services/contact";

export default async function Homepage() {
  const responseGetHomeDetailIsActive = await getHomeDetailIsActive();
  const responseGetCategory = await getCategoryIsActive();
  const contact = await getContactIsActive();

  return (
    <MainLayout>
      <Banner
        bannerTitle={responseGetHomeDetailIsActive?.banner_title}
        bannerSunTitle={responseGetHomeDetailIsActive?.banner_subtitle}
        imagesURL={
          responseGetHomeDetailIsActive?.banner_image_url.split(",") ?? [
            "/images/d12.jpg",
          ]
        }
      />
      <ContentDetail1
        title={responseGetHomeDetailIsActive?.content_01_title}
        detail01={responseGetHomeDetailIsActive?.content_01_detail}
      />
      <ContentDetail2
        imageURL={responseGetHomeDetailIsActive?.content_02_image_url}
        detail={responseGetHomeDetailIsActive?.content_02_detail}
      />
      <ContentProduct category={responseGetCategory} />
      <ContentCategory category={responseGetCategory} />
      <ContentContactUs
        imageURL={responseGetHomeDetailIsActive?.contact_image_url}
        lineID={contact?.line_id}
        line_url={contact?.line_url}
      />
    </MainLayout>
  );
}
