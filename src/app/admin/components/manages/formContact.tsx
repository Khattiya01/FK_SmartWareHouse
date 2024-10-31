"use client";

import { useState } from "react";
import { SelectContactForm } from "@/db/schemas";
import DialogDelete from "@/components/dialogs/dialogDelete";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import { TableFormContact } from "../tables/tableFormContact";
import { useFormContact } from "@/app/hooks/useFormContact";
import { deleteContactFormAction } from "@/actions/contactForm";
import ButtonOutline from "@/components/buttons/buttonOutline";
import { fetchFormContact } from "@/api/manage/manage-form-contact";
import ExportExcelFile from "@/utils/exportExcelFile";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";
import { useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

dayjs.extend(utc);
dayjs.extend(timezone);

export function ManageFormContact() {
  // states
  const [activeFormContact, setActiveFormContact] = useState<
    SelectContactForm | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // pagination
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "25";

  // hooks
  const {
    data: dataFormContact,
    refetch: refetchFormContact,
    isLoading,
  } = useFormContact({ page, pageSize });
  const showToast = useToastStore((state) => state.show);

  // functions
  const handleSubmitDelete = async () => {
    if (activeFormContact) {
      // await deleteContactForm(activeFormContact.id)
      await deleteContactFormAction({ id: activeFormContact.id })
        .then((res) => {
          if (res?.success) {
            refetchFormContact();
            showToast(
              "ลบแบบฟอร์มการติดต่อสำเร็จ",
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
              "ลบแบบฟอร์มการติดต่อไม่สำเร็จ",
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
        })
        .finally(() => {
          handleCloseDialogDelete();
          setActiveFormContact(undefined);
        });
    } else {
      console.log("error deleting: activeFormContact is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActiveFormContact(undefined);
  };
  const handleOpenDialogDelete = (data: SelectContactForm) => {
    setActiveFormContact(data);
    setOpenDialogDelete(true);
  };

  const handleExportExcelFile = async () => {
    await fetchFormContact({ page: "1", pageSize: "100000" }).then(
      (response) => {
        const dataExcel = response.result.data?.map((item) => ({
          CreateAt: dayjs.utc(item.created_at).format("DD/MM/YYYY HH:mm:ss"),
          Name: item.name,
          Email: item.email,
          Phone: item.phone,
          LIneID: item.lineId,
          Title: item.title,
          Message: item.message,
        }));
        console.log("dataExcel", dataExcel);
        ExportExcelFile({ data: dataExcel, fileName: "form-contact" });
      }
    );
  };
  // lifecycle

  return (
    <>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          height: "44px",
        }}
      >
        <ButtonOutline
          type="button"
          onClick={handleExportExcelFile}
          width="140px"
        >
          <Text className="text-base">Export to Excel</Text>
        </ButtonOutline>
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
            <TableFormContact
              rows={dataFormContact?.result.data}
              handleOpenDialogDelete={handleOpenDialogDelete}
            />
            {dataFormContact?.result.data &&
            dataFormContact?.result.data?.length <= 0 ? (
              <BoxNotDataTableAdmin />
            ) : (
              <PaginationWithLinks
                page={parseInt(page)}
                pageSize={parseInt(pageSize)}
                totalCount={dataFormContact?.result.total ?? 0}
                pageSizeSelectOptions={{
                  pageSizeOptions: [15, 25, 35, 50],
                }}
              />
            )}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        <DialogDelete
          handleClose={handleCloseDialogDelete}
          handleSubmit={handleSubmitDelete}
          openModalDelete={openDialogDelete}
        />
      </Box>
    </>
  );
}
