import { Box, Button, Flex, Heading } from "@quaantum/components";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IoIosAlbums, IoMdPerson } from "react-icons/io";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  sidebar: ReactNode;
  onCloseSidebar: VoidFunction;
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
          <Button
            as={Link}
            // @ts-ignore
            to="/people"
            height="fit-content"
            d="flex"
            alignItems="center"
            gap="8px"
          >
            People <IoMdPerson />
          </Button>

          <Button
            as={Link}
            // @ts-ignore
            to="/albums"
            height="fit-content"
            d="flex"
            alignItems="center"
            gap="8px"
          >
            Albums <IoIosAlbums />
          </Button>
        </Flex>
        {children}
      </Box>
    </>
  );
};

export default Layout;
