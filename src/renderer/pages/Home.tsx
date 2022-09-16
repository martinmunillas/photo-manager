import { Input } from "@quaantum/components";
import React, { useState } from "react";
import Gallery from "renderer/components/Gallery";
import Layout from "renderer/components/Layout";
import PhotoForm from "renderer/components/PhotoForm";
import { useDebounce } from "renderer/hooks/useDebounce";
import { usePhotos } from "renderer/hooks/usePhotos";
import { Photo } from "types";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [search, setSearch] = useState("");
  const query = useDebounce(search, 100);
  const photos = usePhotos(query);
  const clear = () => setSelected(null);
  return (
    <>
      <Layout
        sidebar={selected && <PhotoForm photo={selected} onSave={clear} />}
        onCloseSidebar={clear}
      >
        <Input
          my="16px"
          mx="9px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Gallery photos={photos} selected={selected} onClick={setSelected} />
      </Layout>
    </>
  );
};

export default Home;
