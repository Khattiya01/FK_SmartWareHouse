"use client";

import { useState } from "react";
import DialogDelete from "@/components/dialogs/dialogDelete";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";
import { TableUser } from "../tables/tableUser";
import { useUser } from "@/app/hooks/useUser";
import { SelectUser } from "@/db/schemas";
import DialogAddUser from "../dialogs/dialogAddUser";
import { deleteUserAction, updateIsActiveUserAction } from "@/actions/users";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";

export function ManageUser() {
  // states
  const [openDialogCreateHomeDetail, setOpenDialogCreateHomeDetail] =
    useState<boolean>(false);
  const [activeUserData, setActiveUserData] = useState<SelectUser | undefined>(
    undefined
  );
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // pagination
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "25";

  // hooks
  const {
    data: dataUser,
    refetch: refetchUser,
    isLoading,
  } = useUser({ page, pageSize });
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogHomeDetail = () => {
    refetchUser();
    setOpenDialogCreateHomeDetail(false);
    setActiveUserData(undefined);
  };

  const onCancelDailogHomeDetail = () => {
    setOpenDialogCreateHomeDetail(false);
    setActiveUserData(undefined);
  };

  const handleOpenDailogCreate = () => {
    setOpenDialogCreateHomeDetail(true);
  };

  const handleOpenDailogEdit = (data: SelectUser) => {
    setActiveUserData(data);
    setOpenDialogCreateHomeDetail(true);
  };

  const handleSubmitDelete = async () => {
    if (activeUserData) {
      handleCloseDialogDelete();
      setActiveUserData(undefined);
      await deleteUserAction({
        id: activeUserData.id,
      })
        .then((res) => {
          if (res?.success) {
            refetchUser();
            showToast(
              "ลบผู้ใช้งานสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error("Error delete delete user:", res?.message);
            showToast(
              "ลบผู้ใช้งานไม่สำเร็จ",
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
    setActiveUserData(undefined);
  };
  const handleOpenDialogDelete = (data: SelectUser) => {
    setActiveUserData(data);
    setOpenDialogDelete(true);
  };

  const handleClickIsActive = async (isActive: boolean, id: string) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    await updateIsActiveUserAction({ formData, id })
      .then(() => {
        refetchUser();
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
          <Text>เพิ่ม ผู้ใช้งาน</Text>
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
            <TableUser
              rows={dataUser?.result.data}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
              handleClickIsActive={handleClickIsActive}
            />

            {dataUser?.result.data && dataUser?.result.data?.length <= 0 ? (
              <BoxNotDataTableAdmin />
            ) : (
              <PaginationWithLinks
                page={parseInt(page)}
                pageSize={parseInt(pageSize)}
                totalCount={dataUser?.result.total ?? 0}
                pageSizeSelectOptions={{
                  pageSizeOptions: [15, 25, 35, 50],
                }}
              />
            )}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        <DialogAddUser
          dialogType={activeUserData ? "edit" : "create"}
          data={activeUserData}
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
