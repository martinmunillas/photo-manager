import {
  Grid,
  Button,
  Img,
  Input,
  Box,
  Flex,
  Heading,
} from "@quaantum/components";
import React, { ReactNode, useState } from "react";
import {
  IoIosAlbums,
  IoIosCloseCircleOutline,
  IoMdCreate,
  IoMdHeart,
  IoMdHeartEmpty,
  IoMdPersonAdd,
  IoMdPlay,
} from "react-icons/io";
import { useDebounce } from "renderer/hooks/useDebounce";
import { useMedia } from "renderer/hooks/usePhotos";
import { Query } from "types";
import AddPeopleForm from "./AddPeopleForm";
import AddToAlbumForm from "./AddToAlbumForm";
import IconButton from "./IconButton";
import MediaViewer from "./MediaViewer";
import PhotoForm from "./PhotoForm";
import Sidebar from "./Sidebar";

interface GalleryProps {
  defaultQuery?: Query;
}

const Gallery: React.FC<GalleryProps> = ({ defaultQuery }) => {
  const [search, setSearch] = useState("");
  const [viewerIdx, setViewerIdx] = useState<number>();
  const query = useDebounce(search, 100);
  const { media, reload, loading } = useMedia({
    ...defaultQuery,
    search: query,
    people: [...(defaultQuery?.people || [])],
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
    setSidebar(
      <AddToAlbumForm
        photos={selected}
        onAdd={() => {
          close();
          reload();
        }}
      />
    );
  };

  const handleAddPeople = () => {
    setSidebar(
      <AddPeopleForm
        photos={selected}
        onAdd={() => {
          close();
          reload();
        }}
      />
    );
  };

  const handleToggleFavorite = (path: string) => {
    window.electron.ipcRenderer.sendMessage("toggleFavorite", path);
    reload();
  };

  return (
    <Box
      width={!!sidebar ? "calc(100% - 400px)" : "100%"}
      transition="200ms all ease-in-out"
    >
      <Sidebar isOpen={!!sidebar} onClose={close}>
        {sidebar}
      </Sidebar>
      <Input
        my="16px"
        mx="9px"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <Grid placeItems="center">
          <Heading c="white">Loading...</Heading>
        </Grid>
      ) : (
        selected.length > 0 && (
          <Flex my="12px" gap="12px">
            <IconButton onClick={clearSelected} icon={IoIosCloseCircleOutline}>
              Clear {selected.length} selected
            </IconButton>

            <IconButton onClick={handleAddToAlbum} icon={IoIosAlbums}>
              Add {selected.length} to album
            </IconButton>

            <IconButton onClick={handleAddPeople} icon={IoMdPersonAdd}>
              Add {selected.length} to person
            </IconButton>
          </Flex>
        )
      )}
      <Grid
        gap="16px"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gridAutoRows="200px"
        placeItems="stretch"
      >
        {media.length ? (
          media.map((m, i) => (
            <Box
              key={m.path}
              position="relative"
              customCss="&:hover > input[type=checkbox], &:hover > button.favorite { display: block; }"
              h="100%"
              w="100%"
            >
              <Button
                position="absolute"
                display="none"
                top="16px"
                right="68px"
                width="24px"
                height="24px"
                p="0"
                bg="transparent"
                className="favorite"
                m="3px 8px"
                onClick={() =>
                  setSidebar(<PhotoForm photo={m} onSave={close} />)
                }
              >
                <IoMdCreate size="100%" />
              </Button>
              <Button
                position="absolute"
                display="none"
                top="16px"
                right="40px"
                width="24px"
                height="24px"
                p="0"
                bg="transparent"
                className="favorite"
                m="3px 8px"
                onClick={() => handleToggleFavorite(m.path)}
              >
                {m.favorite ? (
                  <IoMdHeart size="100%" />
                ) : (
                  <IoMdHeartEmpty size="100%" />
                )}
              </Button>
              <Input
                type="checkbox"
                position="absolute"
                width="24px"
                height="24px"
                top="16px"
                right="16px"
                checked={selected.includes(m.path)}
                display={selected.length ? "block" : "none"}
                cursor="pointer"
                onChange={() => {
                  handleSelect(m.path);
                }}
              />
              <Button
                onClick={() => {
                  if (selected.length) {
                    handleSelect(m.path);
                  } else {
                    setViewerIdx(i);
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
                {m.type === "image" ? (
                  <Img
                    width="100%"
                    maxH="100%"
                    objectFit="contain"
                    alt={m.name}
                    src={m.src}
                  />
                ) : (
                  <Flex
                    justify="center"
                    align="center"
                    position="relative"
                    width="100%"
                    h="100%"
                  >
                    <Box
                      as="video"
                      width="100%"
                      maxH="100%"
                      objectFit="contain"
                      // @ts-ignore
                      src={m.src}
                    />
                    <IoMdPlay
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      size="24px"
                    />
                  </Flex>
                )}
              </Button>
            </Box>
          ))
        ) : (
          <Grid placeItems="center">
            <Heading c="white">No Photos</Heading>
          </Grid>
        )}
      </Grid>
      {viewerIdx !== undefined && (
        <MediaViewer
          media={media[viewerIdx]}
          onPrev={() => {
            if (viewerIdx > 0) {
              setViewerIdx(viewerIdx - 1);
            }
          }}
          onNext={() => {
            if (viewerIdx < media.length - 1) {
              setViewerIdx(viewerIdx + 1);
            }
          }}
          onClose={() => setViewerIdx(undefined)}
        />
      )}
    </Box>
  );
};

export default Gallery;
