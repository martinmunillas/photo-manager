import { Heading } from "@quaantum/components";
import React from "react";
import Gallery from "renderer/components/Gallery";
import Layout from "renderer/components/Layout";

interface FavoritesProps {}

const Favorites: React.FC<FavoritesProps> = ({}) => {
  return (
    <Layout>
      <Heading>Favorites</Heading>
      <Gallery defaultQuery={{ favorite: true }} />
    </Layout>
  );
};

export default Favorites;
