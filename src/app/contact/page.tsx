import React from "react";
import ContentContact from "./components/contentContact";
import { getContactIsActive } from "@/services/contact";

const ContactPage = async () => {
  const contact = await getContactIsActive();
  return <ContentContact contact={contact} />;
};

export default ContactPage;
