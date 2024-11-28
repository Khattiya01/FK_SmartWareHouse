"use client";

import { useState } from "react";
import DialogDelete from "@/components/dialogs/dialogDelete";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import { SelectTypeProduct } from "@/db/schemas";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import { useTypeProduct } from "@/app/hooks/useTypeProduct";
import { deleteTypeProductAction } from "@/actions/typeProduct";
import { TableTypeProduct } from "../tables/tableTypeProduct";
import DialogAddTypeProduct from "../dialogs/dialogAddTypeProduct";

export function ManageTypeProduct() {
  // states
  const [openDialogCreateTypeProduct, setOpenDialogCreateTypeProduct] =
    useState<boolean>(false);
  const [activeTypeProductData, setActiveTypeProductData] = useState<
    SelectTypeProduct | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // pagination
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "25";

  // hooks
  const {
    data: dataTypeProduct,
    refetch: refetchTypeProduct,
    isLoading,
  } = useTypeProduct({ page, pageSize });
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogTypeProduct = () => {
    refetchTypeProduct();
    setOpenDialogCreateTypeProduct(false);
    setActiveTypeProductData(undefined);
  };

  const onCancelDailogTypeProduct = () => {
    setOpenDialogCreateTypeProduct(false);
    setActiveTypeProductData(undefined);
  };

  const handleOpenDailogCreate = () => {
    setOpenDialogCreateTypeProduct(true);
  };

  const handleOpenDailogEdit = (data: SelectTypeProduct) => {
    setActiveTypeProductData(data);
    setOpenDialogCreateTypeProduct(true);
  };

  const handleSubmitDelete = async () => {
    if (activeTypeProductData) {
      handleCloseDialogDelete();
      setActiveTypeProductData(undefined);
      await deleteTypeProductAction({
        id: activeTypeProductData.id,
      })
        .then((res) => {
          if (res?.success) {
            refetchTypeProduct();
            showToast(
              "ลบผลิตภัณฑ์สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error("Error delete delete type product:", res?.message);
            showToast(
              "ลบผลิตภัณฑ์ไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error delete delete type product:", err.message);
        });
    } else {
      console.log("error deleting: activeTypeProductData is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActiveTypeProductData(undefined);
  };
  const handleOpenDialogDelete = (data: SelectTypeProduct) => {
    setActiveTypeProductData(data);
    setOpenDialogDelete(true);
  };

  // lifecycle

  return (
    <>
      <Box style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <ButtonDefault onClick={handleOpenDailogCreate}>
          <IoMdAdd size={"20px"} />
          <Text>เพิ่ม ผลิตภัณฑ์</Text>
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
            <TableTypeProduct
              rows={dataTypeProduct?.result.data}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
            />
            {dataTypeProduct?.result.data &&
            dataTypeProduct?.result.data?.length <= 0 ? (
              <BoxNotDataTableAdmin />
            ) : (
              <PaginationWithLinks
                page={parseInt(page)}
                pageSize={parseInt(pageSize)}
                totalCount={dataTypeProduct?.result.total ?? 0}
                pageSizeSelectOptions={{
                  pageSizeOptions: [15, 25, 35, 50],
                }}
              />
            )}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        <DialogAddTypeProduct
          dialogType={activeTypeProductData ? "edit" : "create"}
          data={activeTypeProductData}
          onSuccess={onSuccessDailogTypeProduct}
          onCancel={onCancelDailogTypeProduct}
          isOpen={openDialogCreateTypeProduct}
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
