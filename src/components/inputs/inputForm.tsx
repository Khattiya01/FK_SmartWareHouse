import { TextField } from "@radix-ui/themes";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFormProps {
  placeholder: string;
  register: UseFormRegisterReturn; 
}

const InputForm = (props: InputFormProps) => {
  const { register, placeholder } = props;
  return (
    <TextField.Root
      {...register}
      variant="soft"
      placeholder={placeholder}
      className="[&>*]:!text-white  [&>*]:!border-[1px] [&>*]:!border-solid [&>*]:!outline-main [&>*]:!placeholder-white"
    />
  );
};

export default InputForm;
