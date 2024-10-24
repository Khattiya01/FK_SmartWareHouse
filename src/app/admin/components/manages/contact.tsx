"use client";

import { useState } from "react";
import DialogDelete from "@/components/dialogs/dialogDelete";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";
import { TableContact } from "../tables/tableContact";
import { SelectContact } from "@/db/schemas";
import { useContact } from "@/app/hooks/useContact";
import { deleteContactAction } from "@/actions/contact";

export function ManageContact() {
  // states
  const [openDialogCreateContact, setOpenDialogCreateContact] =
    useState<boolean>(false);
  const [activeContactData, setActiveContactData] = useState<
    SelectContact | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // hooks
  const {
    data: dataContact,
    refetch: refetchContact,
    isLoading,
  } = useContact();
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogHomeDetail = () => {
    refetchContact();
    setOpenDialogCreateContact(false);
    setActiveContactData(undefined);
  };

  const onCancelDailogHomeDetail = () => {
    setOpenDialogCreateContact(false);
    setActiveContactData(undefined);
  };

  const handleOpenDailogCreate = () => {
    setOpenDialogCreateContact(true);
  };

  const handleOpenDailogEdit = (data: SelectContact) => {
    setActiveContactData(data);
    setOpenDialogCreateContact(true);
  };

  const handleSubmitDelete = async () => {
    if (activeContactData) {
      handleCloseDialogDelete();
      setActiveContactData(undefined);
      await deleteContactAction({
        id: activeContactData.id,
        file_url:
          activeContactData.bg_image + "," + activeContactData.map_image,
      })
        .then((res) => {
          if (res.success) {
            refetchContact();
            showToast(
              "ลบข้อมูลการติดต่อสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error("Error delete delete contact:", res.message);
            showToast(
              "ลบข้อมูลการติดต่อไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error delete delete contact:", err.message);
        });
    } else {
      console.log("error deleting: activeContactData is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActiveContactData(undefined);
  };
  const handleOpenDialogDelete = (data: SelectContact) => {
    setActiveContactData(data);
    setOpenDialogDelete(true);
  };
  const handleClickIsActive = async (isActive: boolean, id: string) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    // await updateIsActiveLogoAction({ formData, id })
    //   .then((res) => {
    //     console.log(res?.message);
    //     refetchLogo();
    //   })
    //   .catch((err) => {
    //     console.error("Error create logo:", err?.message);
    //   });
  };

  // lifecycle

  return (
    <>
      <Box style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <ButtonDefault onClick={handleOpenDailogCreate}>
          <IoMdAdd size={"20px"} />
          <Text>เพิ่ม ข้อมูลการติดต่อ</Text>
        </ButtonDefault>
      </Box>

      <Box
        style={{
          borderRadius: "8px",
          padding: "24px",
          gap: "16px",
          backgroundColor: "#FFFFFF",
        }}
      >
        {!isLoading ? (
          <>
            <TableContact
              rows={dataContact?.result}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
              handleClickIsActive={handleClickIsActive}
            />
            {!dataContact?.result ||
              (dataContact.result && dataContact.result?.length <= 0 && (
                <BoxNotDataTableAdmin />
              ))}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        {/* <DialogAddcontact
          dialogType={activeContactData ? "edit" : "create"}
          data={activeContactData}
          onSuccess={onSuccessDailogHomeDetail}
          onCancel={onCancelDailogHomeDetail}
          isOpen={openDialogCreateContact}
        /> */}

        <DialogDelete
          handleClose={handleCloseDialogDelete}
          handleSubmit={handleSubmitDelete}
          openModalDelete={openDialogDelete}
        />
      </Box>
    </>
  );
}
