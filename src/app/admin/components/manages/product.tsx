"use client";

import { SetStateAction, useEffect, useState } from "react";
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
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import InputFormManage from "@/components/inputs/inputFormManage";
import SelectComponents from "@/components/selects/selectComponents";
import { fetchCategory } from "@/api/manage/manage-category";

export function ManageProduct() {
  // states
  const [openDialogCreateHomeDetail, setOpenDialogCreateHomeDetail] =
    useState<boolean>(false);
  const [activeProductData, setActiveProductData] = useState<
    SelectProduct | undefined
  >(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  // pagination
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "25";
  const [searchText, setSearchText] = useState("");
  const [debounceSearchText, setDebounceSearchText] = useState("");
  const [optionCategory, setOptionCategory] = useState<
    { value: string; label: string }[]
  >([]);
  const [category, setCategory] = useState("");
  const [debounceCategory, setDebounceCategory] = useState("");

  // hooks
  const {
    data: dataProduct,
    refetch: refetchProduct,
    isLoading,
  } = useProduct({
    page,
    pageSize,
    searchText: searchText,
    category: category,
  });
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
          if (res?.success) {
            refetchProduct();
            showToast(
              "ลบผลิตภัณฑ์สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            console.error("Error delete product:", res?.message);
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
      .then(() => {
        refetchProduct();
      })
      .catch((err) => {
        console.error("Error create logo:", err?.message);
      });
  };

  // lifecycle
  useEffect(() => {
    fetchCategory({ page: "1", pageSize: "100000" }).then((category) => {
      const ListOption: SetStateAction<{ value: string; label: string }[]> = [
        {
          value: "",
          label: "ทั้งหมด",
        },
      ];
      category.result.data?.map((item) => {
        const option = {
          value: item.id,
          label: item.name,
        };
        ListOption.push(option);
      });
      setOptionCategory(ListOption);
      setDebounceCategory(ListOption[0].value);
    });
  }, []);

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
      <div className=" flex justify-between w-full gap-4 max-sm:flex-wrap">
        <div className=" flex gap-4 w-full flex-wrap">
          <Box className=" w-full sm:max-w-[420px]">
            <InputFormManage
              name={"ค้นหา"}
              placeholder="ค้นหาด้วย รหัสผลิตภัณฑ์ หรือ ชื่อผลิตภัณฑ์"
              register={{
                onChange: (e) => {
                  setDebounceSearchText(e.target.value);
                },
              }}
              showLabel={false}
            />
          </Box>
          <Box className=" w-full sm:max-w-[160px]">
            <SelectComponents
              option={optionCategory}
              defaultValue={debounceCategory ?? optionCategory[0]?.value ?? ""}
              onValueChange={(value) => setDebounceCategory(value)}
              name={"หมวดหมู่"}
              showLabel={false}
            />
          </Box>
        </div>
        <ButtonDefault
          type="submit"
          width="140px"
          className=" h-6"
          onClick={() => {
            // refetchProduct();
            setCategory(debounceCategory);
            setSearchText(debounceSearchText);
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
          width: "100%",
        }}
      >
        {!isLoading ? (
          <>
            <TableProduct
              rows={dataProduct?.result.data}
              handleClickEdit={handleOpenDailogEdit}
              handleOpenDialogDelete={handleOpenDialogDelete}
              handleClickIsActive={handleClickIsActive}
            />
            {dataProduct?.result.data &&
            dataProduct?.result.data?.length <= 0 ? (
              <BoxNotDataTableAdmin />
            ) : (
              <PaginationWithLinks
                page={parseInt(page)}
                pageSize={parseInt(pageSize)}
                totalCount={dataProduct?.result.total ?? 0}
                pageSizeSelectOptions={{
                  pageSizeOptions: [15, 25, 35, 50],
                }}
              />
            )}
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
