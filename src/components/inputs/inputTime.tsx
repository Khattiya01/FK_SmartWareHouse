type InputFormManageProps = {
  placeholder: string;
  name: string;
  msgError?: string;
  disabled?: boolean;
  required?: boolean;
  showLabel?: boolean;
  max?: string;
  handleChange: (value: string) => void;
  value: string;
};

const InputFormManage = ({
  placeholder,
  name,
  msgError,
  disabled,
  required,
  showLabel = true,
  max,
  handleChange,
  value,
}: InputFormManageProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // ใช้ Regular Expression เพื่อตรวจสอบค่า
    const numericValue = value.replace(/[^0-9]/g, "");

    // แปลงเป็นตัวเลขและตรวจสอบเงื่อนไข
    const numericHours = parseInt(numericValue, 10);

    if (!isNaN(numericHours)) {
      if (numericHours < 0) {
        event.target.value = "0"; // ตั้งค่าเป็น 0 ถ้าน้อยกว่า 0
      } else if (numericHours > (max ? parseInt(max) : 23)) {
        event.target.value = max ? max : "23"; // ตั้งค่าเป็น 23 ถ้ามากกว่า 23
      } else {
        event.target.value = numericHours.toString(); // ใช้ค่าเดิมถ้าอยู่ในช่วง
      }
    } else {
      event.target.value = ""; // ถ้าไม่ใช่ตัวเลขให้เป็นค่าว่าง
    }
  };

  return (
    <div className=" w-full">
      {showLabel && (
        <label
          className=" flex gap-1 "
          htmlFor={name}
          style={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "28px",
          }}
        >
          {name} {required && <div className=" text-red-500">*</div>}
        </label>
      )}
      <div className=" w-full flex  items-center relative mt-1">
        <input
          disabled={disabled}
          type={"number"}
          id={name}
          min="0"
          max={max ?? "23"}
          value={value}
          placeholder={placeholder}
          onInput={handleInputChange}
          onChange={(e) => handleChange(e.target.value)}
          className={`border rounded-lg text-black  p-4 w-full h-[44px] focus:border-gray focus:outline-none `}
        />
      </div>
      {msgError && <div className="text-require">{msgError}</div>}
    </div>
  );
};

export default InputFormManage;
