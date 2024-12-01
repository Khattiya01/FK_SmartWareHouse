import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import Providers from "./provider";

export const metadata: Metadata = {
  title: {
    template: "%s - FK WareHouse",
    default: "FK WareHouse",
  },
  description:
    "FIRSTKAS WAREHOUSE ขาย-ให้เช่าที่ดินและโกดัง อสังหาริมทรัพย์ ทำเลดีย่านธุรกิจและอุตสาหกรรม รวมถึงรับสร้างโกดังสินค้าและโรงงานโดยมีประสบการณ์มากว่า 30 ปี สามารถให้คำปรึกษาแก่นักลงทุนและผู้ประกอบการได้เป็นอย่างดี เพื่อประกอบกิจการได้อย่างมีประสิทธิภาพ",
  openGraph: {
    images: `/images/logo_sr_estate2.webp`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Providers>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
