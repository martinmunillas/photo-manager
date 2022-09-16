import { Flex, Input } from "@quaantum/components";
import { MyDate } from "main/date";
import React, { ChangeEvent, useEffect, useState } from "react";

interface DateFieldProps {
  value: MyDate;
  onChange: (date: MyDate) => void;
}

const DateField: React.FC<DateFieldProps> = ({ value, onChange }) => {
  const [date, setDate] = useState<MyDate>(value);

  useEffect(() => {
    onChange(date);
  }, [date]);

  const handleChange =
    (what: keyof MyDate) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      setDate({ ...date, [what]: value });
    };

  const props = (what: keyof MyDate, chars = 2) => ({
    value: date[what],
    onChange: handleChange(what),

    width: `calc(${chars}ch + (2 * 12px))`,
    px: "12px",
    py: "8px",
  });

  return (
    <Flex gap="8px">
      <Input {...props("day")} />
      <Input {...props("month")} />
      <Input {...props("year", 4)} />
    </Flex>
  );
};

export default DateField;
