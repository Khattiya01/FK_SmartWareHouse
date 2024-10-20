"use client";

import { useState } from "react";
import DialogDelete from "@/components/dialogs/dialogDelete";
import { updateIsActiveHomePageDetailAction } from "@/actions/homePageDetail";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import { TableCategory } from "../tables/tableCategory";
import { useCategory } from "@/app/hooks/useCategory";
import { SelectCategory } from "@/db/schemas";
import { deleteCategoryAction } from "@/actions/category";

export function ManageCategory() {
  // states
  const [openDialogCreateHomeDetail, setOpenDialogCreateHomeDetail] =
    useState<boolean>(false);
  const [activeHomeDetailData, setActiveHomeDetailData] = useState<
    SelectCategory | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // hooks
  const {
    data: dataCategory,
    refetch: refetchCategory,
    isLoading,
  } = useCategory();
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogHomeDetail = () => {
    refetchCategory();
    setOpenDialogCreateHomeDetail(false);
    setActiveHomeDetailData(undefined);
  };

  const onCancelDailogHomeDetail = () => {
    setOpenDialogCreateHomeDetail(false);
    setActiveHomeDetailData(undefined);
  };

  const handleOpenDailogCreate = () => {
    setOpenDialogCreateHomeDetail(true);
  };

  const handleOpenDailogEdit = (data: SelectCategory) => {
    setActiveHomeDetailData(data);
    setOpenDialogCreateHomeDetail(true);
  };

  const handleSubmitDelete = async () => {
    if (activeHomeDetailData) {
      await deleteCategoryAction({
        id: activeHomeDetailData.id,
        file_url: activeHomeDetailData.image_url,
      })
        .then((res) => {
          if (res.success) {
            refetchCategory();
            showToast(
              "ลบหมวดหมู่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error("Error delete delete category:", res.message);
            showToast(
              "ลบหมวดหมู่ไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error delete delete category:", err.message);
        })
        .finally(() => {
          handleCloseDialogDelete();
          setActiveHomeDetailData(undefined);
        });
    } else {
      console.log("error deleting: activeHomeDetailData is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActiveHomeDetailData(undefined);
  };
  const handleOpenDialogDelete = (data: SelectCategory) => {
    setActiveHomeDetailData(data);
    setOpenDialogDelete(true);
  };

  const handleClickIsActive = async (
    isActive: string | boolean,
    id: string
  ) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    await updateIsActiveHomePageDetailAction({ formData, id })
      .then((res) => {
        console.log(res?.message);
        refetchCategory();
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
          <Text>เพิ่ม หมวดหมู่</Text>
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
          <TableCategory
            rows={dataCategory?.result}
            handleClickEdit={handleOpenDailogEdit}
            handleOpenDialogDelete={handleOpenDialogDelete}
          />
        ) : (
          <BoxLoadingData height="300px" />
        )}

        {/* <DialogHomeDetail
          dialogType={activeHomeDetailData ? "edit" : "create"}
          data={activeHomeDetailData}
          onSuccess={onSuccessDailogHomeDetail}
          onCancel={onCancelDailogHomeDetail}
          isOpen={openDialogCreateHomeDetail}
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
