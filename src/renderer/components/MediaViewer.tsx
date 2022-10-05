import { Box, Button, Img } from "@quaantum/components";
import React from "react";
import {
  IoMdArrowDropleft,
  IoMdArrowDropright,
  IoMdClose,
} from "react-icons/io";
import { Media } from "types";
import VideoPlayer from "./VideoPlayer";

interface MediaViewerProps {
  media: Media;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  media,
  onNext,
  onPrev,
  onClose,
}) => {
  return (
    <Box
      position="fixed"
      w="100vw"
      h="100vh"
      top="0"
      left="0"
      zIndex={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="#000"
    >
      <Button
        position="absolute"
        top="0"
        left="0"
        padding="24px"
        onClick={onClose}
        bg="none"
        zIndex={10}
      >
        <IoMdClose size="50px" />
      </Button>
      <Button
        position="absolute"
        top="calc(50px + (24px * 2))"
        left="0"
        pb="calc(50px + (24px * 2))"
        h="calc(100vh - (50px + (24px * 2)))"
        px="24px"
        onClick={onPrev}
        bg="none"
        zIndex={10}
      >
        <IoMdArrowDropleft size="100px" />
      </Button>
      <Button
        position="absolute"
        top="calc(50px + (24px * 2))"
        right="0"
        pb="calc(50px + (24px * 2))"
        h="calc(100vh - (50px + (24px * 2)))"
        px="24px"
        onClick={onNext}
        bg="none"
        zIndex={10}
      >
        <IoMdArrowDropright size="100px" />
      </Button>

      {media.type === "image" ? (
        <Img
          src={media.src}
          alt={media.name}
          display="block"
          maxW="100%"
          maxH="100%"
          objectFit="cover"
        />
      ) : (
        (() => <VideoPlayer src={media.src} />)()
      )}
    </Box>
  );
};

export default MediaViewer;
