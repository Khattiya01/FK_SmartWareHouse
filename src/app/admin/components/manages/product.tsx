"use client";

import { useState } from "react";
import DialogDelete from "@/components/dialogs/dialogDelete";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { Box, Text } from "@radix-ui/themes";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { IoMdAdd } from "react-icons/io";
import { TableProduct } from "../tables/tableProduct";
import { SelectProduct } from "@/db/schemas";
import { useProduct } from "@/app/hooks/useProduct";
import DialogAddProduct from "../dialogs/dialogAddProduct";
import {
  deleteProductAction,
  updateIsActiveProductAction,
} from "@/actions/products";
import BoxNotDataTableAdmin from "@/components/boxNotData/boxNotDataTableAdmin";

export function ManageProduct() {
  // states
  const [openDialogCreateHomeDetail, setOpenDialogCreateHomeDetail] =
    useState<boolean>(false);
  const [activeProductData, setActiveProductData] = useState<
    SelectProduct | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // hooks
  const {
    data: dataProduct,
    refetch: refetchProduct,
    isLoading,
  } = useProduct();
  const showToast = useToastStore((state) => state.show);

  // functions

  const onSuccessDailogHomeDetail = () => {
    refetchProduct();
    setOpenDialogCreateHomeDetail(false);
    setActiveProductData(undefined);
  };

  const onCancelDailogHomeDetail = () => {
    setOpenDialogCreateHomeDetail(false);
    setActiveProductData(undefined);
  };

  const handleOpenDailogCreate = () => {
    setOpenDialogCreateHomeDetail(true);
  };

  const handleOpenDailogEdit = (data: SelectProduct) => {
    setActiveProductData(data);
    setOpenDialogCreateHomeDetail(true);
  };

  const handleSubmitDelete = async () => {
    if (activeProductData) {
      handleCloseDialogDelete();
      setActiveProductData(undefined);
      await deleteProductAction({
        id: activeProductData.id,
        file_url:
          activeProductData.main_image +
          "," +
          activeProductData.map_image +
          "," +
          activeProductData.others_image,
      })
        .then((res) => {
          if (res.success) {
            refetchProduct();
            showToast(
              "ลบผลิตภัณฑ์สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error("Error delete product:", res.message);
            showToast(
              "ลบผลิตภัณฑ์ไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error delete product:", err.message);
        });
    } else {
      console.log("error deleting: activeProductData is undefined");
    }
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setActiveProductData(undefined);
  };
  const handleOpenDialogDelete = (data: SelectProduct) => {
    setActiveProductData(data);
    setOpenDialogDelete(true);
  };

  const handleClickIsActive = async (isActive: boolean, id: string) => {
    const formData = new FormData();
    formData.append("is_active", isActive ? "true" : "false");
    await updateIsActiveProductAction({ formData, id })
      .then((res) => {
        console.log(res?.message);
        refetchProduct();
      })
      .catch((err) => {
        console.error("Error create logo:", err?.message);
      });
  };

  // lifecycle

  return (
    <>
      <Box style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        {/* <Box className=" w-[400px]">
          <InputFormManage
            name={"Search"}
            placeholder="Search"
            required
            showLabel={false}
          />
        </Box> */}
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
          width: "100%",
        }}
      >
        {!isLoading ? (
          <>
            <TableProduct
              rows={dataProduct?.result}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
              handleClickIsActive={handleClickIsActive}
            />
            {!dataProduct?.result ||
              (dataProduct?.result && dataProduct?.result?.length <= 0 && (
                <BoxNotDataTableAdmin />
              ))}
          </>
        ) : (
          <BoxLoadingData height="300px" />
        )}

        <DialogAddProduct
          dialogType={activeProductData ? "edit" : "create"}
          data={activeProductData}
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
