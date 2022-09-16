import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  TextArea,
  useOnClickOutside,
} from "@quaantum/components";
import React, { useEffect, useRef, useState } from "react";
import { Photo } from "types";
import DateField from "./DateField";
import FormControl from "./FormControl";
import TagsManager from "./TagsManager";

interface SidebarProps {
  photo: Photo | null;
  onClose: VoidFunction;
}

const Sidebar: React.FC<SidebarProps> = ({ photo: p, onClose }) => {
  const [photo, setPhoto] = useState(p);

  useEffect(() => {
    setPhoto(p);
  }, [p]);

  const update = () => {
    window.electron.ipcRenderer.sendMessage("updatePhoto", photo);
  };

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose);

  return (
    <Box
      ref={ref}
      position="fixed"
      top="0"
      right="0"
      height="100vh"
      width={p ? "40vw" : "0"}
      transition="all 200ms ease"
      bgColor="black.main"
      color="white"
      p={p ? "16px" : 0}
      overflowY="scroll"
    >
      <Flex direction="column" gap="16px">
        <Flex justify="end">
          <Button minW="32px" minH="32px" onClick={onClose}>
            X
          </Button>
        </Flex>
        {photo && (
          <>
            <Flex w="100%" height="300px" justify="center">
              {photo.data && (
                <Img
                  src={photo.data}
                  alt=""
                  objectFit="contain"
                  d="block"
                  maxW="100%"
                  maxH="100%"
                />
              )}
            </Flex>
            <FormControl label="Path">
              <Input value={photo.path} readOnly />
            </FormControl>
            <FormControl label="Date (dd/mm/yyyy)">
              <DateField
                value={photo.date}
                onChange={(d) => setPhoto({ ...photo, date: d })}
              />
            </FormControl>
            <FormControl label="Description">
              <TextArea
                value={photo.description}
                onChange={(e) =>
                  setPhoto({ ...photo, description: e.target.value })
                }
              />
            </FormControl>
            <FormControl label="Tags">
              <TagsManager
                tags={photo.tags}
                onChange={(t) => setPhoto({ ...photo, tags: t })}
              />
            </FormControl>
            <Button bgColor="primary" color="white" onClick={update}>
              Save
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
