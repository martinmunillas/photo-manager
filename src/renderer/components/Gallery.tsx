import {
  Grid,
  Button,
  Img,
  GridProps,
  Input,
  Box,
  Flex,
} from "@quaantum/components";
import React, { ReactNode, useState } from "react";
import {
  IoIosAlbums,
  IoIosCloseCircleOutline,
  IoMdPersonAdd,
} from "react-icons/io";
import { useParams } from "react-router-dom";
import { useDebounce } from "renderer/hooks/useDebounce";
import { usePhotos } from "renderer/hooks/usePhotos";
import AddToAlbumForm from "./AddToAlbumForm";
import IconButton from "./IconButton";
import PhotoForm from "./PhotoForm";
import Sidebar from "./Sidebar";

interface GalleryProps extends Omit<GridProps, "onClick"> {}

const Gallery: React.FC<GalleryProps> = ({ ...props }) => {
  const { albumId } = useParams();
  const [search, setSearch] = useState("");
  const query = useDebounce(search, 100);
  const photos = usePhotos({
    search: query,
    albumId: albumId ? Number(albumId) : undefined,
  });
  const [sidebar, setSidebar] = useState<ReactNode>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const clearSelected = () => setSelected([]);
  const close = () => setSidebar(null);

  const handleSelect = (path: string) => {
    if (selected.includes(path)) {
      setSelected(selected.filter((p) => p !== path));
    } else {
      setSelected([...selected, path]);
    }
  };

  const handleAddToAlbum = () => {
    setSidebar(<AddToAlbumForm photos={selected} />);
  };

  return (
    <Box>
      <Sidebar isOpen={!!sidebar} onClose={close}>
        {sidebar}
      </Sidebar>
      <Input
        my="16px"
        mx="9px"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {selected.length > 0 && (
        <Flex my="12px" gap="12px">
          <IconButton onClick={clearSelected} icon={IoIosCloseCircleOutline}>
            Clear {selected.length} selected
          </IconButton>

          <IconButton onClick={handleAddToAlbum} icon={IoIosAlbums}>
            Add {selected.length} to album
          </IconButton>

          <IconButton
            onClick={() => {
              clearSelected();
            }}
            icon={IoMdPersonAdd}
          >
            Add {selected.length} to person
          </IconButton>
        </Flex>
      )}
      <Grid
        gap="16px"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gridAutoRows="200px"
        placeItems="stretch"
        {...props}
      >
        {photos.map((photo) => (
          <Box
            key={photo.path}
            position="relative"
            customCss="&:hover > input[type=checkbox] { display: block; }"
            h="100%"
            w="100%"
          >
            <Input
              type="checkbox"
              position="absolute"
              width="24px"
              height="24px"
              top="16px"
              right="16px"
              checked={selected.includes(photo.path)}
              display={selected.length ? "block" : "none"}
              cursor="pointer"
              onChange={() => {
                handleSelect(photo.path);
              }}
            />
            <Button
              onClick={() => {
                if (!selected.length) {
                  setSidebar(<PhotoForm photo={photo} onSave={close} />);
                } else {
                  handleSelect(photo.path);
                }
              }}
              bg="none"
              p="8px"
              border="1px solid transparent"
              r="8px"
              _hover={{
                borderColor: "white.light",
              }}
              h="100%"
              w="100%"
            >
              {photo.data ? (
                <Img
                  width="100%"
                  maxH="100%"
                  objectFit="contain"
                  alt="icon"
                  src={photo.data}
                />
              ) : (
                "Image broken"
              )}
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
