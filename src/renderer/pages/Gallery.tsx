import React from "react";
import { default as GalleryC } from "renderer/components/Gallery";
import Layout from "renderer/components/Layout";

interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = () => {
  return (
    <>
      <Layout sidebar={false}>
        <GalleryC />
      </Layout>
    </>
  );
};

export default Gallery;
