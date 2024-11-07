import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonDefault from "@/components/buttons/buttonDefault";
import {
  InsertprivacyAndPolicy,
  insertPrivacyAndPolicySchema,
  SelectprivacyAndPolicy,
  updatePrivacyAndPolicySchema,
} from "@/db/schemas";
import { Text } from "@radix-ui/themes";
import ButtonOutline from "@/components/buttons/buttonOutline";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import { DialogComponent } from "@/components/alertDialogs/dialog.component";
import { BoxLoadingData } from "@/components/boxLoading/BoxLoadingData";
import {
  createPrivacyAndPolicyAction,
  updatePrivacyAndPolicyAction,
} from "@/actions/privacyAndPolicy";
import InputTextareaFormManage from "@/components/inputs/inputTextareaFormManage ";

type DialogAddPrivacyAndPolicyProps = {
  dialogType?: "create" | "edit";
  data: SelectprivacyAndPolicy | undefined;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
};
const DialogAddPrivacyAndPolicy = ({
  onSuccess,
  onCancel,
  isOpen,
  data,
  dialogType = "create",
}: DialogAddPrivacyAndPolicyProps) => {
  // hooks
  const showToast = useToastStore((state) => state.show);

  // state
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // function

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    register,
  } = useForm<InsertprivacyAndPolicy>({
    resolver: zodResolver(
      data ? updatePrivacyAndPolicySchema : insertPrivacyAndPolicySchema
    ),
  });

  const onSubmitHandler = async (payload: InsertprivacyAndPolicy) => {
    const fd = new FormData();
    fd.append("privacy_policy", payload.privacy_policy);

    setIsLoadingSubmit(true);
    if (dialogType === "edit" && data?.id) {
      await updatePrivacyAndPolicyAction({ formData: fd, id: data.id })
        .then((res) => {
          if (res?.success) {
            setIsLoadingSubmit(false);
            onSuccess();
            showToast(
              "แก้ไขนโยบายและความเป็นส่วนตัวสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
            clearData();
          } else {
            setIsLoadingSubmit(false);
            onCancel();
            showToast(
              "แก้ไขนโยบายและความเป็นส่วนตัวไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
            clearData();
          }
        })
        .catch((err) => {
          console.error("Error create logo:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "แก้ไขนโยบายและความเป็นส่วนตัวไม่สำเร็จ",
            "",
            new Date(),
            typeStatusTaost.error
          );
        });
    }

    if (dialogType === "create") {
      await createPrivacyAndPolicyAction(fd)
        .then((res) => {
          if (res?.success) {
            setIsLoadingSubmit(false);
            onSuccess();
            showToast(
              "เพิ่มนโยบายและความเป็นส่วนตัวสำเร็จ",
              "",
              new Date(),
              typeStatusTaost.success
            );
            clearData();
          } else {
            setIsLoadingSubmit(false);
            onCancel();
            showToast(
              "เพิ่มนโยบายและความเป็นส่วนตัวไม่สำเร็จ",
              "",
              new Date(),
              typeStatusTaost.error
            );
            clearData();
          }
        })
        .catch((err) => {
          console.error("Error create logo:", err?.message);
          setIsLoadingSubmit(false);
          showToast(
            "เพิ่มนโยบายและความเป็นส่วนตัวไม่สำเร็จ",
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

  const fetchFileData = async (data: SelectprivacyAndPolicy) => {
    setIsLoadingData(true);
    const preData = {
      id: data.id,
      privacy_policy: data.privacy_policy,
    };


    setValue("privacy_policy", preData.privacy_policy);
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
        title={
          data
            ? "แก้ไขนโยบายและความเป็นส่วนตัว"
            : "เพิ่มนโยบายและความเป็นส่วนตัว"
        }
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
                  <InputTextareaFormManage
                    name={"ชื่อนโยบายและความเป็นส่วนตัว"}
                    placeholder="ชื่อนโยบายและความเป็นส่วนตัว"
                    register={{ ...register("privacy_policy") }}
                    rows={10}
                    msgError={errors.privacy_policy?.message}
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

export default DialogAddPrivacyAndPolicy;
