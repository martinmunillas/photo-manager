import { Box, Button, Flex, Grid, Text } from "@quaantum/components";
import React, { useState } from "react";
import { IoMdCreate, IoMdGrid } from "react-icons/io";
import DefaultProfile from "renderer/components/DefaultProfile";
import Layout from "renderer/components/Layout";
import AlbumForm from "renderer/components/AlbumForm";
import { useAlbums } from "renderer/hooks/useAlbums";
import { Album } from "types";

interface AlbumsProps {}

const baseAlbum: Omit<Album, "id"> = {
  name: "",
  description: "",
};

const Albums: React.FC<AlbumsProps> = ({}) => {
  const { loading, albums } = useAlbums();
  const [album, setAlbum] = useState<Partial<Album>>();
  if (loading) return <Text c="white">Loading...</Text>;

  const clear = () => setAlbum(undefined);

  return (
    <Layout
      sidebar={album && <AlbumForm album={album} onSave={clear} />}
      onCloseSidebar={clear}
    >
      <Button onClick={() => setAlbum(baseAlbum)}>Create</Button>
      <Grid
        templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gap="16px"
        placeItems="center"
        my="40px"
      >
        {albums.map((p) => (
          <Flex
            key={p.id}
            direction="column"
            c="white"
            align="center"
            gap="8px"
            position="relative"
            p="8px"
            border="1px solid"
            borderColor={p.id === album?.id ? "white.dark" : "transparent"}
            r="8px"
            customCss={`
            &:hover .hoverControls {
              display: flex;
            }
            `}
          >
            <Box
              className="hoverControls"
              position="absolute"
              w="100%"
              h="100%"
              display="none"
              bgColor="#00000020"
            >
              <Flex w="100%" h="100%" align="center" justify="center" gap="8px">
                <Button
                  bgColor="primary"
                  color="white"
                  onClick={() => setAlbum(p)}
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                >
                  Edit <IoMdCreate />
                </Button>
                <Button
                  bgColor="secondary"
                  color="white"
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                >
                  View <IoMdGrid />
                </Button>
              </Flex>
            </Box>
            <DefaultProfile size="100px" />
            {p.name}
          </Flex>
        ))}
      </Grid>
    </Layout>
  );
};

export default Albums;
