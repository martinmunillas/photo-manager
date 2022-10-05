import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Input, Text } from "@quaantum/components";
import {
  IoMdPause,
  IoMdPlay,
  IoMdVolumeHigh,
  IoMdVolumeLow,
  IoMdVolumeOff,
} from "react-icons/io";

`.videoPlayer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }
  
  .videoPlayer_goBack {
    position: absolute;
    top: 10px;
    left: 20px;
    cursor: pointer;
    font-size: 18px;
  }
  
  .videoPlayer_name {
    margin: 50px;
  }
  
  .videoPlayer_player {
    width: 100% !important;
    height: 100% !important;
    position: fixed;
    top: 0;
    z-index: -1;
  }
  
  .watching {
    cursor: none;
  }`;

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const [info, setInfo] = useState<{
    duration: number;
    played: number;
    isPlaying: boolean;
    volume: number;
  }>({
    duration: 0,
    played: 0,
    isPlaying: false,
    volume: 1,
  });
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video.current) {
      video.current.onloadedmetadata = () => {
        setInfo((info) => ({
          ...info,
          duration: video.current?.duration || 0,
        }));
      };
      video.current.ontimeupdate = () => {
        setInfo((info) => ({
          ...info,
          played: video.current?.currentTime || 0,
        }));
      };
      video.current.onended = () => {
        setInfo((info) => ({
          ...info,
          isPlaying: false,
        }));
      };
    }

    return () => {
      if (video.current) {
        video.current.onloadedmetadata = null;
        video.current.ontimeupdate = null;
        video.current.onended = null;
      }
    };
  }, [video]);

  useEffect(() => {
    if (video.current) {
      video.current.play();
      setInfo((info) => ({
        ...info,
        isPlaying: true,
      }));
    }
  }, [src, video]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (video.current) {
      video.current.currentTime = parseFloat(e.target.value) * info.duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (video.current) {
      video.current.volume = parseFloat(e.target.value);
    }
    setInfo((info) => ({
      ...info,
      volume: parseFloat(e.target.value),
    }));
  };

  const handleTogglePlay = () => {
    setInfo((info) => ({
      ...info,
      isPlaying: !info.isPlaying,
    }));
    if (video.current) {
      if (video.current.paused) {
        video.current.play();
      } else {
        video.current.pause();
      }
    }
  };

  const handleToggleMute = () => {
    if (video.current) {
      if (video.current.muted) {
        video.current.muted = false;
      } else {
        video.current.muted = true;
      }
    }
    setInfo((info) => ({
      ...info,
      volume: video.current?.muted ? 0 : 1,
    }));
  };

  const getTime = (time: number) => {
    if (time > 3600) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time - hours * 3600) / 60);
      const seconds = Math.floor(time - minutes * 60 - hours * 3600);

      return `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`;
    } else {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time - minutes * 60);
      return `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    }
  };

  return (
    <Box>
      <Box
        as="video"
        ref={video}
        // @ts-ignore
        src={src}
        width="100vw"
        height="100vh"
        onClick={handleTogglePlay}
      />
      <Flex
        position="absolute"
        zIndex={10}
        bottom="0"
        left="0"
        alignSelf="flex-end"
        width="calc(100% - 20px)"
        margin="10px"
        r="8px"
        backgroundColor="#33333377"
        justify="space-between"
        align="center"
        padding="8px"
        gap="16px"
      >
        <Button bg="none" onClick={handleTogglePlay}>
          {info.isPlaying ? (
            <IoMdPause display="block" size="24px" />
          ) : (
            <IoMdPlay display="block" size="24px" />
          )}
        </Button>
        <Text color="white" whiteSpace="nowrap">
          {getTime(info.played)} / {getTime(info.duration)}
        </Text>
        <Input
          type="range"
          name="seek"
          min="0"
          max="1"
          step="any"
          padding={0}
          margin={0}
          border={0}
          value={info.played / info.duration}
          onChange={handleSeek}
        />
        <Flex
          justify="center"
          position="relative"
          csx={{
            "&:hover .volume": {
              display: "block",
            },
          }}
          zIndex={100}
        >
          <Button onClick={handleToggleMute} bg="none">
            {info.volume > 0.5 ? (
              <IoMdVolumeHigh display="block" size="24px" />
            ) : info.volume > 0 ? (
              <IoMdVolumeLow display="block" size="24px" />
            ) : (
              <IoMdVolumeOff display="block" size="24px" />
            )}
          </Button>
          <Input
            type="range"
            value={info.volume}
            className="volume"
            onChange={handleVolumeChange}
            _hover={{
              display: "block",
            }}
            min="0"
            max="1"
            step="any"
            backgroundColor="grey"
            display="none"
            width="20px"
            bottom="100%"
            height="100px"
            padding="0"
            customCss={`
          -webkit-appearance: slider-vertical;
          `}
            position="absolute"
            px="16px"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default VideoPlayer;
