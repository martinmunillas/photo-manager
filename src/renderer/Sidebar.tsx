import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  Text,
  TextArea,
  useOnClickOutside,
} from "@quaantum/components";
import React, { useRef } from "react";
import { Photo } from "types";

interface SidebarProps {
  photo: Photo;
  onClose: VoidFunction;
}

const Sidebar: React.FC<SidebarProps> = ({ photo, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose);
  return (
    <Box
      ref={ref}
      position="absolute"
      top="0"
      right="0"
      height="100vh"
      minW={200}
      maxW="40vw"
      bgColor="black.main"
      color="white"
      p="16px"
    >
      <Flex direction="column" gap="16px">
        <Flex justify="end">
          <Button minW="32px" minH="32px" onClick={onClose}>
            X
          </Button>
        </Flex>
        <Box w="100%">
          {photo.data && <Img src={photo.data} alt="" d="block" maxW="100%" />}
        </Box>
        <Box>
          <Text m="0">Path </Text>
          <Input value={photo.path} readOnly />
        </Box>
        <Box>
          <Text m="0">Date (dd/mm/yyyy) </Text>
          <Input value={photo.date} />
        </Box>
        <Box>
          <Text m="0">Description </Text>
          <TextArea value={photo.description} />
        </Box>
        <Box>
          <Text m="0">Tags </Text>
          <Input value={photo.tags} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
