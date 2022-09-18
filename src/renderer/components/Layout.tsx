import { Box, Flex, Heading } from "@quaantum/components";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IoIosAlbums, IoMdPerson } from "react-icons/io";
import IconButton from "./IconButton";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  sidebar: ReactNode;
  onCloseSidebar?: VoidFunction;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  sidebar,
  onCloseSidebar,
}) => {
  return (
    <>
      <Sidebar isOpen={!!sidebar} onClose={onCloseSidebar}>
        {sidebar}
      </Sidebar>
      <Box
        padding="32px"
        width={!!sidebar ? "60vw" : "100vw"}
        transition="width 200ms ease"
      >
        <Flex align="center" gap="16px">
          <Heading
            as={Link}
            // @ts-ignore
            to="/"
          >
            Muni Photo Manager
          </Heading>
          <IconButton
            as={Link}
            // @ts-ignore
            to="/people"
            icon={IoMdPerson}
          >
            People
          </IconButton>

          <IconButton
            as={Link}
            // @ts-ignore
            to="/albums"
            icon={IoIosAlbums}
          >
            Albums
          </IconButton>
        </Flex>
        {children}
      </Box>
    </>
  );
};

export default Layout;
