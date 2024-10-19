import { HTMLInputTypeAttribute } from "react";

type InputFormManageProps = {
  register: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  placeholder: string;
  name: string;
  msgError?: string;
  type?: HTMLInputTypeAttribute | undefined;
  disabled?: boolean;
  required?: boolean;
  showLabel?: boolean;
};

const InputFormManage = ({
  register,
  placeholder,
  name,
  msgError,
  type = "text",
  disabled,
  required,
  showLabel = true,
}: InputFormManageProps) => {
  return (
    <div className=" w-full">
      {showLabel && (
        <label
          className=" flex gap-1 "
          htmlFor={name}
          style={{
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "28px",
          }}
        >
          {name} {required && <div className=" text-red-500">*</div>}
        </label>
      )}
      <div className=" w-full flex  items-center relative mt-1">
        <input
          disabled={disabled}
          type={"text"}
          id={name}
          {...register}
          maxLength={type === "to" || type === "tel" ? 10 : undefined}
          placeholder={placeholder}
          className={`no-spinners border rounded-lg text-black  p-4 w-full h-[44px] focus:border-gray focus:outline-none `}
        />
      </div>
      {msgError && <div className="text-require">{msgError}</div>}
    </div>
  );
};

export default InputFormManage;
