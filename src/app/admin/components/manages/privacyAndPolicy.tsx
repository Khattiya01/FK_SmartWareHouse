"use client";

import { useState } from "react";
import DialogDelete from "@/components/dialogs/dialogDelete";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";
import { SelectprivacyAndPolicy } from "@/db/schemas";
import { TablePrivacyAndPolicy } from "../tables/tablePrivacyAndPolicy";
import { usePrivacyAndPolicy } from "@/app/hooks/usePrivacyAndPolicy";
import DialogAddPrivacyAndPolicy from "../dialogs/dialogAddPrivacyAndPolicy";
import {
  deletePrivacyAndPolicyAction,
  updateIsActivePrivacyAndPolicyAction,
} from "@/actions/privacyAndPolicy";
import { useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

export function ManagePrivacyAndPolicy() {
  // states
  const [openDialogCreateHomeDetail, setOpenDialogCreateHomeDetail] =
    useState<boolean>(false);
  const [activePrivacyAndPolicyData, setActivePrivacyAndPolicyData] = useState<
    SelectprivacyAndPolicy | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // pagination
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "25";

  // hooks
  const {
    data: dataPrivacyAndPolicy,
    refetch: refetchPrivacyAndPolicy,
    isLoading,
  } = usePrivacyAndPolicy({ page, pageSize });
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogHomeDetail = () => {
    refetchPrivacyAndPolicy();
    setOpenDialogCreateHomeDetail(false);
    setActivePrivacyAndPolicyData(undefined);
  };

  const onCancelDailogHomeDetail = () => {
    setOpenDialogCreateHomeDetail(false);
    setActivePrivacyAndPolicyData(undefined);
  };

  const handleOpenDailogCreate = () => {
    setOpenDialogCreateHomeDetail(true);
  };

  const handleOpenDailogEdit = (data: SelectprivacyAndPolicy) => {
    setActivePrivacyAndPolicyData(data);
    setOpenDialogCreateHomeDetail(true);
  };

  const handleSubmitDelete = async () => {
    if (activePrivacyAndPolicyData) {
      handleCloseDialogDelete();
      setActivePrivacyAndPolicyData(undefined);
      await deletePrivacyAndPolicyAction({
        id: activePrivacyAndPolicyData.id,
      })
        .then((res) => {
          if (res?.success) {
            refetchPrivacyAndPolicy();
            showToast(
              "ลบนโยบายและความเป็นส่วนตัวสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error("Error delete delete user:", res?.message);
            showToast(
              "ลบนโยบายและความเป็นส่วนตัวไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error delete delete user:", err.message);
        });
    } else {
      console.log("error deleting: active user Data is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActivePrivacyAndPolicyData(undefined);
  };
  const handleOpenDialogDelete = (data: SelectprivacyAndPolicy) => {
    setActivePrivacyAndPolicyData(data);
    setOpenDialogDelete(true);
  };

  const handleClickIsActive = async (isActive: boolean, id: string) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    await updateIsActivePrivacyAndPolicyAction({ formData, id })
      .then(() => {
        refetchPrivacyAndPolicy();
      })
      .catch((err) => {
        console.error("Error create user:", err?.message);
      });
  };
  // lifecycle

  return (
    <>
      <Box style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <ButtonDefault onClick={handleOpenDailogCreate}>
          <IoMdAdd size={"20px"} />
          <Text>เพิ่ม นโยบายและความเป็นส่วนตัว</Text>
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
            <TablePrivacyAndPolicy
              rows={dataPrivacyAndPolicy?.result.data}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
              handleClickIsActive={handleClickIsActive}
            />
            {dataPrivacyAndPolicy?.result.data &&
            dataPrivacyAndPolicy?.result.data?.length <= 0 ? (
              <BoxNotDataTableAdmin />
            ) : (
              <PaginationWithLinks
                page={parseInt(page)}
                pageSize={parseInt(pageSize)}
                totalCount={dataPrivacyAndPolicy?.result.total ?? 0}
                pageSizeSelectOptions={{
                  pageSizeOptions: [15, 25, 35, 50],
                }}
              />
            )}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        <DialogAddPrivacyAndPolicy
          dialogType={activePrivacyAndPolicyData ? "edit" : "create"}
          data={activePrivacyAndPolicyData}
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
