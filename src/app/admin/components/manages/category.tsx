"use client";

import { useState } from "react";
import DialogDelete from "@/components/dialogs/dialogDelete";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import { TableCategory } from "../tables/tableCategory";
import { useCategory } from "@/app/hooks/useCategory";
import { SelectCategory } from "@/db/schemas";
import { deleteCategoryAction } from "@/actions/category";
import DialogAddCategory from "../dialogs/dialogAddCategory";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";

export function ManageCategory() {
  // states
  const [openDialogCreateHomeDetail, setOpenDialogCreateHomeDetail] =
    useState<boolean>(false);
  const [activeCategoryData, setActiveCategoryData] = useState<
    SelectCategory | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // pagination
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "25";

  // hooks
  const {
    data: dataCategory,
    refetch: refetchCategory,
    isLoading,
  } = useCategory({ page, pageSize });
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogHomeDetail = () => {
    refetchCategory();
    setOpenDialogCreateHomeDetail(false);
    setActiveCategoryData(undefined);
  };

  const onCancelDailogHomeDetail = () => {
    setOpenDialogCreateHomeDetail(false);
    setActiveCategoryData(undefined);
  };

  const handleOpenDailogCreate = () => {
    setOpenDialogCreateHomeDetail(true);
  };

  const handleOpenDailogEdit = (data: SelectCategory) => {
    setActiveCategoryData(data);
    setOpenDialogCreateHomeDetail(true);
  };

  const handleSubmitDelete = async () => {
    if (activeCategoryData) {
      handleCloseDialogDelete();
      setActiveCategoryData(undefined);
      await deleteCategoryAction({
        id: activeCategoryData.id,
        file_url: activeCategoryData.image_url,
      })
        .then((res) => {
          if (res?.success) {
            refetchCategory();
            showToast(
              "ลบหมวดหมู่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error("Error delete delete category:", res?.message);
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
        });
    } else {
      console.log("error deleting: activeCategoryData is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActiveCategoryData(undefined);
  };
  const handleOpenDialogDelete = (data: SelectCategory) => {
    setActiveCategoryData(data);
    setOpenDialogDelete(true);
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
          <>
            <TableCategory
              rows={dataCategory?.result.data}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
            />
            {dataCategory?.result.data &&
            dataCategory?.result.data?.length <= 0 ? (
              <BoxNotDataTableAdmin />
            ) : (
              <PaginationWithLinks
                page={parseInt(page)}
                pageSize={parseInt(pageSize)}
                totalCount={dataCategory?.result.total ?? 0}
                pageSizeSelectOptions={{
                  pageSizeOptions: [15, 25, 35, 50],
                }}
              />
            )}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        <DialogAddCategory
          dialogType={activeCategoryData ? "edit" : "create"}
          data={activeCategoryData}
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
