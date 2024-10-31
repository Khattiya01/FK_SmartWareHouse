import { useForm } from "react-hook-form";

import { SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormManage from "@/components/inputs/inputFormManage";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { createFileAction, deleteFileAction } from "@/actions/files";
import { SelectProduct } from "@/db/schemas";
import { Box, Spinner, Text } from "@radix-ui/themes";
import ButtonOutline from "@/components/buttons/buttonOutline";
import UploadField from "@/components/uploadFIle/uploadField";
import ListFileCardDragField from "@/components/uploadFIle/listFileCardDragField";
import { blobToFile } from "@/types/file";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { DialogComponent } from "@/components/alertDialogs/dialog.component";
import AlertDialogComponent from "@/components/alertDialogs/alertDialog";
import { fetchFileByURL, fetchImages } from "@/api/file";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import { CreateProduct } from "@/schemas/createProduct";
import { CreatProductType } from "@/types/requests/createProduct";
import { createProductAction, updateProductAction } from "@/actions/products";
import SelectComponents from "@/components/selects/selectComponents";
import { fetchCategory } from "@/api/manage/manage-category";
import InputTextareaFormManage from "@/components/inputs/inputTextareaFormManage ";

type DialogAddProductProps = {
  dialogType?: "create" | "edit";
  data: SelectProduct | undefined;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
};
const DialogAddProduct = ({
  onSuccess,
  onCancel,
  isOpen,
  data,
  dialogType = "create",
}: DialogAddProductProps) => {
  // hooks
  const showToast = useToastStore((state) => state.show);

  // state
  const LIMITFILE = 20;
  const maxSizeFile = 5; // 20Mb
  const [isLoadingUploadFile, setIsLoadingUploadFile] =
    useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [openAlertFileSize, setOpenAlertFileSize] = useState<boolean>(false);

  const [activeUploadFileID, setActiveUploadFileID] = useState<string>("");
  const [fileDelete, setFileDelete] = useState<blobToFile[]>([]);

  const [optionCategory, setOptionCategory] = useState<
    { value: string; label: string }[]
  >([]);

  // function

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreatProductType>({
    defaultValues: {
      main_image: [],
      map_image: [],
      others_image: [],
    },
    resolver: zodResolver(CreateProduct),
  });

  const onCheckFileUpload = async (
    uploadFiles: File[],
    currentFile: blobToFile[]
  ) => {
    const mockFiles = [];
    let isErrorFileSize = false;
    setIsLoadingUploadFile(true);

    for (const file of uploadFiles) {
      const blobToFile: blobToFile = Object.assign(file, {
        index: Math.random().toString(36).slice(2),
        id: Math.random().toString(36).slice(2),
        status: "new",
        imageURL: "",
        url: "",
        file_url: "",
        error: false,
      });

      if ([...currentFile, ...mockFiles]?.length >= LIMITFILE) {
        break;
      }

      if (file.size > maxSizeFile * 1024 * 1024) {
        isErrorFileSize = true;
        blobToFile.error = true;
        mockFiles.push(blobToFile);
      } else {
        blobToFile.imageURL = URL.createObjectURL(file);
        mockFiles.push(blobToFile);
      }
    }

    console.log("isErrorFileSize", isErrorFileSize);
    console.log("mockFiles", mockFiles);
    setIsLoadingUploadFile(false);

    if (isErrorFileSize) {
      setOpenAlertFileSize(true);
      return [];
    } else {
      return [...currentFile, ...mockFiles];
    }
  };
  const handleDeleteFileMain = (file: blobToFile) => {
    const oldFile: blobToFile[] = watch("main_image");
    const oldFileDelete = fileDelete;
    const newFile = oldFile.filter((f) => {
      if (f?.id !== file?.id) {
        return f?.id !== file?.id;
      } else if (file?.status !== "new") {
        setFileDelete([...oldFileDelete, f]);
      }
    });
    setValue("main_image", newFile);
  };
  const handleDeleteFileMap = (file: blobToFile) => {
    const oldFile = watch("map_image");
    const oldFileDelete = fileDelete;
    const newFile = oldFile.filter((f) => {
      if (f?.id !== file?.id) {
        return f?.id !== file?.id;
      } else if (file?.status !== "new") {
        setFileDelete([...oldFileDelete, f]);
      }
    });
    setValue("map_image", newFile);
  };
  const handleDeleteFileOthers = (file: blobToFile) => {
    const oldFile = watch("others_image");
    const oldFileDelete = fileDelete;
    const newFile = oldFile.filter((f) => {
      if (f?.id !== file?.id) {
        return f?.id !== file?.id;
      } else if (file?.status !== "new") {
        setFileDelete([...oldFileDelete, f]);
      }
    });
    setValue("others_image", newFile);
  };
  const onSubmitHandler = async (payload: CreatProductType) => {
    console.log("payload", payload);
    const formData1 = new FormData();
    const formData3 = new FormData();
    const formData4 = new FormData();
    Array.from(payload.main_image).forEach((file) => {
      formData1.append("file", file);
    });

    Array.from(payload.map_image).map((file) => {
      formData3.append("file", file);
    });
    Array.from(payload.others_image).map((file) => {
      formData4.append("file", file);
    });
    const resmain_image = await createFileAction(formData1);
    const resmap_image = await createFileAction(formData3);
    const resothers_image = await createFileAction(formData4);

    const fd = new FormData();
    fd.append("category_id", payload.category_id);
    fd.append("name", payload.name);
    fd.append("description", payload.description);
    fd.append("price", payload.price);
    fd.append("address", payload.address);
    fd.append("province", payload.province);
    fd.append("district", payload.district);
    fd.append("sub_district", payload.sub_district);
    fd.append("postal_code", payload.postal_code);
    if (payload?.tel) {
      fd.append("tel", payload?.tel);
    }
    if (payload?.phone) {
      fd.append("phone", payload?.phone);
    }
    if (payload?.remark) {
      fd.append("remark", payload?.remark);
    }

    if (resmain_image?.result?.file_url) {
      fd.append("main_image", resmain_image.result?.file_url);
    }
    if (resmap_image?.result?.file_url) {
      fd.append("map_image", resmap_image.result?.file_url);
    }
    if (resothers_image?.result?.file_url) {
      fd.append("others_image", resothers_image.result?.file_url);
    }

    if (dialogType === "create") {
      await createProductAction(fd)
        .then((res) => {
          console.log(res?.message);
          setIsLoadingSubmit(false);
          onSuccess();
          showToast(
            "เพิ่มผลิตภัณฑ์สำเร็จ",
            "",
            new Date(),
            typeStatusTaost.success
          );
          clearData();
        })
        .catch((err) => {
          console.error("Error create product:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "เพิ่มผลิตภัณฑ์ไม่สำเร็จ",
            "",
            new Date(),
            typeStatusTaost.error
          );
        });
    }

    if (dialogType === "edit" && data?.id) {
      const All_file_url =
        data.main_image + "," + data.map_image + "," + data.others_image;
      for (const file of All_file_url.split(",")) {
        await deleteFileAction({ file_url: file });
      }
      await updateProductAction({ formData: fd, id: data.id })
        .then((res) => {
          console.log(res?.success, res?.message);
          if (res?.success) {
            setIsLoadingSubmit(false);
            onSuccess();
            showToast(
              "แก้ไขผลิตภัณฑ์สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
            clearData();
          } else {
            setIsLoadingSubmit(false);
            onCancel();
            showToast(
              "แก้ไขผลิตภัณฑ์ไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
            clearData();
          }
        })
        .catch((err) => {
          console.error("Error create product:", err?.message);
          setIsLoadingSubmit(false);
          onCancel();
          showToast(
            "แก้ไขผลิตภัณฑ์ไม่สำเร็จ",
            "",
            new Date(),
            typeStatusTaost.error
          );
        });
    }
  };

  const onCancelHandler = () => {
    defaultValue();
    onCancel();
  };

  const clearData = () => {
    defaultValue();
  };

  const defaultValue = () => {
    reset();
  };

  const fetchFileData = async (data: SelectProduct) => {
    setIsLoadingData(true);
    const preData : {
      id: string,
      created_at: Date | null,
      updated_at: Date | null,
      category_id: string,
      name:string,
      description: string | null,
      price: string | null,
      address: string | null,
      province: string | null,
      district: string | null,
      sub_district: string | null,
      postal_code: string | null,
      tel: string | null,
      phone: string | null,
      remark: string | null,
      main_image: blobToFile[],
      map_image: blobToFile[],
      others_image: blobToFile[],
    } = {
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      category_id: data.category_id,
      name: data.name,
      description: data.description,
      price: data.price,
      address: data.address,
      province: data.province,
      district: data.district,
      sub_district: data.sub_district,
      postal_code: data.postal_code,
      tel: data.tel,
      phone: data.phone,
      remark: data.remark,
      main_image: [],
      map_image: [],
      others_image: [],
    };

    const main_image_urls = data.main_image;
    const map_image_url = data.map_image;
    const others_image_url = data.others_image?.split(",");

    if (others_image_url && others_image_url?.length > 0) {
      preData.others_image = await Promise.all(
        others_image_url?.map(async (image) => {
          const response = await fetchFileByURL(image);
          const responseFullothers_image_url = await fetchImages(
            response.result.data
          );
          return responseFullothers_image_url[0];
        })
      );
    }

    if (main_image_urls) {
      const responsemain_image_urls = await fetchFileByURL(main_image_urls);
      const responseFullmain_image_urls = await fetchImages(
        responsemain_image_urls.result.data
      );
      preData.main_image.push(responseFullmain_image_urls[0]);
    }

    if (map_image_url) {
      const responsemap_image_url = await fetchFileByURL(map_image_url);
      const responseFullmap_image_url = await fetchImages(
        responsemap_image_url.result.data
      );
      preData.map_image.push(responseFullmap_image_url[0]);
    }
    console.log("preData", preData);

    setValue("category_id", data.category_id);
    setValue("name", data.name);
    setValue("description", data.description ?? "");
    setValue("price", data.price ?? "");
    setValue("address", data.address ?? "");
    setValue("province", data.province ?? "");
    setValue("district", data.district ?? "");
    setValue("sub_district", data.sub_district ?? "");
    setValue("postal_code", data.postal_code ?? "");
    setValue("tel", data.tel ?? "");
    setValue("phone", data.phone ?? "");
    setValue("remark", data.remark ?? "");
    setValue("main_image", preData.main_image);
    setValue("map_image", preData.map_image);
    setValue("others_image", preData.others_image);

    setIsLoadingData(false);
  };

  useEffect(() => {
    if (isOpen) {
      if (data) {
        fetchFileData(data);
      }
      fetchCategory({page: "1", pageSize: "100000"}).then((category) => {
        const ListOption: SetStateAction<{ value: string; label: string }[]> =
          [];
        category.result.data?.map((item) => {
          const option = {
            value: item.id,
            label: item.name,
          };
          ListOption.push(option);
        });
        setOptionCategory(ListOption);
        if (ListOption && ListOption?.length > 0) {
          setValue("category_id", ListOption[0].value);
        }
        console.log("category", category);
        console.log("ListOption", ListOption);
      });
    }
  }, [data, isOpen]);

  return (
    <>
      <DialogComponent
        isOpen={isOpen}
        className=" lg:max-w-5xl sm:max-w-lg"
        title={data ? "แก้ไขผลิตภัณฑ์" : "เพิ่มผลิตภัณฑ์"}
        content={
          dialogType === "edit" && isLoadingData ? (
            <BoxLoadingData minHeight="666px" />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="w-full text-xl"
            >
              <div className=" flex flex-col w-full max-h-[600px] pl-1 pr-1 overflow-y-auto ">
                <div className=" flex gap-6 flex-col ">
                  <InputFormManage
                    name={"ชื่อผลิตภัณฑ์"}
                    placeholder="ชื่อผลิตภัณฑ์"
                    register={{ ...register("name") }}
                    msgError={errors.name?.message}
                    showLabel
                    required
                  />
                  <SelectComponents
                    option={optionCategory}
                    defaultValue={
                      watch("category_id") ?? optionCategory[0]?.value ?? ""
                    }
                    onValueChange={(value) => setValue("category_id", value)}
                    name={"หมวดหมู่"}
                    required
                    showLabel
                  />
                  <InputTextareaFormManage
                    name={"รายละเอียด"}
                    placeholder="รายละเอียด"
                    register={{ ...register("description") }}
                    msgError={errors.description?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"ราคา"}
                    placeholder="ราคา"
                    register={{ ...register("price") }}
                    msgError={errors.price?.message}
                    showLabel
                    required
                    type="number"
                  />
                  <InputFormManage
                    name={"ที่อยู่"}
                    placeholder="ที่อยู่"
                    register={{ ...register("address") }}
                    msgError={errors.address?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"จังหวัด"}
                    placeholder="จังหวัด"
                    register={{ ...register("province") }}
                    msgError={errors.province?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"อำเภอ"}
                    placeholder="อำเภอ"
                    register={{ ...register("district") }}
                    msgError={errors.district?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"ตำบล"}
                    placeholder="ตำบล"
                    register={{ ...register("sub_district") }}
                    msgError={errors.sub_district?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"รหัสไปรษณีย์"}
                    placeholder="รหัสไปรษณีย์"
                    register={{ ...register("postal_code") }}
                    msgError={errors.postal_code?.message}
                    type="number"
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"เบอร์โทรศัพท์"}
                    placeholder="เบอร์โทรศัพท์"
                    register={{ ...register("tel") }}
                    msgError={errors.tel?.message}
                    type="number"
                    showLabel
                  />
                  <InputFormManage
                    name={"เบอร์มือถือ"}
                    placeholder="เบอร์มือถือ"
                    register={{ ...register("phone") }}
                    msgError={errors.phone?.message}
                    type="number"
                    showLabel
                  />

                  <Box
                    style={{ gap: 1, display: "flex", flexDirection: "column" }}
                  >
                    <label
                      className=" flex gap-1 "
                      htmlFor={"name"}
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                      }}
                    >
                      อัปโหลดรูปภาพหลัก<div className=" text-red-500">*</div>
                    </label>
                    {isLoadingUploadFile ? (
                      <Spinner size="3" />
                    ) : (
                      <Box
                        style={{
                          display: "flex",
                          gap: "8px",
                          overflowX: "auto",
                          height: "242px",
                          marginTop: "-10px",
                        }}
                        className=" lg:max-w-[976px] max-w-[464px]"
                      >
                        {watch("main_image")?.length < 1 && (
                          <Box
                            style={{
                              width:
                                watch("main_image")?.length > 0
                                  ? "168px"
                                  : "100%",
                              minWidth:
                                watch("main_image")?.length > 0
                                  ? "168px"
                                  : "auto",
                              marginTop: "10px",
                            }}
                          >
                            <UploadField
                              id="main_image_id"
                              isError={errors.main_image?.message !== undefined}
                              acceptDescription={".JPEG, .JPG, .PNG"}
                              files={watch("main_image")}
                              onLoading={(loading) =>
                                setIsLoadingUploadFile(loading)
                              }
                              onCheckFileUpload={(f) => {
                                setActiveUploadFileID("main_image_id");
                                onCheckFileUpload(f, watch("main_image")).then(
                                  (file) => {
                                    setValue("main_image", file);
                                  }
                                );
                              }}
                              acceptOption={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpeg"],
                                "image/webp": [".webp"],
                              }}
                              multiple={false}
                            />
                          </Box>
                        )}
                        {watch("main_image") &&
                          watch("main_image")?.length > 0 && (
                            <ListFileCardDragField
                              files={watch("main_image")}
                              setFiles={(f) => setValue("main_image", f)}
                              onClickDelete={(f) => handleDeleteFileMain(f)}
                            />
                          )}
                      </Box>
                    )}
                    {errors.main_image?.message && (
                      <div className="text-require">
                        {errors.main_image?.message}
                      </div>
                    )}
                  </Box>
                  <Box
                    style={{ gap: 1, display: "flex", flexDirection: "column" }}
                  >
                    <label
                      className=" flex gap-1 "
                      htmlFor={"name"}
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                      }}
                    >
                      อัปโหลดรูปภาพแผนที่
                      <div className=" text-red-500">*</div>
                    </label>
                    {isLoadingUploadFile ? (
                      <Spinner size="3" />
                    ) : (
                      <Box
                        style={{
                          display: "flex",
                          gap: "8px",
                          overflowX: "auto",
                          height: "242px",
                          marginTop: "-10px",
                        }}
                        className=" lg:max-w-[976px] max-w-[464px]"
                      >
                        {watch("map_image")?.length < 1 && (
                          <Box
                            style={{
                              width:
                                watch("map_image")?.length > 0
                                  ? "168px"
                                  : "100%",
                              minWidth:
                                watch("map_image")?.length > 0
                                  ? "168px"
                                  : "auto",
                              marginTop: "10px",
                            }}
                          >
                            <UploadField
                              id="content_02_image_url_id"
                              isError={errors.map_image?.message !== undefined}
                              acceptDescription={".JPEG, .JPG, .PNG"}
                              files={watch("map_image")}
                              onLoading={(loading) =>
                                setIsLoadingUploadFile(loading)
                              }
                              onCheckFileUpload={(f) => {
                                setActiveUploadFileID("map_image_id");
                                onCheckFileUpload(f, watch("map_image")).then(
                                  (file) => {
                                    setValue("map_image", file);
                                  }
                                );
                              }}
                              acceptOption={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpeg"],
                                "image/webp": [".webp"],
                              }}
                              multiple={false}
                            />
                          </Box>
                        )}
                        {watch("map_image") &&
                          watch("map_image")?.length > 0 && (
                            <ListFileCardDragField
                              files={watch("map_image")}
                              setFiles={(f) => setValue("map_image", f)}
                              onClickDelete={(f) => handleDeleteFileMap(f)}
                            />
                          )}
                      </Box>
                    )}
                    {errors.map_image?.message && (
                      <div className="text-require">
                        {errors.map_image?.message}
                      </div>
                    )}
                  </Box>
                  <Box
                    style={{ gap: 1, display: "flex", flexDirection: "column" }}
                  >
                    <label
                      className=" flex gap-1 "
                      htmlFor={"name"}
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                      }}
                    >
                      อัปโหลดรูปภาพอื่นๆ
                      <div className=" text-red-500">*</div>
                    </label>
                    {isLoadingUploadFile ? (
                      <Spinner size="3" />
                    ) : (
                      <Box
                        style={{
                          display: "flex",
                          gap: "8px",
                          overflowX: "auto",
                          height: "242px",
                          marginTop: "-10px",
                        }}
                        className=" lg:max-w-[976px] max-w-[464px]"
                      >
                        {watch("others_image")?.length < LIMITFILE && (
                          <Box
                            style={{
                              width:
                                watch("others_image")?.length > 0
                                  ? "168px"
                                  : "100%",
                              minWidth:
                                watch("others_image")?.length > 0
                                  ? "168px"
                                  : "auto",
                              marginTop: "10px",
                            }}
                          >
                            <UploadField
                              id="content_02_image_url_id"
                              isError={
                                errors.others_image?.message !== undefined
                              }
                              acceptDescription={".JPEG, .JPG, .PNG"}
                              files={watch("others_image")}
                              onLoading={(loading) =>
                                setIsLoadingUploadFile(loading)
                              }
                              onCheckFileUpload={(f) => {
                                setActiveUploadFileID(
                                  "content_02_image_url_id"
                                );
                                onCheckFileUpload(
                                  f,
                                  watch("others_image")
                                ).then((file) => {
                                  setValue("others_image", file);
                                });
                              }}
                              acceptOption={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpeg"],
                                "image/webp": [".webp"],
                              }}
                            />
                          </Box>
                        )}
                        {watch("others_image") &&
                          watch("others_image")?.length > 0 && (
                            <ListFileCardDragField
                              files={watch("others_image")}
                              setFiles={(f) => setValue("others_image", f)}
                              onClickDelete={(f) => handleDeleteFileOthers(f)}
                            />
                          )}
                      </Box>
                    )}
                    {errors.others_image?.message && (
                      <div className="text-require">
                        {errors.others_image?.message}
                      </div>
                    )}
                  </Box>
                  <InputFormManage
                    name={"หมายเหตุ"}
                    placeholder="หมายเหตุ"
                    register={{ ...register("remark") }}
                    showLabel
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full justify-end text-xl mt-4 ">
                <ButtonOutline
                  disable={isLoadingSubmit}
                  type="button"
                  onClick={() => onCancelHandler()}
                  width="140px"
                >
                  <Text className=" text-base ">ยกเลิก</Text>
                </ButtonOutline>
                <ButtonDefault
                  type="submit"
                  width="140px"
                  onClick={() => {}}
                  isLoading={isLoadingSubmit}
                >
                  <Text className=" text-base ">
                    {data ? "ยืนยัน" : "สร้าง"}
                  </Text>
                </ButtonDefault>
              </div>
            </form>
          )
        }
      />

      <AlertDialogComponent
        id={activeUploadFileID}
        className="  max-w-md"
        handleClose={() => {
          setOpenAlertFileSize(false);
        }}
        handleSubmit={() => {
          setOpenAlertFileSize(false);
        }}
        isOpen={openAlertFileSize}
        title={"ไฟล์ใหญ่เกินไป"}
        description={
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontSize: "16px", lineHeight: "24px" }}>
              “ขนาดไฟล์เกินมาตรฐานที่กำหนด
            </Text>
            <Text style={{ fontSize: "16px", lineHeight: "24px" }}>
              กรุณาเลือกไฟล์ใหม่และอัปโหลดอีกครั้ง
            </Text>
            <Text style={{ fontSize: "16px", lineHeight: "24px" }}>
              [ขนาดไฟล์ใหญ่สุด: 5MB]”
            </Text>
          </Box>
        }
        btnSubmitName={"ลองอีกครั้ง"}
        btnCancelName={"ยกเลิก"}
      />
    </>
  );
};

export default DialogAddProduct;
