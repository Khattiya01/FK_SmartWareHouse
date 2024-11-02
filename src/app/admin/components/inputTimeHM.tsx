import InputTime from "@/components/inputs/inputTime";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";

type InputTimeHMProps = {
  name: string;
  handleChangeHour(value: string): void;
  handleChangeMinute(value: string): void;
  valueHour: string;
  valueMinute: string;
};
const InputTimeHM = ({
  name,
  handleChangeHour,
  handleChangeMinute,
  valueHour,
  valueMinute,
}: InputTimeHMProps) => {
  return (
    <Box>
      <label
        className=" flex gap-1 "
        htmlFor={name}
        style={{
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "28px",
        }}
      >
        {name}
        <div className=" text-red-500">*</div>
      </label>
      <Flex width={"300px"} align={"end"}>
        <InputTime
          name={"ชั่วโมง"}
          placeholder="0"
          max="23"
          handleChange={handleChangeHour}
          value={valueHour}
          showLabel={false}
        />
        <div className=" mx-4">ชั่วโมง</div>
        <InputTime
          name={"นาที"}
          placeholder="0"
          max="60"
          handleChange={handleChangeMinute}
          value={valueMinute}
          showLabel={false}
        />
        <div className=" mx-4">นาที</div>
      </Flex>
    </Box>
  );
};

export default InputTimeHM;
