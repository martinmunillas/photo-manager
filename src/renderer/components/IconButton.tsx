import { Button, ButtonProps } from "@quaantum/components";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";

interface IconButtonProps extends ButtonProps {
  icon: IconType;
  children: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  children,
  ...props
}) => {
  return (
    <Button
      height="fit-content"
      d="flex"
      alignItems="center"
      gap="8px"
      justifyContent="center"
      {...props}
    >
      {children} <Icon />
    </Button>
  );
};

export default IconButton;
