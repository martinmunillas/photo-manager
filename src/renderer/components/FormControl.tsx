import { Box, Text } from "@quaantum/components";
import React from "react";

interface FormControlProps {
  label: string;
  children: React.ReactNode;
}

const FormControl: React.FC<FormControlProps> = ({ label, children }) => {
  return (
    <Box>
      <Text m="0" mb="8px">
        {label}
      </Text>
      {children}
    </Box>
  );
};

export default FormControl;
