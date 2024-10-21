import { TextField } from "@radix-ui/themes";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFormProps {
  placeholder: string;
  register: UseFormRegisterReturn;
  msgError?: string;
  type?:
    | "number"
    | "search"
    | "time"
    | "text"
    | "hidden"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "password"
    | "tel"
    | "url"
    | "week"
    | undefined;
}

const InputForm = (props: InputFormProps) => {
  const { register, placeholder, type, msgError } = props;
  return (
    <>
      <TextField.Root
        {...register}
        type={type ?? "text"}
        autoComplete="off"
        variant="soft"
        placeholder={placeholder}
        className="[&>*]:!text-white  [&>*]:!border-[1px] [&>*]:!border-solid [&>*]:!outline-main [&>*]:!placeholder-white"
      />
      {msgError && <div className="text-require">{msgError}</div>}
    </>
  );
};

export default InputForm;
