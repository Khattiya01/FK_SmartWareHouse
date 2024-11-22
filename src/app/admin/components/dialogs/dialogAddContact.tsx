import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { createFileAction, deleteFileAction } from "@/actions/files";
import { SelectContact } from "@/db/schemas";
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
import InputFormManage from "@/components/inputs/inputFormManage";
import { CreateContactType } from "@/types/requests/createContact";
import { CreateContact } from "@/schemas/createContact";
import { createContactAction, updateContactAction } from "@/actions/contact";
import dayjs from "dayjs";
import InputTimeHM from "../inputTimeHM";
import { ImageUploadCompression } from "@/utils/ImageUploadCompression";

type DialogAddContactProps = {
  dialogType?: "create" | "edit";
  data: SelectContact | undefined;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
};
const DialogAddContact = ({
  onSuccess,
  onCancel,
  isOpen,
  data,
  dialogType = "create",
}: DialogAddContactProps) => {
  // hooks
  const showToast = useToastStore((state) => state.show);

  // state
  const LIMITFILE = 1;
  const maxSizeFile = 5; // 20Mb
  const [isLoadingUploadFile, setIsLoadingUploadFile] =
    useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [openAlertFileSize, setOpenAlertFileSize] = useState<boolean>(false);

  const [activeUploadFileID, setActiveUploadFileID] = useState<string>("");
  const [fileDelete, setFileDelete] = useState<blobToFile[]>([]);

  // function

  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    register,
  } = useForm<CreateContactType>({
    defaultValues: {
      map_image: [],
      bg_image: [],
      start_day_bs_hour: dayjs().hour(0).minute(0).format(),
      end_day_bs_hour: dayjs().hour(0).minute(0).format(),
    },
    resolver: zodResolver(CreateContact),
  });

  const onCheckFileUpload = async (
    uploadFiles: File[],
    currentFile: blobToFile[]
  ) => {
    const mockFiles = [];
    let isErrorFileSize = false;
    setIsLoadingUploadFile(true);

    for (const file of uploadFiles) {
      const fileCompress = await ImageUploadCompression(file);
      const NewFile = new File([fileCompress], fileCompress.name, {
        type: fileCompress?.type,
      });

      const blobToFile: blobToFile = Object.assign(NewFile, {
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

    setIsLoadingUploadFile(false);

    if (isErrorFileSize) {
      setOpenAlertFileSize(true);
      return [];
    } else {
      return [...currentFile, ...mockFiles];
    }
  };
  const handleDeleteFilebg_image = (file: blobToFile) => {
    const oldFile: blobToFile[] = watch("bg_image");
    const oldFileDelete = fileDelete;
    const newFile = oldFile.filter((f) => {
      if (f?.id !== file?.id) {
        return f?.id !== file?.id;
      } else if (file?.status !== "new") {
        setFileDelete([...oldFileDelete, f]);
      }
    });
    setValue("bg_image", newFile);
  };
  const handleDeleteFilemap_image = (file: blobToFile) => {
    const oldFile: blobToFile[] = watch("map_image");
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

  const onSubmitHandler = async (payload: CreateContactType) => {
    const formData = new FormData();
    const formData2 = new FormData();

    Array.from(payload.bg_image).map((file) => {
      formData.append("file", file);
    });
    Array.from(payload.map_image).map((file) => {
      formData2.append("file", file);
    });

    const resbg_image = await createFileAction(formData);
    const resmap_imagel = await createFileAction(formData2);

    const fd = new FormData();
    fd.append("address", payload.address);
    fd.append("province", payload.province);
    fd.append("district", payload.district);
    fd.append("sub_district", payload.sub_district);
    fd.append("postal_code", payload.postal_code);
    fd.append("tel", payload.tel);
    fd.append("phone", payload.phone);
    fd.append("line_id", payload.line_id);
    fd.append("line_url", payload.line_url);
    fd.append("facebook_url", payload.facebook_url);
    fd.append("tiktok_url", payload.tiktok_url);
    fd.append(
      "start_day_bs_hour",
      dayjs(payload.start_day_bs_hour).format()
      // dayjs(payload.start_day_bs_hour).format("HH:mm")
    );
    fd.append(
      "end_day_bs_hour",
      dayjs(payload.end_day_bs_hour).format()
      // dayjs(payload.end_day_bs_hour).format("HH:mm")
    );

    if (resbg_image?.result?.file_url) {
      fd.append("bg_image", resbg_image.result?.file_url);
    }
    if (resmap_imagel?.result?.file_url) {
      fd.append("map_image", resmap_imagel.result?.file_url);
    }

    setIsLoadingSubmit(true);
    if (dialogType === "edit" && data?.id) {
      await updateContactAction({ formData: fd, id: data.id })
        .then(async (res) => {
          setIsLoadingSubmit(false);
          clearData();

          if (res?.success) {
            const All_file_url = data.bg_image + "," + data.map_image;
            for (const file of All_file_url.split(",")) {
              await deleteFileAction({ file_url: file });
            }
            onSuccess();
            showToast(
              "แก้ไขการติดต่อสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            onCancel();
            showToast(
              "แก้ไขการติดต่อไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error create logo:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "แก้ไขการติดต่อไม่สำเร็จ",
            "",
            new Date(),
            typeStatusTaost.error
          );
        });
    }

    if (dialogType === "create") {
      await createContactAction(fd)
        .then((res) => {
          setIsLoadingSubmit(false);
          clearData();
          if (res?.success) {
            onSuccess();
            showToast(
              "เพิ่มการติดต่อสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            onCancel();
            showToast(
              "เพิ่มการติดต่อไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error create logo:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "เพิ่มการติดต่อไม่สำเร็จ",
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

  const fetchFileData = async (data: SelectContact) => {
    setIsLoadingData(true);
    const preData: {
      id: string;
      created_at: Date | null;
      updated_at: Date | null;
      address: string | null;
      province: string | null;
      district: string | null;
      sub_district: string | null;
      is_active: boolean | null;
      postal_code: string | null;
      tel: string | null;
      phone: string | null;
      map_image: blobToFile[];
      bg_image: blobToFile[];
      line_id: string | null;
      line_url: string | null;
      tiktok_url: string | null;
      facebook_url: string | null;
      start_day_bs_hour: string | null;
      end_day_bs_hour: string | null;
    } = {
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      address: data.address,
      province: data.province,
      district: data.district,
      sub_district: data.sub_district,
      postal_code: data.postal_code,
      tel: data.tel,
      phone: data.phone,
      map_image: [],
      bg_image: [],
      line_id: data.line_id,
      line_url: data.line_url,
      tiktok_url: data.tiktok_url,
      facebook_url: data.facebook_url,
      start_day_bs_hour: data.start_day_bs_hour,
      end_day_bs_hour: data.end_day_bs_hour,
      is_active: data.is_active,
    };

    const bg_image_urls = data.bg_image;
    const map_image_url = data.map_image;

    if (bg_image_urls) {
      const responsebg_image_urls = await fetchFileByURL(bg_image_urls);
      const responseFullbg_image_urls = await fetchImages(
        responsebg_image_urls.result.data
      );
      preData.bg_image.push(responseFullbg_image_urls[0]);
    }

    if (map_image_url) {
      const responsemap_image_url = await fetchFileByURL(map_image_url);
      const responseFullmap_image_url = await fetchImages(
        responsemap_image_url.result.data
      );
      preData.map_image.push(responseFullmap_image_url[0]);
    }

    setValue("address", data.address ?? "");
    setValue("province", data.province ?? "");
    setValue("district", data.district ?? "");
    setValue("sub_district", data.sub_district ?? "");
    setValue("postal_code", data.postal_code ?? "");
    setValue("tel", data.tel ?? "");
    setValue("phone", data.phone ?? "");
    setValue("bg_image", preData.bg_image);
    setValue("map_image", preData.map_image);
    setValue("line_id", preData.line_id ?? "");
    setValue("line_url", preData.line_url ?? "");
    setValue("facebook_url", preData.facebook_url ?? "");
    setValue("tiktok_url", preData.tiktok_url ?? "");
    setValue("start_day_bs_hour", preData.start_day_bs_hour ?? "");
    setValue("end_day_bs_hour", preData.end_day_bs_hour ?? "");
    setValue("is_active", preData.is_active ?? false);

    setIsLoadingData(false);
  };

  useEffect(() => {
    if (data && isOpen) {
      fetchFileData(data);
    }
  }, [data, isOpen]);

  return (
    <>
      <DialogComponent
        isOpen={isOpen}
        className=" lg:max-w-5xl sm:max-w-lg"
        title={data ? "แก้ไขการติดต่อ" : "เพิ่มการติดต่อ"}
        content={
          dialogType === "edit" && isLoadingData ? (
            <BoxLoadingData minHeight="666px" />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="w-full text-xl sm:h-[calc(100vh-216px)] h-[calc(100vh-126px)] overflow-y-auto flex flex-col justify-between"
            >
              <div className=" flex flex-col w-full pl-1 pr-1  ">
                <div className=" flex gap-6 flex-col ">
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
                    required
                  />
                  <InputFormManage
                    name={"เบอร์มือถือ"}
                    placeholder="เบอร์มือถือ"
                    register={{ ...register("phone") }}
                    msgError={errors.phone?.message}
                    type="number"
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"Link Facebook"}
                    placeholder="Link Facebook"
                    register={{ ...register("facebook_url") }}
                    msgError={errors.facebook_url?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"Link Tiktok"}
                    placeholder="link Tiktok"
                    register={{ ...register("tiktok_url") }}
                    msgError={errors.tiktok_url?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"Link Line"}
                    placeholder="Link Line"
                    register={{ ...register("line_url") }}
                    msgError={errors.line_url?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"Link Id"}
                    placeholder="Link Id"
                    register={{ ...register("line_id") }}
                    msgError={errors.line_id?.message}
                    showLabel
                    required
                  />
                  <InputTimeHM
                    name="วัน - เวลาเริ่มทำการ"
                    valueHour={dayjs(watch("start_day_bs_hour")).format("HH")}
                    valueMinute={dayjs(watch("start_day_bs_hour")).format("mm")}
                    handleChangeHour={(e) => {
                      setValue(
                        "start_day_bs_hour",
                        dayjs(watch("start_day_bs_hour"))
                          .hour(parseInt(e))
                          .format()
                      );
                    }}
                    handleChangeMinute={(e) => {
                      setValue(
                        "start_day_bs_hour",
                        dayjs(watch("start_day_bs_hour"))
                          .minute(parseInt(e))
                          .format()
                      );
                    }}
                  />
                  <InputTimeHM
                    name={"วัน - เวลาหยุดทำการ"}
                    valueHour={dayjs(watch("end_day_bs_hour")).format("HH")}
                    valueMinute={dayjs(watch("end_day_bs_hour")).format("mm")}
                    handleChangeHour={(e) => {
                      setValue(
                        "end_day_bs_hour",
                        dayjs(watch("end_day_bs_hour"))
                          .hour(parseInt(e))
                          .format()
                      );
                    }}
                    handleChangeMinute={(e) => {
                      setValue(
                        "end_day_bs_hour",
                        dayjs(watch("end_day_bs_hour"))
                          .minute(parseInt(e))
                          .format()
                      );
                    }}
                  />
                  {/* <SelectComponents
                    option={TIME24}
                    defaultValue={
                      watch("start_day_bs_hour") ?? TIME24[0]?.value ?? ""
                    }
                    onValueChange={(value) =>
                      setValue("start_day_bs_hour", value)
                    }
                    name={"วัน - เวลาเริ่มทำการ"}
                    required
                    showLabel
                  />
                  <SelectComponents
                    option={TIME24}
                    defaultValue={
                      watch("end_day_bs_hour") ?? TIME24[0]?.value ?? ""
                    }
                    onValueChange={(value) =>
                      setValue("end_day_bs_hour", value)
                    }
                    name={"วัน - เวลาหยุดทำการ"}
                    required
                    showLabel
                  /> */}
                  <Box
                    style={{ gap: 1, display: "flex", flexDirection: "column" }}
                  >
                    <label
                      className=" flex gap-1 "
                      htmlFor={"name"}
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "28px",
                      }}
                    >
                      อัปโหลดรูปภาพพื้นหลัง
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
                        {watch("bg_image")?.length < 1 && (
                          <Box
                            style={{
                              width:
                                watch("bg_image")?.length > 0
                                  ? "168px"
                                  : "100%",
                              minWidth:
                                watch("bg_image")?.length > 0
                                  ? "168px"
                                  : "auto",
                              marginTop: "10px",
                            }}
                          >
                            <UploadField
                              id="content_02_image_url_id"
                              isError={errors.bg_image?.message !== undefined}
                              acceptDescription={".JPEG, .JPG, .PNG"}
                              files={watch("bg_image")}
                              onLoading={(loading) =>
                                setIsLoadingUploadFile(loading)
                              }
                              onCheckFileUpload={(f) => {
                                setActiveUploadFileID(
                                  "content_02_image_url_id"
                                );
                                onCheckFileUpload(f, watch("bg_image")).then(
                                  (file) => {
                                    setValue("bg_image", file);
                                  }
                                );
                              }}
                              acceptOption={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpeg"],
                              }}
                            />
                          </Box>
                        )}
                        {watch("bg_image") && watch("bg_image")?.length > 0 && (
                          <ListFileCardDragField
                            files={watch("bg_image")}
                            setFiles={(f) => setValue("bg_image", f)}
                            onClickDelete={(f) => handleDeleteFilebg_image(f)}
                          />
                        )}
                      </Box>
                    )}
                    {errors.bg_image?.message && (
                      <div className="text-require">
                        {errors.bg_image?.message}
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
                        fontSize: "16px",
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
                        {watch("map_image")?.length < LIMITFILE && (
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
                                setActiveUploadFileID(
                                  "content_02_image_url_id"
                                );
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
                            />
                          </Box>
                        )}
                        {watch("map_image") &&
                          watch("map_image")?.length > 0 && (
                            <ListFileCardDragField
                              files={watch("map_image")}
                              setFiles={(f) => setValue("map_image", f)}
                              onClickDelete={(f) =>
                                handleDeleteFilemap_image(f)
                              }
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
                </div>
              </div>
              <div className="flex gap-2 w-full sm:justify-end justify-center text-xl mt-4 ">
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

export default DialogAddContact;
