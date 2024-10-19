import { TextArea } from "@radix-ui/themes";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaFormProps {
  placeholder: string;
  register: UseFormRegisterReturn; // Proper typing for register
}

const TextAreaForm = (props: TextAreaFormProps) => {
  const { register, placeholder } = props;
  return (
    <TextArea
      {...register}
      variant="soft"
      placeholder={placeholder}
      className="[&>*]:!text-white [&>*]:!border-[1px] [&>*]:!border-solid [&>*]:!outline-main [&>*]:!placeholder-white"
    />
  );
};

export default TextAreaForm;
