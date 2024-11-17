import { SelectContact } from "@/db/schemas";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { Box, Flex, Text } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { CiMobile3 } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

export const ContactItem = (props: {
  title?: string;
  desc: string;
  icon: ReactNode;
}) => {
  const { desc, icon } = props;
  return (
    <Flex gap="3" width={"100%"}>
      <Box width={"14px"} height={"14px"} minWidth={"14px"}>
        {icon}
      </Box>
      <Flex direction={"column"}>
        <Text>{desc}</Text>
      </Flex>
    </Flex>
  );
};
const ContactInfo = (props: { contact: SelectContact | undefined }) => {
  const { contact } = props;
  return (
    <Flex>
      <Flex direction={"column"} gap="4" align={"center"}>
        <Text className=" font-bold">ติดต่อเรา</Text>
        <ContactItem
          icon={<IoLocationOutline size={"14px"} />}
          title={"Address:"}
          desc={
            contact?.address ??
             "-"
          }
        />
        <ContactItem
          icon={<FiPhone size={"14px"} />}
          title={"Phone:"}
          desc={contact?.tel ? formatPhoneNumber(contact?.tel) :  "-"}
        />
        <ContactItem
          icon={<CiMobile3 size={"14px"} />}
          title={"Mobile:"}
          desc={
            contact?.phone ? formatPhoneNumber(contact?.phone) : "-"
          }
        />
      </Flex>
    </Flex>
  );
};

export default ContactInfo;
