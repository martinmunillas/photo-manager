import { Heading } from "@quaantum/components";
import React from "react";
import { useParams } from "react-router-dom";
import Gallery from "renderer/components/Gallery";
import Layout from "renderer/components/Layout";
import { useAlbum } from "renderer/hooks/useAlbum";

interface AlbumProps {}

const Album: React.FC<AlbumProps> = ({}) => {
  const albumId = Number(useParams().albumId);
  const album = useAlbum(albumId);
  return (
    <Layout>
      <Heading>{album?.name}</Heading>
      <Gallery defaultQuery={{ albumId }} />
    </Layout>
  );
};

export default Album;
