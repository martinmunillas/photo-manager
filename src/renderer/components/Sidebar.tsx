import { Box, Button, Flex, useOnClickOutside } from "@quaantum/components";
import React, { ReactNode, useRef } from "react";

interface SidebarProps {
  children: ReactNode;
  onClose: VoidFunction;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ children, onClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose);

  return (
    <Box
      ref={ref}
      position="fixed"
      top="0"
      right="0"
      height="100vh"
      width={isOpen ? "40vw" : "0"}
      transition="all 200ms ease"
      bgColor="black.main"
      color="white"
      p={isOpen ? "16px" : 0}
      overflowY="scroll"
    >
      <Flex direction="column" gap="16px">
        <Flex justify="end">
          <Button minW="32px" minH="32px" onClick={onClose}>
            X
          </Button>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default Sidebar;
