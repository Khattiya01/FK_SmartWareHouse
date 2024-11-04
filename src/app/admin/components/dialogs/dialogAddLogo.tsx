import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { createFileAction, deleteFileAction } from "@/actions/files";
import { Selectlogo } from "@/db/schemas";
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
import { CreateLogoType } from "@/types/requests/createLogo";
import { CreateLogo } from "@/schemas/createLogo";
import { createLogoAction, updateLogoAction } from "@/actions/logos";

type DialogAddLogoProps = {
  dialogType?: "create" | "edit";
  data: Selectlogo | undefined;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
};
const DialogAddLogo = ({
  onSuccess,
  onCancel,
  isOpen,
  data,
  dialogType = "create",
}: DialogAddLogoProps) => {
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
  } = useForm<CreateLogoType>({
    defaultValues: {
      image_url: [],
    },
    resolver: zodResolver(CreateLogo),
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
  const handleDeleteFile = (file: blobToFile) => {
    const oldFile: blobToFile[] = watch("image_url");
    const oldFileDelete = fileDelete;
    const newFile = oldFile.filter((f) => {
      if (f?.id !== file?.id) {
        return f?.id !== file?.id;
      } else if (file?.status !== "new") {
        setFileDelete([...oldFileDelete, f]);
      }
    });
    setValue("image_url", newFile);
  };

  const onSubmitHandler = async (payload: CreateLogoType) => {
    console.log("payload", payload);

    const formData = new FormData();

    Array.from(payload.image_url).map((file) => {
      formData.append("file", file);
    });

    const resImage_url = await createFileAction(formData);

    const fd = new FormData();

    if (resImage_url?.result?.file_url) {
      fd.append("image_url", resImage_url.result?.file_url);
    }

    setIsLoadingSubmit(true);
    if (dialogType === "edit" && data?.id) {
      const All_file_url = data.image_url;
      for (const file of All_file_url.split(",")) {
        await deleteFileAction({ file_url: file });
      }
      await updateLogoAction({ formData: fd, id: data.id })
        .then((res) => {
          console.log(res?.message);
          setIsLoadingSubmit(false);
          clearData();

          if (res?.success) {
            onSuccess();
            showToast(
              "แก้ไขโลโก้สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            onCancel();
            showToast(
              "แก้ไขโลโก้ไม่สำเร็จ",
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
            "แก้ไขโลโก้ไม่สำเร็จ",
            "",
            new Date(),
            typeStatusTaost.error
          );
        });
    }

    if (dialogType === "create") {
      await createLogoAction(fd)
        .then((res) => {
          console.log(res?.message);
          setIsLoadingSubmit(false);
          clearData();

          if (res?.success) {
            onSuccess();
            showToast(
              "เพิ่มโลโก้สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            onCancel();
            showToast(
              "เพิ่มโลโก้ไม่สำเร็จ",
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
            "เพิ่มโลโก้ไม่สำเร็จ",
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

  const fetchFileData = async (data: Selectlogo) => {
    setIsLoadingData(true);
    const preData = {
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
    const image_url = data.image_url;
    const responseImage_url = await fetchFileByURL(image_url);
    const responseFullImage_url = await fetchImages(responseImage_url.result.data);
    if (responseFullImage_url && responseFullImage_url?.length > 0) {
      setValue("image_url", responseFullImage_url);
    }

    console.log("preData", preData);
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
        title={data ? "แก้ไขโลโก้" : "เพิ่มโลโก้"}
        content={
          dialogType === "edit" && isLoadingData ? (
            <BoxLoadingData minHeight="666px" />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
               className="w-full text-xl sm:h-[calc(100vh-216px)] h-[calc(100vh-126px)] overflow-y-auto flex flex-col justify-between"
            >
              <div className=" flex flex-col w-full pl-1 pr-1 ">
                <div className=" flex gap-6 flex-col ">
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
                      อัปโหลดรูปภาพ โลโก้
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
                          marginTop: "-10px",
                        }}
                        className=" lg:max-w-[976px] max-w-[464px]"
                      >
                        {watch("image_url")?.length < LIMITFILE && (
                          <Box
                            style={{
                              width:
                                watch("image_url")?.length > 0
                                  ? "168px"
                                  : "100%",
                              minWidth:
                                watch("image_url")?.length > 0
                                  ? "168px"
                                  : "auto",
                              marginTop: "10px",
                            }}
                          >
                            <UploadField
                              id="image_url_id"
                              isError={errors.image_url?.message !== undefined}
                              acceptDescription={".JPEG, .JPG, .PNG"}
                              files={watch("image_url")}
                              onLoading={(loading) =>
                                setIsLoadingUploadFile(loading)
                              }
                              onCheckFileUpload={(f) => {
                                setActiveUploadFileID("image_url_id");
                                onCheckFileUpload(f, watch("image_url")).then(
                                  (file) => {
                                    setValue("image_url", file);
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
                        {watch("image_url") &&
                          watch("image_url")?.length > 0 && (
                            <ListFileCardDragField
                              files={watch("image_url")}
                              setFiles={(f) => setValue("image_url", f)}
                              onClickDelete={(f) => handleDeleteFile(f)}
                              type="logo"
                            />
                          )}
                      </Box>
                    )}
                    {errors.image_url?.message && (
                      <div className="text-require">
                        {errors.image_url?.message}
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

export default DialogAddLogo;
