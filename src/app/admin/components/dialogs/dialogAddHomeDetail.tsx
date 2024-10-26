import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormManage from "@/components/inputs/inputFormManage";
import ButtonDefault from "@/components/buttons/buttonDefault";
import {
  createHomePageDetailAction,
  updateHomePageDetailAction,
} from "@/actions/homePageDetail";
import { createFileAction, deleteFileAction } from "@/actions/files";
import { CreatHomePageDetailType } from "@/types/requests/createHomeDetail";
import { CreateHomePageDetail } from "@/schemas/createHomePageDetail";
import { SelectHomePageDetail } from "@/db/schemas";
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

type DialogHomeDetailProps = {
  dialogType?: "create" | "edit";
  data: SelectHomePageDetail | undefined;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
};
const DialogHomeDetail = ({
  onSuccess,
  onCancel,
  isOpen,
  data,
  dialogType = "create",
}: DialogHomeDetailProps) => {
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

  // function

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreatHomePageDetailType>({
    defaultValues: {
      banner_image_url: [],
      contact_image_url: [],
      content_02_image_url: [],
    },
    resolver: zodResolver(CreateHomePageDetail),
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
  const handleDeleteFileBanner = (file: blobToFile) => {
    const oldFile: blobToFile[] = watch("banner_image_url");
    const oldFileDelete = fileDelete;
    const newFile = oldFile.filter((f) => {
      if (f?.id !== file?.id) {
        return f?.id !== file?.id;
      } else if (file?.status !== "new") {
        setFileDelete([...oldFileDelete, f]);
      }
    });
    setValue("banner_image_url", newFile);
  };
  const handleDeleteFileContent2 = (file: blobToFile) => {
    const oldFile = watch("content_02_image_url");
    const oldFileDelete = fileDelete;
    const newFile = oldFile.filter((f) => {
      if (f?.id !== file?.id) {
        return f?.id !== file?.id;
      } else if (file?.status !== "new") {
        setFileDelete([...oldFileDelete, f]);
      }
    });
    setValue("content_02_image_url", newFile);
  };
  const handleDeleteFileContact = (file: blobToFile) => {
    const oldFile = watch("contact_image_url");
    const oldFileDelete = fileDelete;
    const newFile = oldFile.filter((f) => {
      if (f?.id !== file?.id) {
        return f?.id !== file?.id;
      } else if (file?.status !== "new") {
        setFileDelete([...oldFileDelete, f]);
      }
    });
    setValue("contact_image_url", newFile);
  };

  const onSubmitHandler = async (payload: CreatHomePageDetailType) => {
    console.log("payload", payload);

    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    Array.from(payload.banner_image_url).forEach((file) => {
      formData1.append("file", file);
    });
    Array.from(payload.contact_image_url).map((file) => {
      formData2.append("file", file);
    });
    Array.from(payload.content_02_image_url).map((file) => {
      formData3.append("file", file);
    });
    const resbanner_image_url = await createFileAction(formData1);
    const rescontact_image_url = await createFileAction(formData2);
    const rescontent_02_image_url = await createFileAction(formData3);

    const fd = new FormData();
    fd.append("content_01_title", payload.content_01_title);
    fd.append("content_01_detail", payload.content_01_detail);
    fd.append("content_02_detail", payload.content_02_detail);

    if (rescontent_02_image_url?.result?.file_url) {
      fd.append(
        "content_02_image_url",
        rescontent_02_image_url.result?.file_url
      );
    }
    if (resbanner_image_url?.result?.file_url) {
      fd.append("banner_image_url", resbanner_image_url.result?.file_url);
    }
    if (rescontact_image_url?.result?.file_url) {
      fd.append("contact_image_url", rescontact_image_url.result?.file_url);
    }
    setIsLoadingSubmit(true);
    if (dialogType === "edit" && data?.id) {
      const All_file_url =
        data.banner_image_url +
        "," +
        data.contact_image_url +
        "," +
        data.content_02_image_url;
      for (const file of All_file_url.split(",")) {
        await deleteFileAction({ file_url: file });
      }
      await updateHomePageDetailAction({ formData: fd, id: data.id })
        .then((res) => {
          console.log(res?.message);
          setIsLoadingSubmit(false);
          onSuccess();
          showToast(
            "เพิ่มรายละเอียดหน้าแรกสำเร็จ",
            "",
            new Date(),
            typeStatusTaost.success
          );
          clearData();
        })
        .catch((err) => {
          console.error("Error create logo:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "เพิ่มรายละเอียดหน้าแรกไม่สำเร็จ",
            "",
            new Date(),
            typeStatusTaost.error
          );
        });
    }

    if (dialogType === "create") {
      await createHomePageDetailAction(fd)
        .then((res) => {
          console.log(res?.message);
          setIsLoadingSubmit(false);
          onSuccess();
          showToast(
            "เพิ่มรายละเอียดหน้าแรกสำเร็จ",
            "",
            new Date(),
            typeStatusTaost.success
          );
          clearData();
        })
        .catch((err) => {
          console.error("Error create logo:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "เพิ่มรายละเอียดหน้าแรกไม่สำเร็จ",
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

  const fetchFileData = async (data: SelectHomePageDetail) => {
    setIsLoadingData(true);
    const preData: {
      id: string;
      is_active: boolean | null;
      created_at: Date | null;
      updated_at: Date | null;
      banner_image_url: blobToFile[];
      content_02_image_url: blobToFile[];
      contact_image_url: blobToFile[];
      content_01_title: string;
      content_01_detail: string;
      content_02_detail: string;
    } = {
      id: data.id,
      is_active: data.is_active,
      created_at: data.created_at,
      updated_at: data.updated_at,
      banner_image_url: [],
      content_02_image_url: [],
      contact_image_url: [],
      content_01_title: data.content_01_title,
      content_01_detail: data.content_01_detail,
      content_02_detail: data.content_02_detail,
    };

    const banner_image_urls = data.banner_image_url.split(",");
    const content_02_image_url = data.content_02_image_url;
    const contact_image_url = data.contact_image_url;

    // Fetch banner images
    if (banner_image_urls && banner_image_urls.length > 0) {
      preData.banner_image_url = await Promise.all(
        banner_image_urls.map(async (image) => {
          const response = await fetchFileByURL(image);
          const responseFullbanner_image_urls = await fetchImages(
            response.result
          );
          return responseFullbanner_image_urls[0];
        })
      );
    }

    // Fetch content 02 image
    const responseContent_02_image_url = await fetchFileByURL(
      content_02_image_url
    );
    const responseFullContent_02_image_url = await fetchImages(
      responseContent_02_image_url.result
    );
    if (responseFullContent_02_image_url) {
      preData.content_02_image_url.push(responseFullContent_02_image_url[0]);
    }

    // Fetch contact image
    const responseContact_image_url = await fetchFileByURL(contact_image_url);
    const responseFullContact_image_url = await fetchImages(
      responseContact_image_url.result
    );
    if (responseFullContact_image_url) {
      preData.contact_image_url.push(responseFullContact_image_url[0]);
    }

    // Set the values after all data is fetched
    setValue("content_01_title", data.content_01_title);
    setValue("content_01_detail", data.content_01_detail);
    setValue("content_02_detail", data.content_02_detail);
    setValue("banner_image_url", preData.banner_image_url);
    setValue("content_02_image_url", preData.content_02_image_url);
    setValue("contact_image_url", preData.contact_image_url);

    // Set loading state to false after all operations
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
        title={data ? "แก้ไขรายละเอียดหน้าแรก" : "เพิ่มรายละเอียดหน้าแรก"}
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
                    name={"ชื่อหัวข้อเนื้อหาที่ 1"}
                    placeholder="ชื่อหัวข้อเนื้อหาที่ 1"
                    register={{ ...register("content_01_title") }}
                    msgError={errors.content_01_title?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"รายละเอียดเนื้อหาที่ 1"}
                    placeholder="รายละเอียดเนื้อหาที่ 1"
                    register={{ ...register("content_01_detail") }}
                    msgError={errors.content_01_detail?.message}
                    showLabel
                    required
                  />
                  <InputFormManage
                    name={"รายละเอียดเนื้อหาที่ 2"}
                    placeholder="รายละเอียดเนื้อหาที่ 2"
                    register={{ ...register("content_02_detail") }}
                    msgError={errors.content_02_detail?.message}
                    showLabel
                    required
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
                      อัปโหลดรูปภาพ Banner<div className=" text-red-500">*</div>
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
                        {watch("banner_image_url")?.length < LIMITFILE && (
                          <Box
                            style={{
                              width:
                                watch("banner_image_url")?.length > 0
                                  ? "168px"
                                  : "100%",
                              minWidth:
                                watch("banner_image_url")?.length > 0
                                  ? "168px"
                                  : "auto",
                              marginTop: "10px",
                            }}
                          >
                            <UploadField
                              id="banner_image_url_id"
                              isError={
                                errors.banner_image_url?.message !== undefined
                              }
                              acceptDescription={".JPEG, .JPG, .PNG"}
                              files={watch("banner_image_url")}
                              onLoading={(loading) =>
                                setIsLoadingUploadFile(loading)
                              }
                              onCheckFileUpload={(f) => {
                                setActiveUploadFileID("banner_image_url_id");
                                onCheckFileUpload(
                                  f,
                                  watch("banner_image_url")
                                ).then((file) => {
                                  setValue("banner_image_url", file);
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
                        {watch("banner_image_url") &&
                          watch("banner_image_url")?.length > 0 && (
                            <ListFileCardDragField
                              files={watch("banner_image_url")}
                              setFiles={(f) => setValue("banner_image_url", f)}
                              onClickDelete={(f) => handleDeleteFileBanner(f)}
                            />
                          )}
                      </Box>
                    )}
                    {errors.banner_image_url?.message && (
                      <div className="text-require">
                        {errors.banner_image_url?.message}
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
                      อัปโหลดรูปภาพ เนื้อหาที่ 2
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
                        {watch("content_02_image_url")?.length < 1 && (
                          <Box
                            style={{
                              width:
                                watch("content_02_image_url")?.length > 0
                                  ? "168px"
                                  : "100%",
                              minWidth:
                                watch("content_02_image_url")?.length > 0
                                  ? "168px"
                                  : "auto",
                              marginTop: "10px",
                            }}
                          >
                            <UploadField
                              id="content_02_image_url_id"
                              isError={
                                errors.content_02_image_url?.message !==
                                undefined
                              }
                              acceptDescription={".JPEG, .JPG, .PNG"}
                              files={watch("content_02_image_url")}
                              onLoading={(loading) =>
                                setIsLoadingUploadFile(loading)
                              }
                              onCheckFileUpload={(f) => {
                                setActiveUploadFileID(
                                  "content_02_image_url_id"
                                );
                                onCheckFileUpload(
                                  f,
                                  watch("content_02_image_url")
                                ).then((file) => {
                                  setValue("content_02_image_url", file);
                                });
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
                        {watch("content_02_image_url") &&
                          watch("content_02_image_url")?.length > 0 && (
                            <ListFileCardDragField
                              files={watch("content_02_image_url")}
                              setFiles={(f) =>
                                setValue("content_02_image_url", f)
                              }
                              onClickDelete={(f) => handleDeleteFileContent2(f)}
                            />
                          )}
                      </Box>
                    )}
                    {errors.content_02_image_url?.message && (
                      <div className="text-require">
                        {errors.content_02_image_url?.message}
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
                      อัปโหลดรูปภาพพื้นหลัง ติดต่อเรา
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
                        {watch("contact_image_url")?.length < 1 && (
                          <Box
                            style={{
                              width:
                                watch("contact_image_url")?.length > 0
                                  ? "168px"
                                  : "100%",
                              minWidth:
                                watch("contact_image_url")?.length > 0
                                  ? "168px"
                                  : "auto",
                              marginTop: "10px",
                            }}
                          >
                            <UploadField
                              id="content_02_image_url_id"
                              isError={
                                errors.contact_image_url?.message !== undefined
                              }
                              acceptDescription={".JPEG, .JPG, .PNG"}
                              files={watch("contact_image_url")}
                              onLoading={(loading) =>
                                setIsLoadingUploadFile(loading)
                              }
                              onCheckFileUpload={(f) => {
                                setActiveUploadFileID(
                                  "content_02_image_url_id"
                                );
                                onCheckFileUpload(
                                  f,
                                  watch("contact_image_url")
                                ).then((file) => {
                                  setValue("contact_image_url", file);
                                });
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
                        {watch("contact_image_url") &&
                          watch("contact_image_url")?.length > 0 && (
                            <ListFileCardDragField
                              files={watch("contact_image_url")}
                              setFiles={(f) => setValue("contact_image_url", f)}
                              onClickDelete={(f) => handleDeleteFileContact(f)}
                            />
                          )}
                      </Box>
                    )}
                    {errors.contact_image_url?.message && (
                      <div className="text-require">
                        {errors.contact_image_url?.message}
                      </div>
                    )}
                  </Box>
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

export default DialogHomeDetail;
