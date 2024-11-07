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

import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";
import { useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { InputCalendarRange } from "@/components/calendars/InputCalendarRange";
import InputFormManage from "@/components/inputs/inputFormManage";
import ButtonDefault from "@/components/buttons/buttonDefault";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
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
  const [debounceSearchText, setDebounceSearchText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [debounceStartDate, setDebounceStartDate] = useState("");
  const [debounceEndDate, setDebounceEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // hooks
  const {
    data: dataFormContact,
    refetch: refetchFormContact,
    isLoading,
  } = useFormContact({
    page,
    pageSize,
    searchText: debounceSearchText,
    startDate: debounceStartDate,
    endDate: debounceEndDate,
  });
  const showToast = useToastStore((state) => state.show);

  // functions
  const handleSubmitDelete = async () => {
    if (activeFormContact) {
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
    await fetchFormContact({
      page: "1",
      pageSize: "100000",
      searchText: debounceSearchText,
      startDate: debounceStartDate,
      endDate: debounceEndDate
    }).then((response) => {
      const dataExcel = response.result.data?.map((item) => ({
        CreateAt: dayjs.utc(item.created_at).format("DD/MM/YYYY HH:mm:ss"),
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        LIneID: item.lineId,
        Title: item.title,
        Message: item.message,
      }));
      ExportExcelFile({ data: dataExcel, fileName: "form-contact" });
    });
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
      <div className=" flex justify-between w-full gap-4 max-sm:flex-wrap">
        <div className=" flex gap-4 w-full flex-wrap">
          <Box className=" w-full sm:max-w-[420px]">
            <InputFormManage
              name={"ค้นหา"}
              placeholder="ค้นหาด้วย ชื่อ หรือ อีเมล"
              register={{
                onChange: (e) => {
                  setSearchText(e.target.value);
                },
              }}
              showLabel={false}
            />
          </Box>
          <InputCalendarRange
            className="  h-11 "
            onChangeDate={(date) => {
              if (date?.from) {
                setStartDate(dayjs(date?.from).format("YYYY-MM-DD"));
              }
              if (date?.to) {
                setEndDate(dayjs(date?.to).format("YYYY-MM-DD"));
              }
            }}
          />
        </div>
        <ButtonDefault
          type="submit"
          width="140px"
          className=" h-6"
          onClick={() => {
            // refetchFormContact();
            setDebounceSearchText(searchText);
            setDebounceStartDate(startDate);
            setDebounceEndDate(endDate);
          }}
          isLoading={false}
        >
          <Text className=" text-base ">ค้นหา</Text>
        </ButtonDefault>
      </div>
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
