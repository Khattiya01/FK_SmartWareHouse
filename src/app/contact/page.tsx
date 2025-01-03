import React from "react";
import ContentContact from "./components/contentContact";
import { getContactIsActive } from "@/services/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
};

const ContactPage = async () => {
  const contact = await getContactIsActive();
  if (!contact?.bg_image) return <></>;
  return <ContentContact contact={contact} />;
};

export default ContactPage;
