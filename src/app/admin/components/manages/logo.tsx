"use client";

import { useState } from "react";
import DialogDelete from "@/components/dialogs/dialogDelete";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import { useLogo } from "@/app/hooks/useLogo";
import { TableLogo } from "../tables/tableLogo";
import { Selectlogo } from "@/db/schemas";
import { deleteLogoAction, updateIsActiveLogoAction } from "@/actions/logos";
import DialogAddLogo from "../dialogs/dialogAddLogo";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";

export function ManageLogo() {
  // states
  const [openDialogCreateHomeDetail, setOpenDialogCreateHomeDetail] =
    useState<boolean>(false);
  const [activeLogoData, setActiveLogoData] = useState<Selectlogo | undefined>(
    undefined
  );
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // hooks
  const { data: dataLogo, refetch: refetchLogo, isLoading } = useLogo();
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogHomeDetail = () => {
    refetchLogo();
    setOpenDialogCreateHomeDetail(false);
    setActiveLogoData(undefined);
  };

  const onCancelDailogHomeDetail = () => {
    setOpenDialogCreateHomeDetail(false);
    setActiveLogoData(undefined);
  };

  const handleOpenDailogCreate = () => {
    setOpenDialogCreateHomeDetail(true);
  };

  const handleOpenDailogEdit = (data: Selectlogo) => {
    setActiveLogoData(data);
    setOpenDialogCreateHomeDetail(true);
  };

  const handleSubmitDelete = async () => {
    if (activeLogoData) {
      handleCloseDialogDelete();
      setActiveLogoData(undefined);
      await deleteLogoAction({
        id: activeLogoData.id,
        file_url: activeLogoData.image_url,
      })
        .then((res) => {
          if (res?.success) {
            refetchLogo();
            showToast("ลบโลโก้สำเร็จ", "", new Date(), typeStatusTaost.success);
          } else {
            console.error("Error delete delete category:", res.message);
            showToast(
              "ลบโลโก้ไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error delete delete category:", err.message);
        });
    } else {
      console.log("error deleting: activeLogoData is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActiveLogoData(undefined);
  };
  const handleOpenDialogDelete = (data: Selectlogo) => {
    setActiveLogoData(data);
    setOpenDialogDelete(true);
  };

  const handleClickIsActive = async (isActive: boolean, id: string) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    await updateIsActiveLogoAction({ formData, id })
      .then((res) => {
        console.log(res?.message);
        refetchLogo();
      })
      .catch((err) => {
        console.error("Error create logo:", err?.message);
      });
  };
  // lifecycle

  return (
    <>
      <Box style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <ButtonDefault onClick={handleOpenDailogCreate}>
          <IoMdAdd size={"20px"} />
          <Text>เพิ่ม โลโก้</Text>
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
            <TableLogo
              rows={dataLogo?.result}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
              handleClickIsActive={handleClickIsActive}
            />
            {!dataLogo?.result ||
              (dataLogo?.result && dataLogo?.result?.length <= 0 && (
                <BoxNotDataTableAdmin />
              ))}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        <DialogAddLogo
          dialogType={activeLogoData ? "edit" : "create"}
          data={activeLogoData}
          onSuccess={onSuccessDailogHomeDetail}
          onCancel={onCancelDailogHomeDetail}
          isOpen={openDialogCreateHomeDetail}
        />

        <DialogDelete
          handleClose={handleCloseDialogDelete}
          handleSubmit={handleSubmitDelete}
          openModalDelete={openDialogDelete}
        />
      </Box>
    </>
  );
}
