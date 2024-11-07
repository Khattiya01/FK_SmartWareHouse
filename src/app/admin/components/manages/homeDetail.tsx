"use client";

import { useHomeDetail } from "@/app/hooks/useHomeDetail";

import { useState } from "react";
import DialogHomeDetail from "../dialogs/dialogAddHomeDetail";
import { SelectHomePageDetail } from "@/db/schemas";
import DialogDelete from "@/components/dialogs/dialogDelete";
import {
  deleteHomePageDetailAction,
  updateIsActiveHomePageDetailAction,
} from "@/actions/homePageDetail";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import { TableHomeDetail } from "../tables/tableHomeDetail";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";

export function ManageHomeDetail() {
  // states
  const [openDialogCreateHomeDetail, setOpenDialogCreateHomeDetail] =
    useState<boolean>(false);
  const [activeHomeDetailData, setActiveHomeDetailData] = useState<
    SelectHomePageDetail | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // pagination
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "25";

  // hooks
  const {
    data: dataHomeDetail,
    refetch: refetchHomeDetail,
    isLoading,
  } = useHomeDetail({ page, pageSize });
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogHomeDetail = () => {
    refetchHomeDetail();
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

  const handleOpenDailogEdit = (data: SelectHomePageDetail) => {
    setActiveHomeDetailData(data);
    setOpenDialogCreateHomeDetail(true);
  };

  const handleSubmitDelete = async () => {
    if (activeHomeDetailData) {
      handleCloseDialogDelete();
      setActiveHomeDetailData(undefined);
      await deleteHomePageDetailAction({
        id: activeHomeDetailData.id,
        file_url:
          activeHomeDetailData.banner_image_url +
          "," +
          activeHomeDetailData.contact_image_url +
          "," +
          activeHomeDetailData.content_02_image_url,
      })
        .then((res) => {
          if (res?.success) {
            refetchHomeDetail();
            showToast(
              "ลบรายละเอียดหน้าแรกสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error(
              "Error delete deleteHomePageDetailAction:",
              res?.message
            );
            showToast(
              "ลบรายละเอียดหน้าแรกไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error(
            "Error delete deleteHomePageDetailAction:",
            err.message
          );
        });
    } else {
      console.log("error deleting: activeHomeDetailData is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActiveHomeDetailData(undefined);
  };
  const handleOpenDialogDelete = (data: SelectHomePageDetail) => {
    setActiveHomeDetailData(data);
    setOpenDialogDelete(true);
  };

  const handleClickIsActive = async (isActive: boolean, id: string) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    await updateIsActiveHomePageDetailAction({ formData, id })
      .then(() => {
        refetchHomeDetail();
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
          <Text>เพิ่ม รายละเอียดหน้าแรก</Text>
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
            <TableHomeDetail
              rows={dataHomeDetail?.result.data}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
              handleClickIsActive={handleClickIsActive}
            />
            {dataHomeDetail?.result.data &&
            dataHomeDetail?.result.data?.length <= 0 ? (
              <BoxNotDataTableAdmin />
            ) : (
              <PaginationWithLinks
                page={parseInt(page)}
                pageSize={parseInt(pageSize)}
                totalCount={dataHomeDetail?.result.total ?? 0}
                pageSizeSelectOptions={{
                  pageSizeOptions: [15, 25, 35, 50],
                }}
              />
            )}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        <DialogHomeDetail
          dialogType={activeHomeDetailData ? "edit" : "create"}
          data={activeHomeDetailData}
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
