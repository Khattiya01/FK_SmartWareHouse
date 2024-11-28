import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormManage from "@/components/inputs/inputFormManage";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { Text } from "@radix-ui/themes";
import ButtonOutline from "@/components/buttons/buttonOutline";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { DialogComponent } from "@/components/alertDialogs/dialog.component";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import {
  InsertTypeProduct,
  insertTypeProductSchema,
  SelectTypeProduct,
} from "@/db/schemas";
import {
  createTypeProductAction,
  updateTypeProductAction,
} from "@/actions/typeProduct";

type DialogAddTypeProductProps = {
  dialogType?: "create" | "edit";
  data: SelectTypeProduct | undefined;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
};
const DialogAddTypeProduct = ({
  onSuccess,
  onCancel,
  isOpen,
  data,
  dialogType = "create",
}: DialogAddTypeProductProps) => {
  // hooks
  const showToast = useToastStore((state) => state.show);

  // state
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // function

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<InsertTypeProduct>({
    resolver: zodResolver(insertTypeProductSchema),
  });

  const onSubmitHandler = async (payload: InsertTypeProduct) => {
    const fd = new FormData();
    fd.append("name", payload.name);

    setIsLoadingSubmit(true);
    if (dialogType === "edit" && data?.id) {
      await updateTypeProductAction({ formData: fd, id: data.id })
        .then(async (res) => {
          setIsLoadingSubmit(false);
          clearData();
          if (res?.success) {
            onSuccess();
            showToast(
              "แก้ไขชนิดผลิตภัณสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            onCancel();
            showToast(
              "แก้ไขหมวดไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error create type product:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "แก้ไขชนิดผลิตภัณไม่สำเร็จ",
            "",
            new Date(),
            typeStatusTaost.error
          );
        });
    }

    if (dialogType === "create") {
      await createTypeProductAction(fd)
        .then((res) => {
          setIsLoadingSubmit(false);
          clearData();

          if (res?.success) {
            onSuccess();
            showToast(
              "เพิ่มชนิดผลิตภัณสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
          } else {
            onCancel();
            showToast(
              "เพิ่มชนิดผลิตภัณไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
          }
        })
        .catch((err) => {
          console.error("Error create type product:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "เพิ่มชนิดผลิตภัณไม่สำเร็จ",
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

  const fetchFileData = async (data: SelectTypeProduct) => {
    setIsLoadingData(true);
    setValue("name", data.name);
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
        title={data ? "แก้ไขชนิดผลิตภัณ" : "เพิ่มชนิดผลิตภัณ"}
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
                  <InputFormManage
                    name={"ชื่อชนิดผลิตภัณ"}
                    placeholder="ชื่อชนิดผลิตภัณ"
                    register={{ ...register("name") }}
                    msgError={errors.name?.message}
                    showLabel
                    required
                  />
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
    </>
  );
};

export default DialogAddTypeProduct;
